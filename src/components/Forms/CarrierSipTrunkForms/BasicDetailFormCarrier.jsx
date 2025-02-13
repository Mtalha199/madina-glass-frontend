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
  Bell,
} from "lucide-react";
import {
  RadioGroupCommon,
  InputCommon,
  CheckboxCommon,
  SelectCommon,
  ComboboxCommon,
  SwitchCommon,
} from "@/Commons/FormCommons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckboxFieldAndView,
  InputFieldAndView,
  RadioGroupAndView,
  SelectAndView,
  SwitchAndView,
} from "../CustomerForms/InputFieldAndView";
import {
  API_END_POINT,
  API_TYPE,
  TRUNK_TYPE_OPTIONS,
  TRUNK_TYPE_STATUS_OPTIONS,
  VERIFY_CALL_TOKEN,
} from "@/Constant";
import { APICALL } from "@/components/Api/ApiCall";
import { useFormContext } from "react-hook-form";
export const BasicDetailFormCarrier = ({ form, MODE, DATA ,ID }) => {
  const { setValue, watch } = useFormContext();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (DATA) {
      setValue("trunk_name", DATA?.trunk_name || "");
      setValue("customer", String(DATA.customer_id));
      setValue("trunk_type", DATA?.trunk_type);
      setValue("status", DATA?.status);
      setValue("status", DATA?.status);
      setValue("cps_limit", String(DATA?.cps_limit));
      setValue("session_limit", String(DATA?.session_limit));
      setValue("dnis_call_limit", String(DATA?.dnis_call_limit));
      setValue("ani_call_limit", String(DATA?.ani_call_limit));
      setValue("global_ani_block", DATA?.global_ani_block);
      setValue("global_dnis_block", DATA?.global_dnis_block);
      setValue("customer_ani_block", DATA?.customer_ani_block);
      setValue("customer_dnis_block", DATA?.customer_dnis_block);
    }
  }, [ DATA, setValue]);
  useEffect(() => {
    if (ID!==undefined) {
      setValue("customer", String(ID));
    }
  }, [ID, setValue]);
  const [customerData, setCustomerData] = useState([]);
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
      setCustomerData,
      setCount
    );
  };
  return (
    <>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
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
            {
              ID == undefined && 
              <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {SelectAndView({
                LABEL: "Carrier",
                NAME: "customer",
                PLACEHOLDER: "Select Customer",
                ICON: <Server />,
                OPTIONS: customerData?.map((item) => ({
                  value: String(item?.id),
                  label: item?.company_name,
                })),
                VALUE: DATA?.company_name,
                IS_REQUIRED: true,
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
            }
        
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
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
            {SwitchAndView({
              LABEL: "STATUS",
              NAME: "status",
              ICON: <Badge />,
              VALUE: DATA?.status,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 mb-4">
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 mt-2 mb-2">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {SwitchAndView({
              LABEL: "Global ANI Block",
              NAME: "global_ani_block",
              ICON: <Server />,
              VALUE: DATA?.global_ani_block,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {SwitchAndView({
              LABEL: "Global DNIS Block",
              NAME: "global_dnis_block",
              ICON: <Server />,
              VALUE: DATA?.global_dnis_block,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {SwitchAndView({
              LABEL: "SipMap ANI Block",
              NAME: "customer_ani_block",
              ICON: <Server />,
              VALUE: DATA?.customer_ani_block,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {SwitchAndView({
              LABEL: "SipMap DNIS Block",
              NAME: "customer_dnis_block",
              ICON: <Server />,
              VALUE: DATA?.global_dnis_block,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4">
            {RadioGroupAndView({
              LABEL: "Verify Call Token",
              NAME: "trunk_type",
              ICON: <Badge />,
              OPTIONS: VERIFY_CALL_TOKEN,
              VALUE: DATA?.trunk_type,
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
