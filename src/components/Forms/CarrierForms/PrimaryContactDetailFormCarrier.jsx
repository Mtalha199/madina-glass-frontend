import React, { useEffect, useState } from "react";
import { User, Mail, Phone } from "lucide-react";
import { faSkype } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomerViewCommon } from "@/Commons/CustomerViewCommon";
import { InputCommon } from "@/Commons/FormCommons"; // Ensure this is the correct import
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { HAS_PERMISSION, PARENT_MODULE_NAME, PERMISSIONS } from "@/Constant";

const PrimaryContactDetailFormCarrier = ({ form, MODE, DATA }) => {
  const { setValue } = useFormContext();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (DATA?.account) {
      setValue(
        "primary_contact_email",
        DATA.account.primary_contact_email || ""
      );
      setValue(
        "primary_contact_mobile",
        DATA.account.primary_contact_mobile || ""
      );
      setValue(
        "primary_contact_phone",
        DATA.account.primary_contact_phone || ""
      );
      setValue(
        "primary_contact_skype",
        DATA.account.primary_contact_skype || ""
      );
      setValue("primary_contact_name", DATA.account.primary_contact_name || "");
    }
  }, [DATA, setValue]);
  const renderField = ({
    label,
    name,
    type,
    placeholder,
    icon,
    value,
    form,
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
    <div className="border-b">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4">
        <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
          <h2 className="text-lg font-semibold mb-2">Primary Contact Detail</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specify the primary contact you want to add.
          </p>
        </div>

        {/* Name */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Name",
            name: "primary_contact_name",
            type: "text",
            placeholder: "e.g., Jane Smith",
            icon: <User />,
            value: DATA?.account?.primary_contact_name,
            form: form,
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4">
        <div className="hidden lg:block lg:col-span-1"></div>

        {/* Email */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Email",
            name: "primary_contact_email",
            type: "text",
            placeholder: "e.g., jane.smith@example.com",
            icon: <Mail />,
            value: DATA?.account?.primary_contact_email,
            form: form,
            isRequired: true,
          })}
        </div>

        {/* Skype ID */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Skype ID",
            name: "primary_contact_skype",
            type: "text",
            placeholder: "e.g., live:username",
            icon: <FontAwesomeIcon icon={faSkype} size="lg" />,
            value: DATA?.account?.primary_contact_skype,
            form: form,
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4">
        <div className="hidden lg:block lg:col-span-1"></div>

        {/* Phone Number */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Phone Number",
            name: "primary_contact_phone",
            type: "tel",
            placeholder: "+1 234 567 89",
            icon: <Phone />,
            value: DATA?.account?.primary_contact_phone,
            form: form,
          })}
        </div>

        {/* Mobile Number */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Mobile Number",
            name: "primary_contact_mobile",
            type: "tel",
            placeholder: "+1 234 567 89",
            icon: <Phone />,
            value: DATA?.account?.primary_contact_mobile,
            form: form,
          })}
        </div>
      </div>
      <div className="col-span-2 flex justify-end mt-4 mb-4">
        <div className="space-x-2">
          {HAS_PERMISSION(
            PARENT_MODULE_NAME.CARRIER,
            PERMISSIONS.CARRIER.LIST.NAME,
            PERMISSIONS.CARRIER.LIST.ACTIONS.CARRIER_UPDATE
          ) &&
            MODE === "view" && (
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

export default PrimaryContactDetailFormCarrier;
