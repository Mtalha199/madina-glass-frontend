import { ProfileCustomer } from "@/components/Tabs/CustomerTabs/ProfileCustomer";
import { SettingCustomer } from "@/components/Tabs/CustomerTabs/SettingCustomer";
import SipTrunksCusotmer from "@/components/Tabs/CustomerTabs/SipTrunksCustomer";
import LcrTab from "@/components/Tabs/SipTrunkTabs/LcrTab";
import Percentage from "@/components/Tabs/SipTrunkTabs/Percentage";
import { PaymentsCustomer } from "./CustomerTabs/PaymentCustomer";
import { ProfileCarrier } from "./CarrierTabs/ProfileCarrier";
import { SettingCarrier } from "./CarrierTabs/SettingCarrier";
import { PaymentsCarrier } from "./CarrierTabs/PaymentCarrier";
import SipTrunksCarrier from "./CarrierTabs/SipTrunksCarrier";

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
export const CARRIER_LIST_TABS = [
  { value: "profile", label: "Profile", component: <ProfileCarrier /> },
  { value: "setting", label: "Setting", component: <SettingCarrier /> },
  { value: "payments", label: "Payments", component: <PaymentsCarrier /> },
  {
    value: "sip-trunks",
    label: "SIP Trunks",
    component: <SipTrunksCarrier />,
  },
];

export const ROUTING_TABS = [
  { value: "lcr", label: "LCR", component: <LcrTab /> },
  { value: "percentage", label: "Percentage", component: <Percentage /> },
];
