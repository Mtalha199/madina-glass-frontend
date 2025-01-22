import { CustomerViewCommon } from "@/Commons/CustomerViewCommon";
import { InputCommon } from "@/Commons/FormCommons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const NotificationDetailForm = ({ form, MODE, DATA }) => {
  const [edit, setEdit] = useState(false);

  const { setValue, watch } = useFormContext();
  const primaryContactEmail = form.getValues("primary_contact_email");

  const noticeChecked = watch("notification_notice_checked");
  const rateChecked = watch("notification_rate_checked");
  const balanceChecked = watch("notification_balance_checked");
  const troubleChecked = watch("notification_trouble_checked");
  useEffect(() => {
    if (edit && DATA?.account) {
      setValue(
        "notification_notice_email",
        DATA?.account?.general_notice_email || ""
      );
      setValue(
        "notification_rate_email",
        DATA?.account?.rates_notification_email || ""
      );
      setValue(
        "notification_balance_email",
        DATA?.account?.balance_notification_email || ""
      );
      setValue(
        "notification_trouble_ticket_email",
        DATA?.account?.trouble_ticket_email || ""
      );
    }
  }, [edit, DATA, setValue]);
  const handleCheckboxChange = (fieldName, checked) => {
    setValue(fieldName, checked ? primaryContactEmail : "");
  };
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
    <div className="border-b mt-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
        <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
          <h2 className="text-lg font-semibold mb-2">Notification Detail</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specify the notification detail you want to add.
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Email-notices",
            name: "notification_notice_email",
            type: "email",
            placeholder: "jane.smith@example.com",
            icon: <Mail />,
            value: DATA?.account?.general_notice_email,
            isRequired: true,
          })}
        </div>
        {MODE === "view" && edit && (
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
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4  ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Email-Rates",
            name: "notification_rate_email",
            type: "email",
            placeholder: "jane.smith@example.com",
            icon: <Mail />,
            value: DATA?.account?.rates_notification_email,
            isRequired: true,
          })}
        </div>
        {MODE === "view" && edit && (
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
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4  ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Email-Balance",
            name: "notification_balance_email",
            type: "email",
            placeholder: "jane.smith@example.com",
            icon: <Mail />,
            value: DATA?.account?.balance_notification_email,
            isRequired: true,
          })}
        </div>
        {MODE === "view" && edit && (
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
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4  ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Email-Trouble Tickets",
            name: "notification_trouble_ticket_email",
            type: "email",
            placeholder: "jane.smith@example.com",
            icon: <Mail />,
            value: DATA?.account?.trouble_ticket_email,
            isRequired: true,
          })}
        </div>
        {MODE === "view" && edit && (
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
        )}
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
  );
};

export default NotificationDetailForm;
