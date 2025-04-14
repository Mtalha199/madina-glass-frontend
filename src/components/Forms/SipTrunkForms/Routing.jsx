import AccessDeniedSection from "@/Commons/AccessDeniedSection";
import TabsCommon from "@/Commons/TabsCommon";
import { APICALL } from "@/components/Api/ApiCall";
import { ROUTING_TABS } from "@/components/Tabs/TabConfig";
import {
  API_END_POINT,
  API_TYPE,
  DATA_VIEW_MODE,
  HAS_PERMISSION,
  PARENT_MODULE_NAME,
  PERMISSIONS,
} from "@/Constant";
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
    // const hasPermission = HAS_PERMISSION(
    //   PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
    //   PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS.CUSTOMER_SIP_TRUNK_ROUTING_VIEW
    // );
    // if (!hasPermission) return;
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.CUSTOMER_SIP_TRUNK_ROUTING}/${trunkId}`,
      setLoading,
      null,
      setRoutingData,
      setCount
    );
  };
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
        { HAS_PERMISSION(
          PARENT_MODULE_NAME.CUSTOMER,

          PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
          PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
            .CUSTOMER_SIP_TRUNK_ROUTING_VIEW
        ) ? (
          defaultTab && (
            <TabsCommon TABS={modifiedRoutingTabs} DEFAULT_TAB={defaultTab} />
          )
        
        ) : (
          <AccessDeniedSection />
   
        )}
      </div>
    </div>
  );
};

export default Routing;
