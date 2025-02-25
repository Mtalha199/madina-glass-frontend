"use client";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { API_END_POINT, API_TYPE, SCREEN_PATH } from "@/Constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabsCommon from "@/Commons/TabsCommon";
import { CUSTOMER_LIST_TABS } from "@/components/Tabs/TabConfig";
import { useEffect, useState } from "react";
import { APICALL } from "@/components/Api/ApiCall";
import AccountHeaderSkeleton from "@/Commons/AccountHeaderSkeleton";
export default function SpecificCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.CUSTOMER_LIST}/${id}`,
      setloading,
      null,
      setData,
      setCount
    );
  };
  return (
    <div className="p-6">
      <Button
        variant="ghost"
        onClick={() => navigate(SCREEN_PATH.CUSTOMER_LIST)}
        className="mb-4"
      >
        <ArrowLeft />
        Customers List
      </Button>

      {loading ? (
        <AccountHeaderSkeleton />
      ) : (
        <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src="/images/avatar-placeholder.png"
                alt="User Avatar"
              />
              <AvatarFallback>CR</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">
                {data?.account?.company_name}
              </h2>
              <Badge
                variant={
                  data?.is_active === true
                    ? "success"
                    : "destructive"
                }
              >
                {data?.is_active === true ? "Active" : "Suspended"}
              </Badge>
            </div>
          </div>
        </div>
      )}
      <TabsCommon
        TABS={CUSTOMER_LIST_TABS}
        DEFAULT_TAB={
          state?.activeTab ? state?.activeTab : CUSTOMER_LIST_TABS[0].value
        }
      />
    </div>
  );
}
