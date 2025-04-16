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
import UserSetting from "./SettingTabs/User";
import Groups from "./SettingTabs/Groups";
import Role from "./SettingTabs/Role";
import Notifications from "./SettingTabs/Notifications";
import GlobalBlackList from "./SettingTabs/GlobalBlackList";
import SystemSettings from "./SettingTabs/SystemSettings";

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
  { value: "LCR", label: "LCR", component: <LcrTab /> },
  { value: "Percentage", label: "Percentage", component: <Percentage /> },
];

export const SETTING_TABS = [
  // { value: "user", label: "User", component: <UserSetting /> },
  { value: "groups", label: "Groups", component: <Groups /> },
  { value: "payments", label: "Role", component: <Role /> },
  // {
  //   value: "notifications",
  //   label: "Notifications",
  //   component: <Notifications />,
  // },
  // {
  //   value: "global-black-list",
  //   label: "Global Black list",
  //   component: <GlobalBlackList />,
  // },
  // {
  //   value: "system-settings",
  //   label: "System Settings",
  //   component: <SystemSettings />,
  // },
];
