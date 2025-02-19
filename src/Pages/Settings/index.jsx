import TabsCommon from "@/Commons/TabsCommon";
import { SETTING_TABS } from "@/components/Tabs/TabConfig";
import React from "react";

function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <TabsCommon TABS={SETTING_TABS} DEFAULT_TAB={SETTING_TABS[0].value} />
    </div>
  );
}

export default Settings;
