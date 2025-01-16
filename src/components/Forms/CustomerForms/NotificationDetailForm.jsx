import { InputCommon } from "@/Commons/FormCommons";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

const NotificationDetailForm = ({ form }) => {
  const { setValue, watch } = useFormContext();
  const primaryContactEmail = form.getValues("primary_contact_email");

  const noticeChecked = watch("notification_notice_checked");
  const rateChecked = watch("notification_rate_checked");
  const balanceChecked = watch("notification_balance_checked");
  const troubleChecked = watch("notification_trouble_checked");

  const handleCheckboxChange = (fieldName, checked) => {
    setValue(fieldName, checked ? primaryContactEmail : "");
  };

  return (
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
            NAME={"notification_notice_email"}
            TYPE={"text"}
            PLACEHOLDER={"jane.smith@example.com"}
            CONTROL={form.control}
            ICON={<Mail />}
          />
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4 flex items-center">
          <div className="flex items-center mt-8 border rounded-md p-2">
            <Checkbox
              checked={noticeChecked}
              onCheckedChange={(checked) =>
                handleCheckboxChange("notification_notice_email", checked)
              }
            />

            <label htmlFor="terms" className="mx-2 text-sm font-medium">
              Use Primary Contact Email
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4  ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Email-Rates"}
            IS_REQUIRED={true}
            NAME={"notification_rate_email"}
            TYPE={"text"}
            PLACEHOLDER={"jane.smith@example.com"}
            CONTROL={form.control}
            ICON={<Mail />}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4 flex items-center">
          <div className="flex items-center mt-8 border rounded-md p-2">
            <Checkbox
              checked={rateChecked}
              onCheckedChange={(checked) =>
                handleCheckboxChange("notification_rate_email", checked)
              }
            />
            <label htmlFor="terms" className="mx-2 text-sm font-medium">
              Use Primary Contact Email
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4  ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Email-Balance"}
            IS_REQUIRED={true}
            NAME={"notification_balance_email"}
            TYPE={"text"}
            PLACEHOLDER={"jane.smith@example.com"}
            CONTROL={form.control}
            ICON={<Mail />}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4 flex items-center">
          <div className="flex items-center mt-8 border rounded-md p-2">
            <Checkbox
              checked={balanceChecked}
              onCheckedChange={(checked) =>
                handleCheckboxChange("notification_balance_email", checked)
              }
            />
            <label htmlFor="terms" className="mx-2 text-sm font-medium">
              Use Primary Contact Email
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4  ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Email-Trouble Tickets"}
            IS_REQUIRED={true}
            NAME={"notification_trouble_ticket_email"}
            TYPE={"text"}
            PLACEHOLDER={"jane.smith@example.com"}
            CONTROL={form.control}
            ICON={<Mail />}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4 flex items-center">
          <div className="flex items-center mt-8 border rounded-md p-2">
            <Checkbox
              checked={troubleChecked}
              onCheckedChange={(checked) =>
                handleCheckboxChange(
                  "notification_trouble_ticket_email",
                  checked
                )
              }
            />
            <label htmlFor="terms" className="mx-2 text-sm font-medium">
              Use Primary Contact Email
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailForm;
