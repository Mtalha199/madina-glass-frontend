import TabsCommon from "@/Commons/TabsCommon";
import { APICALL } from "@/components/Api/ApiCall";
import { ROUTING_TABS } from "@/components/Tabs/TabConfig";
import { API_END_POINT, API_TYPE, DATA_VIEW_MODE } from "@/Constant";
import React, { useEffect, useState } from "react";

const Routing = ({ form, MODE, trunkId, GET_ROUTING }) => {
  const [routingData, setRoutingData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(0);
  const [defaultTab, setDefaultTab] = useState(null);

  const modifiedRoutingTabs = ROUTING_TABS.map((tab) => {
    if (tab.value === "LCR" || tab.value === "Percentage") {
      return {
        ...tab,
        component: React.cloneElement(tab.component, {
          form,
          MODE,
          trunkId,
          GET_ROUTING,
        }),
      };
    }
    return tab;
  });
  useEffect(() => {
    if (MODE === DATA_VIEW_MODE.VIEW) getAlreadyRouting();
  }, [MODE]);

  const getAlreadyRouting = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.ADD_ROUTING}/${trunkId}`,
      setLoading,
      null,
      setRoutingData,
      setCount
    );
  };
  console.log(routingData?.type);
  useEffect(() => {
    if (MODE === DATA_VIEW_MODE.VIEW) {
      getAlreadyRouting();
    } else {
      setDefaultTab(modifiedRoutingTabs[0].value);
    }
  }, [MODE]);

  useEffect(() => {
    if (routingData && routingData.type) {
      setDefaultTab(routingData.type);
    }
  }, [routingData]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border-t mt-4 pt-4">
      <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
        <h2 className="text-lg font-semibold mb-2">Routing Detail</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Specify the routing detail to add.
        </p>
      </div>
      <div className="col-span-4 md:col-span-4 lg:col-span-4 gap-4">
        {defaultTab && (
          <TabsCommon TABS={modifiedRoutingTabs} DEFAULT_TAB={defaultTab} />
        )}
      </div>
    </div>
  );
};

export default Routing;
