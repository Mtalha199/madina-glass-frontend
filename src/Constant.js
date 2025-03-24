/* --------------------------------- AUTHENTICATION --------------------------------- */
export const AUTHENTICATION_VALUE = {
  AUTH_TOKEN: "authToken",
};

/* --------------------------------- API_END_POINT --------------------------------- */
export const API_END_POINT = {
  AUTH_LOGIN: "auth/login",
  CUSTOMER_LIST: "users",
  ADD_CUSTOMER: "users",
  ALL_CUSTOMER: "users/names",
  ALL_CARRIER: "carriers/names",

  STATUS_CUSTOMER: "users/{id}/status",
  SIP_TRUNK_LIST: "siptrunk",
  ADD_NEW_SIP_TRUNK: "siptrunk",
  ADD_IP_WHITE_LISTING: "siptrunk/ip-auth",
  VIEW_IP_WHITE_LISTING: "siptrunk/ip-auth",

  ADD_STIR_SHAKEN: "siptrunk/stir-shaken",
  ADD_PRICING_INFO: "siptrunk/pricing-info",
  ADD_ROUTING: "siptrunk/routing",
  VIEW_SIP_TRUNK: "siptrunk",
  SIP_TRUNK_LIST_CUSTOMER: "admin/siptrunk-customer",
  ALL_GROUP_CARRIER: "groups/names",
  GROUP_LIST: "groups",
  ALL_CARRIER_FOR_ROUTING: "groups/users",

  // -----------------------------CARRIERS--------------------------
  CARRIERS: "/carriers",

  // ---------------------------------RATE_DECKS-------------------------
  RATE_DECK: "rate-deck",
  ALL_RATE_DECK: "rate-deck/names",
  ASSIGN_RATE_DECK: "rate-deck/assign",
  APPROVED_RATE_DECK: "rate-deck/approve",
  UPLOAD_RATE_DECK: "rate-deck/upload",

  // ---------------------------------PERMISSIONS-------------------------
ADD_ROLE: "access-control/role",
ROLE:"access-control/roles",
PERMISSION:"access-control/role/{id}/permissions",
ASSIGN_PERMISSION:"access-control/role/assign-permission"

};

/* --------------------------------- TOAST_MESSAGES --------------------------------- */
export const TOAST_MESSAGES = {
  CUSTOMER_ADDED: "Customer added successfully",
  CUSTOMER_UPDATED: "Customer updated successfully",
  GROUP_ADDED: "Group added successfully",
  GROUP_UPDATED: "Group updated successfully",
  SIP_TRUNK_ADDED: "SIP Trunk added successfully",
  SIP_TRUNK_UPDATED: "SIP Trunk updated successfully",
  IP_WHITE_LISTING_ADDED: "IP white listing added successfully",
  IP_WHITE_LISTING_UPDATED: "IP white listing updated successfully",
  IP_WHITE_LISTING_DELETED: "IP white listing deleted successfully",
  STIR_SHAKEN_ADDED: "Stir/shaken added successfully",
  ROUTING_ADDED: "Rounting added succesfully",
  PRICING_INFO_ADDED: "Pricing info added successfully",
  PRICING_INFO_UPDATED: "Pricing info updated successfully",
  CARRIER_ADDED: "Carrier added succesfully",
  CARRIER_UPDATED: "Carrier updated succesfully",

  CUSTOMER_STATUS: "Customer status changed successfully ",

  RATE_DECK_ADDED: "Rate deck added successfuly",
  RATE_DECK_UPDATED: "Rate deck updated successfuly",

  RATE_DECK_ASSIGN: "Rate deck assign successfully",
  RATE_DECK_UPLOAD: "Rate deck uploaded successfully",

  ROLE_ADDED: "Role added successfully",
};

export const API_TYPE = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  PUT: "put",
  DELETE: "delete",
};
/* --------------------------------- IMAGES --------------------------------- */
export const Logo = "./assets/Images/logo.png";
export const errorLogo = "./assets/Images/errorlogo.png";

