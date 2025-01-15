import { InputCommon } from "@/Commons/FormCommons";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useFormContext } from "react-hook-form";

const TechnicalDetailForm = ({ form }) => {
    const { setValue, watch } = useFormContext();
    const usePrimaryContact = watch("usePrimaryContact");
    const handleUsePrimaryContact = (checked) => {
      const billingContactFields = [
        "email",
        "name",
        "phone",
        "skype",
      ];
    
      if (checked) {
        billingContactFields.forEach((field) => {
          setValue(`techinical_contact_${field}`, form.getValues(`primary_contact_${field}`));
        });
      } else {
        billingContactFields.forEach((field) => {
          setValue(`techinical_contact_${field}`, "");
        });
      }
    };
  return (
    <div className="space-y-4">
           <div className="flex justify-between items-center border-t py-4 border-b">
              <h3 className="text-xl font-semibold ">Technical Contact Detail</h3>
              <div>
                <Checkbox
                  checked={usePrimaryContact}
                  onCheckedChange={handleUsePrimaryContact}
                />
                <label htmlFor="terms" className="mx-2 text-sm font-medium">
                  Use Primary Contact Detail
                </label>
              </div>
            </div>
      <InputCommon
        LABEL={"Email"}
        IS_REQUIRED={true}
        NAME={"techinical_contact_email"}
        TYPE={"text"}
        PLACEHOLDER={"jane.smith@example.com"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Name"}
        NAME={"techinical_contact_name"}
        TYPE={"text"}
        PLACEHOLDER={"Jane smith"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Contact Number"}
        NAME={"techinical_contact_phone"}
        TYPE={"tel"}
        PLACEHOLDER={"+123456789"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Skype ID"}
        NAME={"techinical_contact_skype"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., live:username"}
        CONTROL={form.control}
      />
    </div>
  );
};

export default TechnicalDetailForm;
