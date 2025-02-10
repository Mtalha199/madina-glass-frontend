import TabsCommon from "@/Commons/TabsCommon";
import { ROUTING_TABS } from "@/components/Tabs/TabConfig";
import React from "react";

const Routing = ({ form, MODE }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4  border-t mt-4 pt-4 ">
      <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
        <h2 className="text-lg font-semibold mb-2">Routing Detail</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Specify the routing detail to add.
        </p>
      </div>
      <div className="col-span-4 md:col-span-4 lg:col-span-4 gap-4">
        <TabsCommon TABS={ROUTING_TABS} DEFAULT_TAB={ROUTING_TABS[0].value} />
      </div>
    </div>
  );
};

export default Routing;
