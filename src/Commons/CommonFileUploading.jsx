import React, { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudUpload, X, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Papa from "papaparse";

/**
 * Common File Upload Component
 * @param {Object} props
 * @param {Array} props.columnMappings - Array of objects with {name, label, required, placeholder} for column selections
 * @param {Function} props.onComplete - Function called with mapping data and file when complete
 * @param {Object} props.metadata - Additional metadata to include in the response
 */
const CommonFileUpload = ({ 
  columnMappings = [],
  onComplete,
}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [headers, setHeaders] = useState([]);
  const [uploadComplete, setUploadComplete] = useState(false);

  const [selectedColumns, setSelectedColumns] = useState({});
  
  const fileInputRef = useRef(null);
  const progressContainerRef = useRef(null);
  const completionTriggeredRef = useRef(false);

  useEffect(() => {
    if (columnMappings.length > 0 && Object.keys(selectedColumns).length === 0) {
      const initialValues = {};
      columnMappings.forEach(mapping => {
        initialValues[mapping.name] = "";
      });
      setSelectedColumns(initialValues);
    }
  }, [columnMappings]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      validateFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      validateFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const validateFile = (selectedFile) => {
    setError("");
    setUploadComplete(false);
    completionTriggeredRef.current = false;
    
    Papa.parse(selectedFile, {
      header: true,
      preview: 10, 
      complete: (result) => {
        const fileHeaders = Object.keys(result.data[0] || {});
        
        if (fileHeaders.length === 0) {
          setError("The file appears to be empty or cannot be parsed.");
          setFile(null);
          return;
        }

        setHeaders(fileHeaders);
        setFile(selectedFile);
        startUpload();
      },
      error: () => {
        setError("Error reading the file. Please upload a valid CSV file.");
      },
    });
  };

  const handleColumnChange = (name, value) => {
    setSelectedColumns(prev => ({
      ...prev,
      [name]: value
    }));
    
    completionTriggeredRef.current = false;
  };

  const isFormComplete = () => {
    return columnMappings
      .filter(mapping => mapping.required)
      .every(mapping => selectedColumns[mapping.name]);
  };
  useEffect(() => {
    if (file && progress === 100 && isFormComplete() && !completionTriggeredRef.current) {
      const payload = {
        file,
        columns: selectedColumns,
      };
      completionTriggeredRef.current = true;
      setUploadComplete(true);
      onComplete(payload);
    }
  }, [file, selectedColumns, progress,  onComplete]);

  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);
    setUploadComplete(false);
    progressContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let interval;
    if (isUploading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const resetFile = () => {
    setFile(null);
    setProgress(0);
    setIsUploading(false);
    setError("");
    setHeaders([]);
    setUploadComplete(false);
    completionTriggeredRef.current = false;
    
    const initialValues = {};
    columnMappings.forEach(mapping => {
      initialValues[mapping.name] = "";
    });
    setSelectedColumns(initialValues);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <Label>Select a File</Label>
      <div
        className="border bg-muted h-[20rem] rounded-lg p-8 text-center flex flex-col justify-center items-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBrowseClick}
      >
        <CloudUpload className="mb-4" />
        <div className="mb-4">
          <p className="text-gray-500">Drag and Drop a file</p>
        </div>
        <div className="inline-block text-sm underline">
          <span className="text-primary ml-auto inline-block text-sm underline font-bold cursor-pointer">
            Browse
          </span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".csv,.xls,.xlsx"
        />
      </div>

      <div className="flex mt-4">
        <p className="text-sm text-gray-500">
          <span className="font-bold">Supported File Type:</span> .csv, .xls, .xlsx
        </p>
      </div>

      <div ref={progressContainerRef}>
        {file && !error && (
          <div className="mt-4 border p-4 rounded-lg bg-gray-50 flex items-center justify-between">
            <div className="flex items-center">
              <CloudUpload className="mr-2 text-gray-500" />
              <div>
                <p className="font-bold">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {file.size < 1024 * 1024
                    ? `${(file.size / 1024).toFixed(2)} KB`
                    : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                </p>
              </div>
            </div>
            {progress === 100 ? (
              <div className="flex justify-end space-x-4">
                <CheckCircle className="text-green-500 w-6 h-6" />
                <X className="cursor-pointer" onClick={resetFile} />
              </div>
            ) : (
              <X className="cursor-pointer" onClick={resetFile} />
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 border p-4 rounded-lg bg-red-100 text-red-600 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {progress > 0 && progress < 100 && !error && (
          <div className="mt-2">
            <Progress value={progress} className="h-2 rounded-full" />
          </div>
        )}

        {headers.length > 0 && (
          <div className="mt-4 space-y-4">
            {columnMappings.map((mapping) => (
              <div key={mapping.name}>
                <Label>
                  {mapping.label}
                  {mapping.required && <span className="text-red-500">*</span>}
                </Label>
                <Select 
                  value={selectedColumns[mapping.name] || ""} 
                  onValueChange={(value) => handleColumnChange(mapping.name, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={mapping.placeholder || "Choose a header"} />
                  </SelectTrigger>
                  <SelectContent>
                    {headers.map((header) => (
                      <SelectItem key={header} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonFileUpload;