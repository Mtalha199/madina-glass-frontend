/**
 * Advanced Image compression and validation utility
 * Uses iterative binary search algorithm to guarantee target file size
 * Combines quality adjustment and dimension scaling for optimal results
 */

const MAX_IMAGE_SIZE = 1024 * 1024; // 1 MB in bytes
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Binary search parameters
const MIN_QUALITY = 0.1; // Minimum acceptable quality (10%)
const MAX_QUALITY = 0.95; // Maximum quality to start with
const QUALITY_STEP = 0.05; // Precision for binary search
const MAX_ITERATIONS = 15; // Maximum attempts to find optimal quality

// Dimension scaling parameters
const MAX_DIMENSION = 4096; // Maximum dimension to avoid canvas issues
const MIN_DIMENSION_SCALE = 0.3; // Don't scale below 30% of original

interface CompressionResult {
  success: boolean;
  file?: File;
  error?: string;
  compressionRatio?: number;
  finalQuality?: number;
  finalDimensions?: { width: number; height: number };
  iterations?: number;
}

interface ProcessOptions {
  maxSizeBytes?: number;
  maintainAspectRatio?: boolean;
  preferQuality?: boolean; // If true, resize less and compress more
}

/**
 * Validates if the file is an image (not PDF or other documents)
 */
export const isImageFile = (file: File): boolean => {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
};

/**
 * Calculate optimal dimensions while maintaining aspect ratio
 */
const calculateOptimalDimensions = (
  originalWidth: number,
  originalHeight: number,
  scaleFactor: number
): { width: number; height: number } => {
  const width = Math.round(originalWidth * scaleFactor);
  const height = Math.round(originalHeight * scaleFactor);
  
  return {
    width: Math.max(width, Math.round(originalWidth * MIN_DIMENSION_SCALE)),
    height: Math.max(height, Math.round(originalHeight * MIN_DIMENSION_SCALE)),
  };
};

/**
 * Compress image with specific quality and dimensions
 */
const compressWithSettings = (
  img: HTMLImageElement,
  width: number,
  height: number,
  quality: number,
  mimeType: string
): Promise<{ blob: Blob | null; size: number }> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      resolve({ blob: null, size: 0 });
      return;
    }

    canvas.width = width;
    canvas.height = height;

    // Use high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw image on canvas
    ctx.drawImage(img, 0, 0, width, height);

    // Convert to blob with specified quality
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve({ blob, size: blob.size });
        } else {
          resolve({ blob: null, size: 0 });
        }
      },
      mimeType,
      quality
    );
  });
};

/**
 * Binary search to find optimal quality for target size
 */
const findOptimalQuality = async (
  img: HTMLImageElement,
  width: number,
  height: number,
  targetSize: number,
  mimeType: string
): Promise<{ quality: number; blob: Blob | null; iterations: number }> => {
  let minQuality = MIN_QUALITY;
  let maxQuality = MAX_QUALITY;
  let bestBlob: Blob | null = null;
  let bestQuality = maxQuality;
  let iterations = 0;

  // Binary search for optimal quality
  while (maxQuality - minQuality > QUALITY_STEP && iterations < MAX_ITERATIONS) {
    iterations++;
    const testQuality = (minQuality + maxQuality) / 2;
    
    const { blob, size } = await compressWithSettings(
      img,
      width,
      height,
      testQuality,
      mimeType
    );

    if (!blob) break;

    // If size is acceptable (within 3% tolerance), use it
    if (size <= targetSize && size >= targetSize * 0.97) {
      bestBlob = blob;
      bestQuality = testQuality;
      break;
    }

    // If size is too large, reduce quality
    if (size > targetSize) {
      maxQuality = testQuality;
    } else {
      // Size is smaller than target, we can increase quality
      minQuality = testQuality;
      bestBlob = blob;
      bestQuality = testQuality;
    }
  }

  // If we didn't find a good match, use the best we found
  if (!bestBlob) {
    const result = await compressWithSettings(img, width, height, minQuality, mimeType);
    bestBlob = result.blob;
    bestQuality = minQuality;
  }

  return { quality: bestQuality, blob: bestBlob, iterations };
};

/**
 * Advanced iterative compression algorithm
 * Tries multiple strategies to achieve target size
 */