/* --------------------------------- ROUTES --------------------------------- */
export const SCREEN_PATH = {
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  DASHBOARD: "/dashboard",

  CUSTOMER_LIST: "/customer-list",
  CUSTOMER_LIST_UNIQUE: "/customer/:id",
  ADD_NEW_CUSTOMER: "/customer/register",

  PAYMENT_LIST_CUSTOMER: "/customer/payment",

  RATE_DECK_LIST_CUSTOMER: "/customer/rate-deck",
  ADD_NEW_RATE_DECK_GENERATE: "/customer/rate-deck/generate",
  RATE_DECK_GENERATE_VIEW: "/customer/rate-deck/:id",
  RATE_DECK_APPROVEL: "rate-deck-approvel/:id",

  SIP_TRUNK_LIST: "/siptrunk",
  ADD_NEW_SIP_TRUNK: "/siptrunk/register",
  SIP_TRUNK_LIST_UNIQUE: "/siptrunk/:id",

  CARRIERS_LIST: "/carriers-list",
  CARRIERS_LIST_UNIQUE: "/carriers/:id",
  ADD_NEW_CARRIER: "/carriers/register",

  SIP_TRUNK_LIST_CARRIER: "/carrier/siptrunk",
  ADD_NEW_SIP_TRUNK_CARRIER: "/carrier/siptrunk/register",
  SIP_TRUNK_LIST_UNIQUE_CARRIER: "/carrier/siptrunk/:id",

  RATE_DECK_CARRIER: "carrier/rate-deck",

  SETTINGS: "/settings",
  ROLE_LIST_UNIQUE: "/role/:id",

};
// ----------------------------------------NAVIGATION----------------------------------
import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  LayoutDashboard,
  Users,
  Box,
  UserPlus,
  UsersRound,
  Hash,
  Ticket,
  CreditCard,
  Settings2,
  FileSpreadsheet,
} from "lucide-react";

