/* --------------------------------- AUTHENTICATION --------------------------------- */
export const AUTHENTICATION_VALUE = {
  AUTH_TOKEN: "authToken",
};

/* --------------------------------- API_END_POINT --------------------------------- */
export const API_END_POINT = {
  AUTH_LOGIN: "auth/login",
  CUSTOMER_LIST: "admin/customers",
  SIP_TRUNK:"admin/siptrunk"
};

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
  NUMBER_REPUTATION_NEW_GROUPS: "/number-reputation/new-group",
  NUMBER_REPUTATION_SPECIFIC_GROUP: "/number-reputation/:groupId",
  ROTATOR: "/rotatar",
  ROTATOR_NEW_URL: "/rotator/new-url",
  DNC_SCRUBBER: "/dnc-scrubber",
  CALENDER: "/specific-number/calender",
  CUSTOMER_LIST: "/customer-list",
  CUSTOMER_LIST_UNIQUE: "/customer/:id",
  ADD_NEW_CUSTOMER:"/customer/register",
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
          url: "/customer-sip-trunks",
        },
        {
          title: "Payments",
          url: "/customer-payments",
        },
        {
          title: "Rate decks",
          url: "/customer-rate-decks",
        },
      ],
    },
    {
      title: "Carriers",
      url: SCREEN_PATH.NUMBER_REPUTATION_GROUPS,
      icon: Box,
      items: [
        {
          title: "List",
          url: "#",
        },
        {
          title: "SIP trunks",
          url: "#",
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
      url: SCREEN_PATH.DNC_SCRUBBER,
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