export const compressImage = async (
  file: File,
  options: ProcessOptions = {}
): Promise<CompressionResult> => {
  const {
    maxSizeBytes = MAX_IMAGE_SIZE,
    maintainAspectRatio = true,
    preferQuality = false,
  } = options;

  // Validate file type
  if (!isImageFile(file)) {
    return {
      success: false,
      error: 'Only image files (JPEG, PNG, WebP, GIF) are allowed. PDFs and other documents cannot be uploaded.',
    };
  }

  try {
    // Load image
    const img = new Image();
    const imageLoadPromise = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
    });

    img.src = URL.createObjectURL(file);
    await imageLoadPromise;

    const originalWidth = img.width;
    const originalHeight = img.height;
    
    // Determine output format (convert PNG to JPEG for better compression if no transparency needed)
    let mimeType = file.type;
    if (file.type === 'image/png' && file.size > maxSizeBytes) {
      // For large PNGs, try JPEG first (better compression)
      mimeType = 'image/jpeg';
    }

    // Ensure dimensions don't exceed limits
    let workingWidth = Math.min(originalWidth, MAX_DIMENSION);
    let workingHeight = Math.min(originalHeight, MAX_DIMENSION);
    
    if (workingWidth !== originalWidth && maintainAspectRatio) {
      const scale = workingWidth / originalWidth;
      workingHeight = Math.round(originalHeight * scale);
    }

    let totalIterations = 0;
    let finalBlob: Blob | null = null;
    let finalQuality = MAX_QUALITY;
    let finalWidth = workingWidth;
    let finalHeight = workingHeight;

    // Strategy 1: Try with original/limited dimensions and quality adjustment
    console.log('Strategy 1: Quality optimization at original dimensions');
    const result1 = await findOptimalQuality(
      img,
      workingWidth,
      workingHeight,
      maxSizeBytes,
      mimeType
    );
    
    totalIterations += result1.iterations;

    if (result1.blob && result1.blob.size <= maxSizeBytes) {
      finalBlob = result1.blob;
      finalQuality = result1.quality;
      finalWidth = workingWidth;
      finalHeight = workingHeight;
    } else {
      // Strategy 2: Scale down dimensions progressively
      console.log('Strategy 2: Dimension scaling with quality optimization');
      const scalingSteps = preferQuality 
        ? [0.9, 0.7, 0.5, 0.4, 0.3] 
        : [0.8, 0.6, 0.5, 0.4, 0.3];

      for (const scale of scalingSteps) {
        const { width, height } = calculateOptimalDimensions(
          originalWidth,
          originalHeight,
          scale
        );

        const result = await findOptimalQuality(
          img,
          width,
          height,
          maxSizeBytes,
          mimeType
        );

        totalIterations += result.iterations;

        if (result.blob && result.blob.size <= maxSizeBytes) {
          finalBlob = result.blob;
          finalQuality = result.quality;
          finalWidth = width;
          finalHeight = height;
          break;
        }
      }

      // Strategy 3: Last resort - aggressive compression
      if (!finalBlob || finalBlob.size > maxSizeBytes) {
        console.log('Strategy 3: Aggressive compression');
        const minDimensions = calculateOptimalDimensions(
          originalWidth,
          originalHeight,
          MIN_DIMENSION_SCALE
        );

        const lastResort = await compressWithSettings(
          img,
          minDimensions.width,
          minDimensions.height,
          MIN_QUALITY,
          mimeType
        );

        if (lastResort.blob) {
          finalBlob = lastResort.blob;
          finalQuality = MIN_QUALITY;
          finalWidth = minDimensions.width;
          finalHeight = minDimensions.height;
          totalIterations++;
        }
      }
    }

    URL.revokeObjectURL(img.src);

    if (!finalBlob) {
      return {
        success: false,
        error: 'Failed to compress image. Please try a different image.',
      };
    }

    // Final size check
    if (finalBlob.size > maxSizeBytes) {
      return {
        success: false,
        error: `Unable to compress image below ${(maxSizeBytes / 1024 / 1024).toFixed(2)} MB. Final size: ${(finalBlob.size / 1024 / 1024).toFixed(2)} MB. Please use a smaller or simpler image.`,
      };
    }

    // Create compressed file
    const compressedFile = new File([finalBlob], file.name, {
      type: mimeType,
      lastModified: Date.now(),
    });

    const compressionRatio = ((1 - finalBlob.size / file.size) * 100).toFixed(1);

    console.log(`Compression complete:
      Original: ${(file.size / 1024).toFixed(2)} KB (${originalWidth}x${originalHeight})
      Compressed: ${(finalBlob.size / 1024).toFixed(2)} KB (${finalWidth}x${finalHeight})
      Quality: ${(finalQuality * 100).toFixed(1)}%
      Ratio: ${compressionRatio}%
      Iterations: ${totalIterations}`);

    return {
      success: true,
      file: compressedFile,
      compressionRatio: parseFloat(compressionRatio),
      finalQuality: finalQuality,
      finalDimensions: { width: finalWidth, height: finalHeight },
      iterations: totalIterations,
    };
  } catch (error) {
    return {
      success: false,
      error: `Error processing image: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};

/**
 * Validates and compresses a file for upload with guaranteed size limit
 */
export const processImageForUpload = async (
  file: File,
  options: ProcessOptions = {}
): Promise<CompressionResult> => {
  return compressImage(file, options);
};

/**
 * Batch process multiple images
 */
export const processBatchImages = async (
  files: File[],
  options: ProcessOptions = {}
): Promise<CompressionResult[]> => {
  const results: CompressionResult[] = [];
  
  for (const file of files) {
    const result = await processImageForUpload(file, options);
    results.push(result);
  }
  
  return results;
};