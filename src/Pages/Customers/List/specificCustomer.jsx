"use client";


import {useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {ArrowLeft} from "lucide-react";
import { SCREEN_PATH } from "@/Constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropdownMenuWithDrawer from "./dropDownmenu";
import TabsCommon from "@/Commons/TabsCommon";
import { CUSTOMER_LIST_TABS } from "@/components/Tabs/TabConfig";
export default function SpecificCustomer() {
  const navigate = useNavigate();

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
            <h2 className="text-2xl font-semibold">Charlie Romance</h2>
            <Badge>Active</Badge>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <DropdownMenuWithDrawer />
        </div>
      </div>
      <TabsCommon TABS={CUSTOMER_LIST_TABS} DEFAULT_TAB={CUSTOMER_LIST_TABS[0].value}  />
    </div>
  );
}
