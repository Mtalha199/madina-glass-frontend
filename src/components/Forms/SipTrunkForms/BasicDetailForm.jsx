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
} from "lucide-react";
import { InputCommon } from "@/Commons/FormCommons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { CustomerViewCommon } from "@/Commons/CustomerViewCommon";
import { InputFieldAndView } from "../CustomerForms/InputFieldAndView";
export const BasicDetailForm = ({ form, MODE, DATA }) => {
  const [edit, setEdit] = useState(false);

  const renderField = ({
    label,
    name,
    type,
    placeholder,
    icon,
    value,
    isRequired = false,
  }) => {
    return (
      <>
        {MODE === "view" && !edit ? (
          <CustomerViewCommon
            TITLE={label}
            ICON={icon}
            VALUE={value || "N/A"}
          />
        ) : (
          <InputCommon
            LABEL={label}
            IS_REQUIRED={isRequired}
            NAME={name}
            TYPE={type}
            PLACEHOLDER={placeholder}
            CONTROL={form.control}
            ICON={icon}
            VALUE={value}
          />
        )}
      </>
    );
  };
  return (
    <>
      <div className="border-b">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
          <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
            <h2 className="text-lg font-semibold mb-2">Sip Trunk Detail</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Specify the sip trunk detail you want to add.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "SIP Trunk Name",
              NAME: "trunk_name",
              TYPE: "text",
              PLACEHOLDER: "e.g., Global Voice Solutions",
              ICON:<Network />,
              VALUE: DATA?.account?.company_name,
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "SIP Trunk ID",
              NAME: "sip_trunk_id",
              TYPE: "text",
              PLACEHOLDER: "e.g., TRK12345",
              ICON: <Server />,
              VALUE: DATA?.account?.company_type,
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "FRN",
              name: "company_frn",
              type: "text",
              placeholder: "e.g., 123456789 (FRN)",
              icon: <Badge />,
              value: DATA?.account?.company_frn,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "499-A-ID",
              name: "company_id",
              type: "text",
              placeholder: "e.g., ABC-12345",
              icon: <Mail />,
              value: DATA?.account?.company_id,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
            {renderField({
              label: "Address 1",
              name: "company_street_1",
              type: "text",
              placeholder: "e.g., 123 Main St, Apt 101",
              icon: <Home />,
              value: DATA?.account?.company_address1,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
            {renderField({
              label: "Address 2",
              name: "company_street_2",
              type: "text",
              placeholder: "e.g., Landmark or Suite Number",
              icon: <Landmark />,
              value: DATA?.account?.company_address2,
            })}
          </div>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "CPS Limit",
              name: "company_city",
              type: "text",
              placeholder: "e.g., San Francisco",
              icon: <MapPin />,
              value: DATA?.account?.company_city,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "Session Limit",
              name: "session_limit",
              type: "text",
              placeholder: "e.g., California",
              icon: <MapPin />,
              value: DATA?.account?.company_state,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "DNIS Call Limit",
              name: "dnis_call_limit",
              type: "text",
              placeholder: "e.g., 94103",
              icon: <MapPin />,
              value: DATA?.account?.company_zip_code || 0,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "ANI Call Limit",
              name: "ani_call_limit",
              type: "text",
              placeholder: "e.g., United States",
              icon: <Globe />,
              value: DATA?.account?.company_country,
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
