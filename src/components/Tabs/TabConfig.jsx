import { PaymentsCustomer } from "@/Pages/Customers/List/SpecificCustomerTabs/PaymentsCustomer";
import { ProfileCustomer } from "@/Pages/Customers/List/SpecificCustomerTabs/ProfileCustomer";
import { SettingCustomer } from "@/Pages/Customers/List/SpecificCustomerTabs/SettingCustomer";
import { SipTrunksCusotmer } from "@/Pages/Customers/List/SpecificCustomerTabs/SipTrunksCustomer";

export const CUSTOMER_LIST_TABS = [
  { value: "profile", label: "Profile", component: <ProfileCustomer /> },
  { value: "setting", label: "Setting", component: <SettingCustomer /> },
  { value: "payments", label: "Payments", component: <PaymentsCustomer /> },
  {
    value: "sip-trunks",
    label: "SIP Trunks",
    component: <SipTrunksCusotmer />,
  },
];
