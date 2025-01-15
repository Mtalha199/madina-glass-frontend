import { InputCommon } from "@/Commons/FormCommons";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useFormContext } from "react-hook-form";
const BillingDetailForm = ({ form }) => {
  const { setValue, watch } = useFormContext();
  const usePrimaryContact = watch("usePrimaryContact");
  const handleUsePrimaryContact = (checked) => {
    const billingContactFields = [
      "email",
      "name",
      "phone",
      "skype",
      "street",
      "city",
      "state",
      "zip_code",
      "country",
    ];
  
    if (checked) {
      billingContactFields.forEach((field) => {
        setValue(`billing_contact_${field}`, form.getValues(`primary_contact_${field}`));
      });
    } else {
      billingContactFields.forEach((field) => {
        setValue(`billing_contact_${field}`, "");
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-t py-4 border-b">
        <h3 className="text-xl font-semibold ">Billing Contact Detail</h3>
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
        NAME={"billing_contact_email"}
        TYPE={"text"}
        PLACEHOLDER={"jane.smith@example.com"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Name"}
        NAME={"billing_contact_name"}
        TYPE={"text"}
        PLACEHOLDER={"Jane smith"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Contact Number"}
        NAME={"billing_contact_phone"}
        TYPE={"tel"}
        PLACEHOLDER={"+123456789"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Skype ID"}
        NAME={"billing_contact_skype"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., live:username"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Street"}
        NAME={"billing_contact_street"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., 123 Main St"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"City"}
        NAME={"billing_contact_city"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., San Francisco"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"State"}
        NAME={"billing_contact_state"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., California"}
        CONTROL={form.control}
      />

      <InputCommon
        LABEL={"Zipcode"}
        NAME={"billing_contact_zip_code"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., 94103"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Country"}
        NAME={"billing_contact_country"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., United States"}
        CONTROL={form.control}
      />
    </div>
  );
};

export default BillingDetailForm;
