import { z } from "zod";

/**
 * Zod schemas for roles and users
 */

// Role Schema
export const createRoleSchema = z.object({
  identifier: z
    .string()
    .min(1, "Identifier is required")
    .regex(/^[a-z0-9_]+$/, "Identifier must be lowercase letters, numbers, and underscores only"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

// User Schema
export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  roleId: z.string().min(1, "Role is required"),
});

// Type inference
export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;