export const NAVIGATION = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: SCREEN_PATH.DASHBOARD,
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
      items: [
        {
          title: "List",
          url: "/customer-list",
        },
        {
          title: "SIP trunks",
          url: SCREEN_PATH.SIP_TRUNK_LIST,
        },
        {
          title: "Payments",
          url: SCREEN_PATH.PAYMENT_LIST_CUSTOMER,
        },
        {
          title: "Rate decks",
          url: SCREEN_PATH.RATE_DECK_LIST_CUSTOMER,
        },
      ],
    },
    {
      title: "Carriers",
      url: "#",
      icon: Box,
      items: [
        {
          title: "List",
          url: SCREEN_PATH.CARRIERS_LIST,
        },
        {
          title: "SIP trunks",
          url: SCREEN_PATH.SIP_TRUNK_LIST_CARRIER,
        },
        {
          title: "Payments",
          url: "#",
        },
        {
          title: "Rate decks",
          url: SCREEN_PATH.RATE_DECK_CARRIER,
        },
      ],
    },
    {
      title: "Agents",
      url: SCREEN_PATH.ROTATOR,
      icon: UserPlus,
      items: [],
    },
    {
      title: "Resellers",
      url: SCREEN_PATH.DNC_SCRUBBER,
      icon: UsersRound,
      items: [],
    },
    {
      title: "DID Numbers",
      url: SCREEN_PATH.DNC_SCRUBBER,
      icon: Hash,
      items: [],
    },
    {
      title: "Tickets",
      url: SCREEN_PATH.DNC_SCRUBBER,
      icon: Ticket,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "List",
          url: "#",
        },
      ],
    },
    {
      title: "Billing",
      url: SCREEN_PATH.DNC_SCRUBBER,
      icon: CreditCard,
      items: [
        {
          title: "Invoices",
          url: "#",
        },
        {
          title: "Payments",
          url: "#",
        },
        {
          title: "Commissions",
          url: "#",
        },
        {
          title: "FUSF Charges",
          url: "#",
        },
        {
          title: "Rate Decks",
          url: "#",
        },
      ],
    },
    {
      title: "Utilities",
      url: SCREEN_PATH.DNC_SCRUBBER,
      icon: Settings2,
      items: [
        {
          title: "CID Blocking",
          url: "#",
        },
        {
          title: "View History",
          url: "#",
        },
        {
          title: "Gateway Logs",
          url: "#",
        },
        {
          title: "CDR Search",
          url: "#",
        },
        {
          title: "Blacklists",
          url: "#",
        },
        {
          title: "Sip Codes",
          url: "#",
        },
        {
          title: "Notification Logs",
          url: "#",
        },
        {
          title: "Bulk Email",
          url: "#",
        },
        {
          title: "Intl Code Definitions",
          url: "#",
        },
        {
          title: "Create Rate Decks",
          url: "#",
        },
        {
          title: "Call Simulation",
          url: "#",
        },
        {
          title: "Call Restrictions",
          url: "#",
        },
        {
          title: "Bulk Assign Rate Deck",
          url: "#",
        },
        {
          title: "LRN Lookup",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: SCREEN_PATH.DNC_SCRUBBER,
      icon: FileSpreadsheet,
      items: [],
    },
    {
      title: "Settings",
      url: SCREEN_PATH.SETTINGS,
      icon: Settings2,
      items: [],
    },
  ],
  projects: [
    // {
    //   name: "Number Reputation",
    //   url: "/number-reputation/number-groups",
    //   icon: Repeat,
    // },
    // {
    //   name: "Rotator",
    //   url: SCREEN_PATH.ROTATOR,
    //   icon: Plus,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
};

/* --------------------------------- AUTH_NAMING --------------------------------- */
export const AUTH_NAMING = {
  LOGIN: "Login",
  SIGN_UP: "Sign Up",
  RESET_PASSWORD: "Reset Password",
  SET_PASSWORD: "Set Password",
};
// ------------------------------------MODULENAME-------------------------------------
export const MODULENAME = {
  NUMBER_GROUP: "Number Groups",
  NEW_GROUP: "New Group",
  ROTATOR: "Rotator",
  CREATE_NEW_URL: "Create New URL",
  DNC_SCRUBBER: "DNC Scrubber",
};

// ---------------------------------------CUSTOMER_INFORMATION-----------------------------
import {
  KeySquare,
  Lock,
  User,
  Phone,
  ShieldCheck,
  Key,
  Mail,
  Calendar,
} from "lucide-react";
export const COMPANY_DETAIL = (DATA) => [
  {
    icon: KeySquare,
    label: "Company Name",
    value: DATA?.account?.[0]?.companyname,
  },
  {
    icon: KeySquare,
    label: "Company Type",
    value: DATA?.account?.[0]?.companytype,
  },
  {
    icon: Mail,
    label: "Email address",
    value: DATA?.user?.[0]?.email || null,
  },
  {
    icon: Calendar,
    label: "Address",
    value: DATA?.account?.[0]?.companyaddress,
  },
];
export const PRIMARY_DETAIL = (DATA) => [
  {
    icon: Lock,
    label: "Contact Email",
    value: DATA?.account?.[0]?.primary_contact_email || null,
    valueItalic: true,
  },
  {
    icon: User,
    label: "Contact Name",
    value: DATA?.account?.[0]?.primary_contact_name || null,
  },
  {
    icon: Phone,
    label: "Contact Number",
    value: DATA?.account?.[0]?.primary_contact_phone || null,
  },
  {
    icon: ShieldCheck,
    label: "Contact Skype",
    value: DATA?.account?.[0]?.primary_contact_skype || null,
  },
  {
    icon: Mail,
    label: "Email address",
    value: DATA?.user?.[0]?.email || null,
  },
];
export const BILLING_DETAIL = (DATA) => [
  {
    icon: Lock,
    label: "Contact Email",
    value: DATA?.account?.[0]?.billing_contact_email || null,
    valueItalic: true,
  },
  {
    icon: User,
    label: "Contact Name",
    value: DATA?.account?.[0]?.billing_contact_name || null,
  },
  {
    icon: Phone,
    label: "Contact Number",
    value: DATA?.account?.[0]?.billing_contact_phone || null,
  },
  {
    icon: ShieldCheck,
    label: "Contact Skype",
    value: DATA?.account?.[0]?.billing_contact_skype || null,
  },
  {
    icon: Mail,
    label: "Email address",
    value: DATA?.account?.[0]?.balance_notification_email || null,
  },
];
export const TECH_DETAIL = (DATA) => [
  {
    icon: Lock,
    label: "Contact Email",
    value: DATA?.account?.[0]?.tech_contact_email || null,
    valueItalic: true,
  },
  {
    icon: User,
    label: "Contact Name",
    value: DATA?.account?.[0]?.tech_contact_name || null,
  },
  {
    icon: Phone,
    label: "Contact Number",
    value: DATA?.account?.[0]?.tech_contact_phone || null,
  },
  {
    icon: ShieldCheck,
    label: "Contact Skype",
    value: DATA?.account?.[0]?.tech_contact_skype || null,
  },
];

export const DATA_VIEW_MODE = {
  VIEW: "view",
  EDIT: "edit",
  ADD: "add",
};

export const RADIOGROUP_YES_NO = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];
export const TRUNK_TYPE_OPTIONS = [
  { value: "inbound", label: "Inbound" },
  { value: "outbound", label: "Outbound" },
  { value: "both", label: "Both" },
];
export const TRUNK_TYPE_STATUS_OPTIONS = [
  { value: true, label: "Enable" },
  { value: false, label: "Disable" },
];

