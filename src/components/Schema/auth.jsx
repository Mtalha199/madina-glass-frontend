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

  user_name:z.string().min(2, { message: "User name is required" }),
  password:z
  .string()
  .min(8, { message: "Password must be at least 8 characters." }),
  confirm_password: z.string().min(6, { message: "Please confirm your password." }),

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
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match.",
  path: ["confirm_password"],
});

export const ContactFormSchemaCarrier = z.object({
  company_name: z.string().min(2, { message: "Company name is required" }),
  company_street_1: z.string().optional(),
  company_street_2: z.string().optional(),
  company_city: z.string().optional(),
  company_state: z.string().optional(),
  company_zip_code: z.string().optional(),
  company_country: z.string().optional(),

  user_name:z.string().min(2, { message: "User name is required" }),
  password:z
  .string()
  .min(8, { message: "Password must be at least 8 characters." }),
  confirm_password: z.string().min(6, { message: "Please confirm your password." }),

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
  
  notification_trouble_ticket_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match.",
  path: ["confirm_password"],
});

export const ContactFormSchemaEdit = z.object({
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
export const ContactFormSchemaCarrierEdit = z.object({
  company_name: z.string().min(2, { message: "Company name is required" }),
  company_street_1: z.string().optional(),
  company_street_2: z.string().optional(),
  company_city: z.string().optional(),
  company_state: z.string().optional(),
  company_zip_code: z.string().optional(),
  company_country: z.string().optional(),

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

  notification_trouble_ticket_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
});
export const SipTrunkForm = z.object({
  trunk_name: z
    .string()
    .min(2, { message: "Trunk name must be at least 2 characters" }),
  customer: z.string().min(1, { message: "Customer is required" }),

  trunk_type: z.string().min(1, { message: "Trunk type is required" }),
  status: z.boolean().optional(),

  cps_limit: z.string().optional(),
  session_limit: z.string().optional(),
  dnis_call_limit: z.string().optional(),
  ani_call_limit: z.string().optional(),

  global_ani_block: z.boolean().optional(),
  global_dnis_block: z.boolean().optional(),
  customer_ani_block: z.boolean().optional(),
  customer_dnis_block: z.boolean().optional(),

  ipEntries: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        customer_ip: z
          .string()
          .regex(
            /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/,
            "Customer IP must be a valid IPv4 address."
          )
          .optional(),
        sip_map_ip: z
          .string()
          .regex(
            /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/,
            "Sip map IP must be a valid IPv4 address."
          )
          .optional(),
        cps_limit: z.coerce.number().optional(), // Change this line
        session_limit: z.coerce.number().optional(),
        status: z.boolean().optional(),
        tech_prefix: z.string().optional(),
        suffix: z.string().optional(),
      })
    )
    .optional(),
});
export const LCRForm = z.object({
  limit_cps:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "limit cps is required" })
  ),
  limit_session:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "limit session is required" })
  ),
  limit_ani:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "limit ani is required" })
  ),

  limit_dnis:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "limit dnis is required" })
  ),
  priority:z.coerce.number().min(1, { message: "Required" }),
  override_extend:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "override extend is required" })
  ),


});
export const PercentageForm = z.object({
  limit_cps:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "limit cps is required" })
  ),
  limit_session:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "limit session is required" })
  ),
  limit_ani:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "limit ani is required" })
  ),

  limit_dnis:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "limit dnis is required" })
  ),
  priority:z.coerce.number().min(1, { message: "Required" }),
  override_extend:z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "override extend is required" })
  ),
  percentage:z.coerce.number().min(1, { message: "Required" }),



});
// -----------------------SIP_TRUNK_SCEHEMA---------------------

