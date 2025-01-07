import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
  .string()
  .email({ message: "Please enter a valid email address." })
  .refine(
    (email) => !/(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/.test(email),
    {
      message: "Please use your company email address.",
    }
  ),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const SignUpFormSchema = z
  .object({
    email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .refine(
      (email) => !/(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/.test(email),
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


  export const NewGroupFormSchema=z.object({
    group_name:z.string().min(2,{message:"Group name must be at least 2 characters"}),

  })
  export const NewUrlFormSchema=z.object({
    name:z.string().min(2,{message:"Name must be at least 2 characters"}),

  })
