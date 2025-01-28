import {
  Building,
  Factory,
  MapPin,
  Home,
  Landmark,
  Globe,
  Mail,
  Badge,
  Edit,
  Server,
  Network,
  User,
} from "lucide-react";
import {
  RadioGroupCommon,
  InputCommon,
  CheckboxCommon,
  SelectCommon,
  ComboboxCommon,
} from "@/Commons/FormCommons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckboxFieldAndView,
  InputFieldAndView,
  RadioGroupAndView,
  SelectAndView,
} from "../CustomerForms/InputFieldAndView";
import {
  API_END_POINT,
  API_TYPE,
  TRUNK_TYPE_OPTIONS,
  TRUNK_TYPE_STATUS_OPTIONS,
} from "@/Constant";
import { APICALL } from "@/components/Api/ApiCall";
export const BasicDetailForm = ({ form, MODE, DATA }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      API_END_POINT.CUSTOMER_LIST,
      setloading,
      null,
      setData,
      setCount
    );
  };
  return (
    <>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
          <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
            <h2 className="text-lg font-semibold mb-2">Sip Trunk Detail</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Specify the SIP trunk detail to add.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "SIP Trunk Name",
              NAME: "trunk_name",
              TYPE: "text",
              PLACEHOLDER: "e.g., Global Voice Solutions",
              ICON: <Network />,
              VALUE: DATA?.trunk_name,
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {SelectAndView({
              LABEL: "Customer",
              NAME: "customer",
              PLACEHOLDER: "Select Customer",
              ICON: <Server />,
              OPTIONS: data?.map((item) => ({
                value: String(item?.id),
                label: item?.company_name,
              })),
              VALUE: DATA?.customer.name,
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {RadioGroupAndView({
              LABEL: "Trunk Type",
              NAME: "trunk_type",
              ICON: <Badge />,
              OPTIONS: TRUNK_TYPE_OPTIONS,
              VALUE: DATA?.trunk_type,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
              
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {RadioGroupAndView({
              LABEL: "STATUS",
              NAME: "status",
              ICON: <Badge />,
              OPTIONS: TRUNK_TYPE_STATUS_OPTIONS,
              VALUE: DATA?.status,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "CPS Limit",
              NAME: "cps_limit",
              TYPE: "number",
              PLACEHOLDER: "e.g., San Francisco",
              ICON: <Server />,
              VALUE: DATA?.cps_limit,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Session Limit",
              NAME: "session_limit",
              TYPE: "number",
              PLACEHOLDER: "e.g., California",
              ICON: <Server />,
              VALUE: DATA?.session_limit,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "DNIS Call Limit",
              NAME: "dnis_call_limit",
              TYPE: "number",
              PLACEHOLDER: "e.g., California",
              ICON: <Server />,
              VALUE: DATA?.dnis_call_limit,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "ANI Call Limit",
              NAME: "ani_call_limit",
              TYPE: "number",
              PLACEHOLDER: "e.g., California",
              ICON: <Server />,
              VALUE: DATA?.ani_call_limit,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mt-2 mb-2">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {RadioGroupAndView({
              LABEL: "Global ANI Block",
              NAME: "global_ani_block",
              ICON: <Server />,
              OPTIONS: TRUNK_TYPE_STATUS_OPTIONS,
              VALUE: DATA?.global_ani_block,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {RadioGroupAndView({
              LABEL: "Global DNIS Block",
              NAME: "global_dnis_block",
              ICON: <Server />,
              OPTIONS: TRUNK_TYPE_STATUS_OPTIONS,
              VALUE: DATA?.global_dnis_block,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {RadioGroupAndView({
              LABEL: "Customer ANI Block",
              NAME: "customer_ani_block",
              ICON: <Server />,
              OPTIONS: TRUNK_TYPE_STATUS_OPTIONS,
              VALUE: DATA?.customer_ani_block,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {RadioGroupAndView({
              LABEL: "Customer DNIS Block",
              NAME: "customer_dnis_block",
              ICON: <Server />,
              OPTIONS: TRUNK_TYPE_STATUS_OPTIONS,
              VALUE: DATA?.global_dnis_block,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="col-span-2 flex justify-end mt-4 mb-4">
          <div className="space-x-2">
            {MODE === "view" && (
              <>
                {edit ? (
                  <>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => setEdit(!edit)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setEdit(true)}>
                    Edit
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
