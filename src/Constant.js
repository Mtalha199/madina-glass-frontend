/* --------------------------------- AUTHENTICATION --------------------------------- */
export const AUTHENTICATION_VALUE = {
  AUTH_TOKEN: "authToken",
};

/* --------------------------------- API_END_POINT --------------------------------- */
export const API_END_POINT = {
  AUTH_LOGIN: "auth/login",
  CUSTOMER_LIST: "users",
  ADD_CUSTOMER: "users",
  SIP_TRUNK_LIST: "admin/siptrunk",
  ADD_NEW_SIP_TRUNK: "/admin/siptrunk",
  ADD_IP_WHITE_LISTING: "/admin/ip-auth",
  SIP_TRUNK_LIST_CUSTOMER: "admin/siptrunk-customer",
};

/* --------------------------------- TOAST_MESSAGES --------------------------------- */
export const TOAST_MESSAGES = {
  CUSTOMER_ADDED: "Customer added successfully",
  CUSTOMER_UPDATED: "Customer updated successfully",
}


export const API_TYPE = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
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


  SIP_TRUNK_LIST: "/siptrunk",
  ADD_NEW_SIP_TRUNK: "/siptrunk/register",
  SIP_TRUNK_LIST_UNIQUE: "/siptrunk/:id",

  CARRIERS_LIST: "/carriers-list",
  CARRIERS_LIST_UNIQUE: "/carriers/:id",
  ADD_NEW_CARRIER: "/carriers/register",

  SIP_TRUNK_LIST_CARRIER: "/carrier/siptrunk",
  ADD_NEW_SIP_TRUNK_CARRIER: "/carrier/siptrunk/register",
  SIP_TRUNK_LIST_UNIQUE_CARRIER: "/carrier/siptrunk/:id",

  SETTINGS: "/settings",

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
          url: "#",
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
  { value: "inbound1", label: "Do Not Sign" },
  { value: "inbound2", label: "Attest A" },
  { value: "outbound", label: "Attest B" },
  { value: "both", label: "Attest C" },
  { value: "inbound3", label: "Block" },
];
export const VERIFY_CALL_TOKEN = [
  { value: "disabled", label: "Disabled" },
  { value: "A", label: "Attest A" },
  { value: "B", label: "Attest B" },
  { value: "C", label: "Attest C" },
];

export const POPULATE_INTERMINATE_AS = [
  { value: "disabled", label: "Copy of intrastate" },
  { value: "A", label: "Copy of Interstate" },
  { value: "B", label: "Higher of Inter/Intra" },
  { value: "C", label: "Lower of Inter/Intra" },
  { value: "C", label: "True LCR of Carrier Indeterminate" },
];

export const ROUNDING_PRECISION = [
  { value: "disabled", label: "6" },
  { value: "A", label: "5" },
  { value: "B", label: "3" },
  { value: "C", label: "2" },
  { value: "C", label: "1" },
];
export const ROUNDING_METHOD = [
  { value: "a", label: "Round up" },
  { value: "A", label: "True Math" },
  { value: "B", label: "Round down" },
];
