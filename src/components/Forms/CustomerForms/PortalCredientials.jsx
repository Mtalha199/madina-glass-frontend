import { InputCommon } from "@/Commons/FormCommons";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useFormContext } from "react-hook-form";

const PortalCredientials = ({ form }) => {
  const { setValue, watch } = useFormContext();
  const usePrimaryContact = watch("usePrimaryContact");
  const handleUsePrimaryContact = (checked) => {
    const billingContactFields = ["email", "name", "phone", "skype"];

    if (checked) {
      billingContactFields.forEach((field) => {
        setValue(
          `notification_contact_${field}`,
          form.getValues(`primary_contact_${field}`)
        );
      });
    } else {
      billingContactFields.forEach((field) => {
        setValue(`notification_contact_${field}`, "");
      });
    }
  };
  return (
<div className="border-b">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4 ">
            <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
              <h2 className="text-lg font-semibold mb-2">Portal Credential Detail</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Specify the credential you want to add.
              </p>
            </div>
    
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              <InputCommon
                LABEL={"User Name"}
                NAME={"primary_contact_name"}
                TYPE={"text"}
                PLACEHOLDER={"Jane smith"}
                CONTROL={form.control}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4 ">
            <div className="hidden lg:block lg:col-span-1"></div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              <InputCommon
                LABEL={"Password"}
                IS_REQUIRED={true}
                NAME={"primary_contact_email"}
                TYPE={"password"}
                // PLACEHOLDER={"jane.smith@example.com"}
                CONTROL={form.control}
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              <InputCommon
                LABEL={"Re-type Password"}
                NAME={"primary_contact_skype"}
                TYPE={"password"}
                // PLACEHOLDER={"e.g., live:username"}
                CONTROL={form.control}
              />
            </div>
          </div>
          
          </div>
  );
};

export default PortalCredientials;
