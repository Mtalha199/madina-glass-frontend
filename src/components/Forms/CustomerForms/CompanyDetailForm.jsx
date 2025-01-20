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
} from "lucide-react";
import { InputCommon } from "@/Commons/FormCommons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { CustomerViewCommon } from "@/Commons/CustomerViewCommon";

const CompanyDetailForm = ({ form, MODE,DATA }) => {
  const [edit, setEdit] = useState(false);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (edit && DATA?.account) {
      setValue("company_name", DATA.account.company_name || "");
      setValue("company_type", DATA.account.company_type || "");
      setValue("company_frn", DATA.account.company_frn || "");
      setValue("company_id", DATA.account.company_id || "");
    }
  }, [edit, DATA, setValue]);

  const renderField = ({ label, name, type, placeholder, icon, value ,isRequired =false }) => {
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
  // useEffect(() => {
  //   if (DATA?.account?.company_address) {
  //     const addressParts = DATA.account.company_address.split(","); // Split by commas
  //     if (addressParts.length >= 6) {
  //       // Assigning values to form fields based on the address components
  //       setValue("company_street_1", addressParts[0]?.trim());
  //       setValue("company_street_2", addressParts[1]?.trim());
  //       setValue("company_city", addressParts[2]?.trim());
  //       setValue("company_state", addressParts[3]?.trim());
  //       setValue("company_zip_code", addressParts[4]?.trim());
  //       setValue("company_country", addressParts[5]?.trim());
  //     } else {
  //       console.warn("Address format seems incorrect, expected 6 parts.");
  //     }
  //   }
  // }, [DATA, setValue]);
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
            {renderField({
              label: "Company Name",
              name: "company_name",
              type: "text",
              placeholder: "e.g., Tech Solutions Inc.",
              icon: <Building />,
              value: DATA?.account?.company_name,
              isRequired:true,
            })}
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "Company Type",
              name: "company_type",
              type: "text",
              placeholder: "e.g., LLC.",
              icon: <Factory />,
              value: DATA?.account?.company_type,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 ">
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
              value: DATA?.account?.company_street_1,
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
              value: DATA?.account?.company_street_2,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "City",
              name: "company_city",
              type: "text",
              placeholder: "e.g., San Francisco",
              icon: <MapPin />,
              value: DATA?.account?.company_city,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "State",
              name: "company_state",
              type: "text",
              placeholder: "e.g., California",
              icon: <MapPin />,
              value: DATA?.account?.company_state,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "Zipcode",
              name: "company_zip_code",
              type: "text",
              placeholder: "e.g., 94103",
              icon: <MapPin />,
              value: DATA?.account?.company_zip_code,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "Country",
              name: "company_country",
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

export default CompanyDetailForm;
