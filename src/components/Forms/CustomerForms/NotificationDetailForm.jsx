import { InputCommon } from "@/Commons/FormCommons";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useFormContext } from "react-hook-form";

const NotificationDetailForm = ({ form }) => {
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
    // <div className="space-y-4">
    //     <div className="flex justify-between items-center border-t py-4 border-b">
    //                 <h3 className="text-xl font-semibold ">Notification Contact Detail</h3>
    //                 <div>
    //                   <Checkbox
    //                     checked={usePrimaryContact}
    //                     onCheckedChange={handleUsePrimaryContact}
    //                   />
    //                   <label htmlFor="terms" className="mx-2 text-sm font-medium">
    //                     Use Primary Contact Detail
    //                   </label>
    //                 </div>
    //               </div>
    //   <InputCommon
    //     LABEL={"Email"}
    //     IS_REQUIRED={true}
    //     NAME={"notification_contact_email"}
    //     TYPE={"text"}
    //     PLACEHOLDER={"jane.smith@example.com"}
    //     CONTROL={form.control}
    //   />
    //   <InputCommon
    //     LABEL={"Name"}
    //     NAME={"notification_contact_name"}
    //     TYPE={"text"}
    //     PLACEHOLDER={"Jane smith"}
    //     CONTROL={form.control}
    //   />
    //   <InputCommon
    //     LABEL={"Contact Number"}
    //     NAME={"notification_contact_phone"}
    //     TYPE={"tel"}
    //     PLACEHOLDER={"+123456789"}
    //     CONTROL={form.control}
    //   />
    //   <InputCommon
    //     LABEL={"Skype ID"}
    //     NAME={"notification_contact_skype"}
    //     TYPE={"text"}
    //     PLACEHOLDER={"e.g., live:username"}
    //     CONTROL={form.control}
    //   />
    // </div>
    <div className="border-b mt-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
        <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
          <h2 className="text-lg font-semibold mb-2">Notification Detail</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specify the notification detail you want to add.
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Email-notices"}
            IS_REQUIRED={true}
            NAME={"primary_contact_email"}
            TYPE={"text"}
            PLACEHOLDER={"jane.smith@example.com"}
            CONTROL={form.control}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Email-Rates"}
            IS_REQUIRED={true}
            NAME={"primary_contact_email"}
            TYPE={"text"}
            PLACEHOLDER={"jane.smith@example.com"}
            CONTROL={form.control}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4  ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Email-Balance"}
            IS_REQUIRED={true}
            NAME={"primary_contact_email"}
            TYPE={"text"}
            PLACEHOLDER={"jane.smith@example.com"}
            CONTROL={form.control}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Email-Trouble Tickets"}
            IS_REQUIRED={true}
            NAME={"primary_contact_email"}
            TYPE={"text"}
            PLACEHOLDER={"jane.smith@example.com"}
            CONTROL={form.control}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailForm;
