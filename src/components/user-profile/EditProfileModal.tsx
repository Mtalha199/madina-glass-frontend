"use client";
import React, { useState, useRef, useEffect } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";
import { AdminProfile, ProfileApi } from "@/lib/api/profile";
import { useZodForm } from "./hooks/useZodForm";
import { profileMetaSchema, profileAddressSchema } from "./utils/schemas";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import { processImageForUpload } from "@/lib/utils/imageCompression";

// Helper function to get the base URL without /api/v1 for static assets
const getBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  // Remove /api/v1 if present, static files are served at root level
  return apiUrl.replace(/\/api\/v1$/, '');
};

// Helper function to construct profile picture URL
const getProfilePicUrl = (profilePic: string | null): string | null => {
  if (!profilePic) return null;

  // If already a full URL, return as is
  if (profilePic.startsWith('http://') || profilePic.startsWith('https://')) {
    return profilePic;
  }

  // Construct URL: baseUrl + profilePic path
  // profilePic is stored as "/uploads/profile-pictures/filename.jpg"
  return `${getBaseUrl()}${profilePic}`;
};

// Helper function to get initials from name
const getInitials = (name: string | null | undefined): string => {
  if (!name) return "U";

  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }

  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminProfile?: AdminProfile | null;
  onUpdate?: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  adminProfile,
  onUpdate,
}: EditProfileModalProps) {
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewImageError, setPreviewImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Combined schema with all fields from all 3 modals
  const combinedSchema = profileMetaSchema.merge(profileAddressSchema);

  type CombinedFormData = z.infer<typeof combinedSchema>;

  const { values, errors, setValue, validate, reset } = useZodForm<CombinedFormData>({
    initialValues: {
      name: adminProfile?.name || "",
      email: adminProfile?.email || "",
      phone: adminProfile?.phone || "",
      profilePic: undefined,
      country: adminProfile?.country || "",
      city: adminProfile?.city || "",
      postalCode: adminProfile?.postalCode || "",
    },
    schema: combinedSchema,
  });

  // Update form data when adminProfile changes
  useEffect(() => {
    if (adminProfile) {
      reset({
        name: adminProfile.name || "",
        email: adminProfile.email || "",
        phone: adminProfile.phone || "",
        profilePic: undefined,
        country: adminProfile.country || "",
        city: adminProfile.city || "",
        postalCode: adminProfile.postalCode || "",
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      setPreviewImageError(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [adminProfile, reset]);

  // Reset preview image error when modal opens
  useEffect(() => {
    if (isOpen) {
      setPreviewImageError(false);
      setError(null);
    }
  }, [isOpen]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Compress and validate image
      const result = await processImageForUpload(file, {
        maxSizeBytes: 1024 * 1024, // 1MB
        preferQuality: true, // Balance between quality and size
        maintainAspectRatio: true
      });
      
      if (!result.success) {
        setError(result.error || "Failed to process image");
        return;
      }

      const compressedFile = result.file!;
      setSelectedFile(compressedFile);
      setError(null);
      setValue("profilePic", compressedFile);
      setPreviewImageError(false);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await ProfileApi.updateProfile({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        profilePic: selectedFile || undefined,
        country: values.country || undefined,
        city: values.city || undefined,
        postalCode: values.postalCode || undefined,
      });

      // Refresh profile data
      if (onUpdate) {
        await onUpdate();
      }

      // Refresh user data in AuthContext from profile API
      await refreshUser();

      // Reset file selection
      setSelectedFile(null);
      setPreviewUrl(null);
      setPreviewImageError(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      closeModal();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update profile";
      setError(errorMessage);
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Profile
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your profile information to keep your details up-to-date.
          </p>
        </div>
        <form onSubmit={handleSave} className="flex flex-col">
          {error && (
            <div className="px-2 mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2">
            {/* Profile Picture Section */}
            <div>
             
              <div className="col-span-2">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0 w-20 h-20 rounded-full overflow-hidden bg-brand-500 flex items-center justify-center border-2 border-gray-200 dark:border-gray-800">
                    {previewUrl ? (
                      <Image
                        width={80}
                        height={80}
                        src={previewUrl}
                        alt="profile preview"
                        className="object-cover w-full h-full"
                        onError={() => setPreviewImageError(true)}
                        unoptimized
                      />
                    ) : adminProfile?.profilePic && !previewImageError && getProfilePicUrl(adminProfile.profilePic) ? (
                      <Image
                        width={80}
                        height={80}
                        src={getProfilePicUrl(adminProfile.profilePic)!}
                        alt="profile preview"
                        className="object-cover w-full h-full"
                        onError={() => setPreviewImageError(true)}
                        unoptimized
                      />
                    ) : (
                      <span className="text-white text-2xl font-medium select-none">
                        {getInitials(adminProfile?.name)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-500 file:text-white hover:file:bg-brand-600"
                    />
                    <p className="mt-1 text-xs text-gray-500">JPG, PNG or WEBP (max 5MB)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Personal Information
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={values.name}
                    onChange={(e) => setValue("name", e.target.value)}
                    error={!!errors.name}
                    hint={errors.name}
                    required
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={values.email}
                    onChange={(e) => setValue("email", e.target.value)}
                    error={!!errors.email}
                    hint={errors.email}
                    required
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    value={values.phone || ""}
                    onChange={(e) => setValue("phone", e.target.value)}
                    error={!!errors.phone}
                    hint={errors.phone}
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Address
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    value={values.country || ""}
                    onChange={(e) => setValue("country", e.target.value)}
                    error={!!errors.country}
                    hint={errors.country}
                  />
                </div>

                <div>
                  <Label>City/State</Label>
                  <Input
                    type="text"
                    value={values.city || ""}
                    onChange={(e) => setValue("city", e.target.value)}
                    error={!!errors.city}
                    hint={errors.city}
                  />
                </div>

                <div>
                  <Label>Postal Code</Label>
                  <Input
                    type="text"
                    value={values.postalCode || ""}
                    onChange={(e) => setValue("postalCode", e.target.value)}
                    error={!!errors.postalCode}
                    hint={errors.postalCode}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={closeModal}
              disabled={loading}
            >
              Close
            </Button>
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

