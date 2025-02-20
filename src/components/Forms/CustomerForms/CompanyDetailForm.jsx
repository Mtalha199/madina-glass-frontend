import {
  Building,
  Factory,
  MapPin,
  Home,
  Landmark,
  Globe,
  Mail,
  Badge,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { InputFieldAndView } from "./InputFieldAndView";
import { set } from "date-fns";

const CompanyDetailForm = ({ form, MODE, DATA }) => {
  const [edit, setEdit] = useState(false);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (DATA?.account) {
      setValue("company_name", DATA.account.company_name || "");
      setValue("company_type", DATA.account.company_type || "");
      setValue("company_frn", DATA.account.company_frn || "");
      setValue("company_id", DATA.account.company_id || "");
      setValue("company_street_1", DATA.account.company_address1 || "");
      setValue("company_street_2", DATA.account.company_address2 || "");
      setValue("company_city", DATA.account.company_city || "");
      setValue("company_state", DATA.account.company_state || "");
      setValue("company_zip_code", DATA.account.company_zipcode || "");
      setValue("company_country", DATA.account.company_country || "");
      setValue("primary_contact_email", DATA.account.primary_contact_email || "");
      setValue("billing_contact_email", DATA.account.billing_contact_email || "");
      setValue("techinical_contact_email", DATA.account.techinical_contact_email || "");
      setValue("notification_notice_email", DATA.account.notification_notice_email || "");
      setValue("notification_rate_email", DATA.account.notification_rate_email || "");
      setValue("notification_balance_email", DATA.account.notification_balance_email || "");
      setValue("trouble_ticket_email", DATA.account.trouble_ticket_email || "");




    }
  }, [DATA, setValue]);

  return (
    <>
      <div className="border-b">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
          <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
            <h2 className="text-lg font-semibold mb-2">Company Detail</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Specify the company detail you want to add.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Company Name",
              NAME: "company_name",
              TYPE: "text",
              PLACEHOLDER: "e.g., Tech Solutions Inc.",
              ICON: <Building />,
              VALUE: DATA?.account?.company_name,
              IS_REQUIRED: true,
              MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Company Type",
              NAME: "company_type",
              TYPE: "text",
              PLACEHOLDER: "e.g., LLC.",
              ICON: <Factory />,
              VALUE: DATA?.account?.company_type,
              MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "FRN",
              NAME: "company_frn",
              TYPE: "text",
              PLACEHOLDER: "e.g., 123456789 (FRN)",
              ICON: <Badge />,
              VALUE: DATA?.account?.company_frn,
              MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "499-A-ID",
              NAME: "company_id",
              TYPE: "text",
              PLACEHOLDER: "e.g., ABC-12345",
              ICON: <Mail />,
              VALUE: DATA?.account?.company_id,
              MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Address 1",
              NAME: "company_street_1",
              TYPE: "text",
              PLACEHOLDER: "e.g., 123 Main St, Apt 101",
              ICON: <Home />,
              VALUE: DATA?.account?.company_address1,
              MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Address 2",
              NAME: "company_street_2",
              TYPE: "text",
              PLACEHOLDER: "e.g., Landmark or Suite Number",
              ICON: <Landmark />,
              VALUE: DATA?.account?.company_address2,
              MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "City",
              NAME: "company_city",
              TYPE: "text",
              PLACEHOLDER: "e.g., San Francisco",
              ICON: <MapPin />,
              VALUE: DATA?.account?.company_city,
              MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "State",
              NAME: "company_state",
              TYPE: "text",
              PLACEHOLDER: "e.g., California",
              ICON: <MapPin />,
              VALUE: DATA?.account?.company_state,
              MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Zipcode",
              NAME: "company_zip_code",
              TYPE: "text",
              PLACEHOLDER: "e.g., 94103",
              ICON: <MapPin />,
              VALUE: DATA?.account?.company_zipcode,
              MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Country",
              NAME: "company_country",
              TYPE: "text",
              PLACEHOLDER: "e.g., United States",
              ICON: <Globe />,
              VALUE: DATA?.account?.company_country,
              MODE,
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

export default CompanyDetailForm;
