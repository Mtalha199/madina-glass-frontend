import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";

const TabsCommon = ({ TABS, DEFAULT_TAB }) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
      <TabsList>
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="flex justify-between items-center mb-4"></div>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsCommon;