export const ATTESTATION_OPTIONS = [
  { value: "A", label: "Attest A" },
  { value: "B", label: "Attest B" },
  { value: "C", label: "Attest C" },
];
export const ATTESTATION_OPTIONS_DEFAULT = [
  { value: "dontsign", label: "Do Not Sign" },
  { value: "A", label: "Attest A" },
  { value: "B", label: "Attest B" },
  { value: "C", label: "Attest C" },
  { value: "block", label: "Block" },
];
export const VERIFY_CALL_TOKEN = [
  { value: "disabled", label: "Disabled" },
  { value: "A", label: "Attest A" },
  { value: "B", label: "Attest B" },
  { value: "C", label: "Attest C" },
];
export const BLOCK_MATCHING_SRC_DST = [
  { value: "3", label: "3" },
  { value: "6", label: "6" },
  { value: "full", label: "Full" },
];

export const POPULATE_INTERMINATE_AS = [
{ value: "COPY_OF_INTRASTATE", label: "Copy of intrastate" },
  { value: "COPY_OF_INTERSTATE", label: "Copy of Interstate" },
  { value: "COPY_OF_HIGER", label: "Higher of Inter/Intra" },
  { value: "COPY_OF_LOWER", label: "Lower of Inter/Intra" },
  {
    value: "COPY_TRUE_LCR",
    label: "True LCR of Carrier Indeterminate",
  }
];

export const ROUNDING_PRECISION = [
  { value: 6, label: "6" },
  { value: 5, label: "5" },
  { value: 4, label: "4" },
  { value: 3, label: "3" },
  { value: 2, label: "2" },
  { value: 1, label: "1" },
];
export const ROUNDING_METHOD = [
  { value: "ROUND_UP", label: "Round up" },
  { value: "TRUE_MATH", label: "True Math" },
  { value: "ROUND_DOWN", label: "Round down" },
];

export const BILLING_TYPE_OPTIONS = [
  { value: "dialed_number", label: "Dialed Number" },
  { value: "lrn", label: "LRN" },
];
export const BILLING_INCREMENT_OPTIONS = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 12, label: "12" },
  { value: 18, label: "18" },
  { value: 24, label: "24" },
  { value: 30, label: "30" },
  { value: 60, label: "60" },
];
export const DIGIT_USED = [
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
];

export const PRICING_ROUNDING_METHOD = [
  { value: "up", label: "Up" },
  { value: "down", label: "Down" },
  { value: "true_mathematical", label: "True Mathematical" },
];

export const BUILD_OFF_PLACE_CARRIER = [
  { value: 1, label: "1st" },
  { value: 2, label: "2nd" },
  { value: 3, label: "3rd" },
  { value: 4, label: "4th" },
  { value: 5, label: "5th" },
];

export const ROUTING_TABS = {
  LCR: "LCR",
  PERCENTAGE: "Percentage",
};

export const CUSTOMER_STATUS_CONFIG = {
  true: { label: "Active", variant: "default" },
  false: { label: "In Active", variant: "secondary" },
};

export const DAYS_NOTICE_RATE_DECK = [
  { value: "immediately", label: "Immediately" }, // Add "Immediately" as the first option
  ...Array.from({ length: 30 }, (_, index) => {
    const day = index + 1;
    return { value: day.toString(), label: day }; // Convert to string
  }),
];

export const COLUMN_TO_MAP_UPLOAD_RATE_DECK = [
  {
    name: "npa_nxx",
    label: "NPA NXX Column",
    required: true,
    placeholder: "Select NPA NXX column",
  },
  {
    name: "interstate_rate",
    label: "Interstate Rate Column",
    required: true,
    placeholder: "Select Interstate Rate column",
  },
  {
    name: "intrastate_rate",
    label: "Intrastate Rate Column",
    required: true,
    placeholder: "Select Intrastate Rate column",
  },
  {
    name: "indeterminate_rate",
    label: "Indeterminate Rate Column",
    required: true,
    placeholder: "Select Indeterminate Rate column",
  },
];


export const RATE_DECK_STATE ={
  GENERATING : 'GENERATING',
  INSERTING :'INSERTING',
  COMPLETED : 'COMPLETED',
  ERROR : 'ERROR'
}