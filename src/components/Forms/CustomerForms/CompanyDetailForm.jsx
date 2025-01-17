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

const CompanyDetailForm = ({ form, MODE, SETMODE, DATA }) => {
  const [edit, setEdit] = useState(false);
  const handleEditClick = () => {
    setEdit(!edit);
  };
  const { setValue, formState } = useFormContext();
  useEffect(() => {
    if (edit && DATA?.account?.company_name) {
      setValue("company_name", DATA.account.company_name);
      setValue("company_type", DATA.account.company_type);
    }
  }, [edit, DATA, setValue]);

  const renderField = ({ label, name, type, placeholder, icon, value }) => {
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
            IS_REQUIRED={true}
            NAME={name}
            TYPE={type}
            PLACEHOLDER={placeholder}
            CONTROL={form.control}
            ICON={icon}
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
            <h2 className="text-lg font-semibold mb-2">Company Detail</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Specify the company detail you want to add.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "Company Name",
              name: "company_name",
              type:"text",
              placeholder: "e.g., Tech Solutions Inc.",
              icon: <Building />,
              value: DATA?.account?.company_name,
            })}
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {renderField({
              label: "Company Type",
              name: "company_type",
              type:"text",
              placeholder: "e.g., LLC.",
              icon: <Factory />,
              value: DATA?.account?.company_type,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"FRN"}
              NAME={"company_frn"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., 123456789 (FRN)"}
              CONTROL={form.control}
              ICON={<Badge />}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"499-A-ID"}
              NAME={"company_id"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., ABC-12345"}
              CONTROL={form.control}
              ICON={<Mail />}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
            <InputCommon
              LABEL={"Address 1"}
              NAME={"company_street_1"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., 123 Main St, Apt 101"}
              CONTROL={form.control}
              ICON={<Home />}
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
            <InputCommon
              LABEL={"Address 2"}
              NAME={"company_street_2"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., Landmark or Suite Number"}
              CONTROL={form.control}
              ICON={<Landmark />}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"City"}
              NAME={"company_city"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., San Francisco"}
              CONTROL={form.control}
              ICON={<MapPin />}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"State"}
              NAME={"company_state"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., California"}
              CONTROL={form.control}
              ICON={<MapPin />}
            />
          </div>
          <div className="col-span-1 md:col-span-1 lg:hidden"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"Zipcode"}
              NAME={"company_zip_code"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., 94103"}
              CONTROL={form.control}
              ICON={<MapPin />}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"Country"}
              NAME={"company_country"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., United States"}
              CONTROL={form.control}
              ICON={<Globe />}
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end mt-4 mb-4">
          <div className="space-x-2">
            {MODE === "view" && (
              <>
                {edit ? (
                  <Button variant="secondary" onClick={handleEditClick}>
                    Cancel
                  </Button>
                ) : null}
              </>
            )}
            {MODE === "view" && (
              <>
                {edit ? (
                  <Button>Save</Button>
                ) : (
                  <Button onClick={handleEditClick}>Edit</Button>
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
