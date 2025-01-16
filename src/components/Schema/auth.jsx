import { z } from "zod";

export const loginFormSchema = z.object({
  user_name: z
    .string()
    .min(4, { message: "User name must be at least 4 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .refine(
        (email) =>
          !/(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/.test(email),
        {
          message: "Please use your company email address",
        }
      ),
    company: z
      .string()
      .min(2, { message: "Company name must be at least 2 characters." }),
    phone_number: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(20, { message: "Password must be no more than 20 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        message:
          "Password must contain at least one special character (@, $, !, %, *, ?, &).",
      }),
    confirm_password: z
      .string()
      .min(6, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export const NewGroupFormSchema = z.object({
  group_name: z
    .string()
    .min(2, { message: "Group name must be at least 2 characters" }),
});
export const NewUrlFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

export const ContactFormSchema = z.object({
  company_name: z.string().min(2, { message: "Company name is required" }),
  company_type: z.string().optional(),
  company_frn: z.string().optional(),
  company_id: z.string().optional(),
  company_street_1: z.string().optional(),
  company_street_2: z.string().optional(),
  company_city: z.string().optional(),
  company_state: z.string().optional(),
  company_zip_code: z.string().optional(),
  company_country: z.string().optional(),

  user_name: z
    .string()
    .min(4, { message: "User name must be at least 4 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  confirm_password: z
    .string()
    .min(6, { message: "Please confirm your password." })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match.",
      path: ["confirm_password"],
    }),

  primary_contact_name: z.string().optional(),
  primary_contact_email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  primary_contact_skype: z.string().optional(),
  primary_contact_phone: z.string().optional(),
  primary_contact_mobile: z.string().optional(),

  billing_contact_name: z.string().optional(),
  billing_contact_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
  billing_contact_skype: z.string().optional(),
  billing_contact_phone: z.string().optional(),
  billing_contact_mobile: z.string().optional(),
  billing_contact_street_1: z.string().optional(),
  billing_contact_street_2: z.string().optional(),
  billing_contact_city: z.string().optional(),
  billing_contact_state: z.string().optional(),
  billing_contact_zip_code: z.string().optional(),
  billing_contact_country: z.string().optional(),

  techinical_contact_name: z.string().optional(),
  techinical_contact_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
  techinical_contact_skype: z.string().optional(),
  techinical_contact_phone: z.string().optional(),
  techinical_contact_mobile: z.string().optional(),

  notification_notice_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
  notification_rate_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
  notification_balance_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
  notification_trouble_ticket_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
});
