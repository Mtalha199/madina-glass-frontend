import { z } from "zod";

/**
 * Zod schemas for profile forms
 */

// Profile Meta Schema (name, email, phone, profilePic)
export const profileMetaSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() === "" || /^[\d\s\-\+\(\)]+$/.test(val),
      "Phone number can only contain digits, spaces, hyphens, plus signs, and parentheses"
    )
    .refine(
      (val) => !val || val.trim() === "" || val.replace(/\D/g, "").length >= 10,
      "Phone number must contain at least 10 digits"
    ),
  profilePic: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
      "Profile picture must be less than 5MB"
    )
    .refine(
      (file) => !file || (file instanceof File && file.type.startsWith("image/")),
      "Profile picture must be an image file"
    ),
});

// Profile Info Schema (name, email, phone)
export const profileInfoSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() === "" || /^[\d\s\-\+\(\)]+$/.test(val),
      "Phone number can only contain digits, spaces, hyphens, plus signs, and parentheses"
    )
    .refine(
      (val) => !val || val.trim() === "" || val.replace(/\D/g, "").length >= 10,
      "Phone number must contain at least 10 digits"
    ),
});

// Profile Address Schema (country, city, postalCode)
export const profileAddressSchema = z.object({
  country: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() === "" || val.length >= 2,
      "Country must be at least 2 characters"
    )
    .refine(
      (val) => !val || val.trim() === "" || val.length <= 100,
      "Country must not exceed 100 characters"
    ),
  city: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() === "" || val.length >= 2,
      "City must be at least 2 characters"
    )
    .refine(
      (val) => !val || val.trim() === "" || val.length <= 100,
      "City must not exceed 100 characters"
    ),
  postalCode: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() === "" || /^[a-zA-Z0-9\s\-]+$/.test(val),
      "Postal code can only contain letters, numbers, spaces, and hyphens"
    )
    .refine(
      (val) => !val || val.trim() === "" || val.length <= 20,
      "Postal code must not exceed 20 characters"
    ),
});

// Password Change Schema
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(4, "New password must be at least 4 characters"),
    confirmNewPassword: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

// Type inference
export type ProfileMetaFormData = z.infer<typeof profileMetaSchema>;
export type ProfileInfoFormData = z.infer<typeof profileInfoSchema>;
export type ProfileAddressFormData = z.infer<typeof profileAddressSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