export const BasicSipTrunkSchema = z.object({
  trunk_name: z
    .string()
    .min(2, { message: "Trunk name must be at least 2 characters" }),
  customer_id: z.coerce.number().min(1, { message: "Required" }),
  group_id: z.coerce.number().min(1, { message: "Group is required" }),
  trunk_type: z.string().min(1, { message: "Trunk type is required" }),
  status: z.boolean().optional(),
  somos: z.boolean().optional(),

  cps_limit: z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "CPS limit is required" })
  ),
  session_limit: z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "Session limit is required" })
  ),
  dnis_call_limit: z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "DNIS call limit is required" })
  ),
  ani_call_limit: z.preprocess(
    val => val === "" ? undefined : Number(val),
    z.number({ required_error: "ANI call limit is required" })
  ),
  global_ani_block: z.boolean().optional(),
  global_dnis_block: z.boolean().optional(),
  customer_ani_block: z.boolean().optional(),
  customer_dnis_block: z.boolean().optional(),
  verify_call_token: z.string().optional(),
  block_matching_src_dst:z.string().min(1, { message: "Block matching scr/dst is required" }),
});
export const IpWhitelistSchema = z.object({
  ipEntries: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        customer_ip: z
          .string()
          .regex(
            /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/,
            "Customer IP must be a valid IPv4 address."
          )
          .optional(),
        sip_map_ip: z
          .string()
          .regex(
            /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/,
            "Sip map IP must be a valid IPv4 address."
          )
          .optional(),
        cps_limit: z.coerce.number().optional(),
        session_limit: z.coerce.number().optional(),
        status: z.boolean().optional(),
        tech_prefix: z.string().optional(),
        suffix: z.string().optional(),
      }).refine(
        data => {
          if (!data.customer_ip || !data.sip_map_ip) {
            return true;
          }
          return data.customer_ip !== data.sip_map_ip;
        },
        {
          message: "Customer IP and SIP Map IP cannot be the same",
          path: ["sip_map_ip"]
        }
      )
    )
    .optional(),
});
export const StirShakenSchema = z.object({
  default_action: z.string().min(1, { message: "Default Action is required" }),
  stirShakenData: z.array(
    z.object({
      phoneNumber: z.string().optional(),
      attestationType: z.string().optional(),
      notes: z.string().optional()
    })
  ).optional().default([])
});
export const PricingInfochema = z.object({
  billing_type: z.string().min(1, "Billing Type is required"),
  initial: z.coerce.number().min(1, "Initial is required"),
  subsequent: z.coerce.number().min(1, "Subsequent is required"),
  price_cap: z.boolean().optional(),
  price_protection: z.boolean().optional(),
  override_carrier_price_protection: z.boolean().optional(),
  digits_used: z.coerce.number().min(1, "Digits Used is required"),
  rounding_method: z.string().min(1, "Rounding Method is required"),
  outbound_media_ip_block: z.boolean().optional(),
  inbound_media_ip_block: z.boolean().optional(),
  allow555: z.boolean().optional(),
  use_global_404_blacklist: z.boolean().optional(),
  call_extend: z.boolean().optional(),
  override_call_extending: z.boolean().optional(),
});
export const AssignRateDeckSchema = z.object({
  rate_deck:z.string().min(1, "Rate deck is required"),
  // days_notice: z.string().min(1, "Days notice is required"),
  effective_date: z.date({
    required_error: "Effective date is required",
  }),
});
export const IpWhitelistSchemaForEdit = z.object({
  ipEntries: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        customer_ip: z
          .string()
          .regex(
            /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/,
            "Customer IP must be a valid IPv4 address."
          )
          .optional(),
        sip_map_ip: z
          .string()
          .regex(
            /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/,
            "Sip map IP must be a valid IPv4 address."
          )
          .optional(),
        cps_limit: z.coerce.number().optional(),
        session_limit: z.coerce.number().optional(),
        status: z.boolean().optional(),
        tech_prefix: z.string().optional(),
        suffix: z.string().optional(),
      })
    )
    .optional(),
});


export const StirShakenFormSingle = z.object({
  attestation: z.string().min(1, { message: "Attestation is required" }),
  phone_number: z.string().min(1, { message: "DID is required" }),
  notes: z.string().optional(),
});
export const StirShakenFormBulk = z.object({
  attestation: z.string().min(1, { message: "Attestation is required" }),
});
export const rateDeckUplaodForm = z.object({
  // attestation: z.string().min(1, { message: "Attestation is required" }),
});


export const LCR = z.object({
  limit_cps: z.string().optional(),
  limit_session: z.string().optional(),
  limit_ani: z.string().optional(),
  limit_dnis: z.string().optional(),
  priority: z.string().optional(),
  override_extend: z.string().optional(),
});



export const AddGroup = z.object({
  group_name: z.string().min(1, { message: "Group name is required" }),
});





export const RateDeckForm = z.object({
  margin: z.coerce.number().min(1, { message: "Margin is required" }),
  file_name: z.string().min(1, { message: "File name is required" }),
  min_profit: z.coerce.number().min(1, { message: "Minimum profit is required" }),
  max_profit: z.coerce.number().min(1, { message: "Maximum profit is required" }),
  include_toll_free: z.boolean({ required_error: "Include toll-free is required" }),
  toll_free_price: z.coerce.number().optional(),
  populate_interminate_as: z.string().min(1, { message: "Populate indeterminate as is required" }),
  rounding_percision: z.coerce.number().min(1, { message: "Rounding precision is required" }),
  rounding_method: z.string().min(1, { message: "Rounding method is required" }),
  // non_juridictional: z.boolean({ required_error: "Non-jurisdictional is required" }),
  // local_only_rate_deck: z.boolean({ required_error: "Local only rate deck is required" }),
  // use_carrier_restrictions: z.boolean({ required_error: "Use carrier restrictions is required" }),
  us48: z.boolean({ message: "US48 is required" }),
  alaska: z.boolean({ required_error: "Alaska is required" }),
  hawaii: z.boolean({ required_error: "Hawaii is required" }),
  canada: z.boolean({ required_error: "Canada is required" }),
  yukon: z.boolean({ required_error: "Yukon is required" }),
  non_us_canada_country_code_1: z.boolean({ required_error: "Non-US/Canada country code 1 is required" }),
  // user_defined: z.boolean({ required_error: "User defined is required" }),
  build_off_which_place_carrier: z.string().min(1, { message: "Build off which place carrier is required" }),
  max_devision: z.coerce.number().min(1, { message: "Max deviation is required" }),
  // effective_date: z.string().min(1, { message: "Effective date is required" }),
  // custom_for_one_account: z.boolean({ required_error: "Custom for one account is required" }),
  selectedCarriers: z
    .array(z.any())
    .min(1, { message: "At least one carrier must be selected" }),
}).superRefine((data, ctx) => {
  if (data.include_toll_free === true) {
    if (data.toll_free_price === undefined || data.toll_free_price < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Toll-free price is required when include toll-free is checked",
        path: ["toll_free_price"],
      });
    }
  }
});