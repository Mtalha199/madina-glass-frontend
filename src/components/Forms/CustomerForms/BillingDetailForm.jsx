import { InputCommon } from "@/Commons/FormCommons";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Globe, Home, Landmark } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkype } from "@fortawesome/free-brands-svg-icons";
import { useFormContext } from "react-hook-form";
import { CustomerViewCommon } from "@/Commons/CustomerViewCommon";
import { Button } from "@/components/ui/button";

const BillingDetailForm = ({ form, MODE, DATA }) => {
  const { setValue, watch } = useFormContext();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (edit && DATA?.account) {
      // Dynamically set values based on field names
      setValue("billing_contact_name", DATA.account.billing_contact_name || "");
      setValue("billing_contact_email", DATA.account.billing_contact_email || "");
      setValue("billing_contact_skype", DATA.account.billing_contact_skype || "");
      setValue("billing_contact_phone", DATA.account.billing_contact_phone || "");
      setValue("billing_contact_mobile", DATA.account.billing_contact_mobile || "");
      setValue("billing_contact_street_1", DATA.account.billing_contact_street_1 || "");
      setValue("billing_contact_street_2", DATA.account.billing_contact_street_2 || "");
      setValue("billing_contact_city", DATA.account.billing_contact_city || "");
      setValue("billing_contact_state", DATA.account.billing_contact_state || "");
      setValue("billing_contact_zip_code", DATA.account.billing_contact_zip_code || "");
      setValue("billing_contact_country", DATA.account.billing_contact_country || "");
    }
  }, [edit, DATA, setValue]);

  const renderField = ({ label, name, type, placeholder, icon, value, isRequired = false }) => {
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
          <h2 className="text-lg font-semibold mb-2">Billing Contact Detail</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specify the billing detail you want to add.
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Name",
            name: "billing_contact_name",
            type: "text",
            placeholder: "e.g., Jane Smith",
            icon: <User />,
            value: DATA?.account?.billing_contact_name,
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Email",
            name: "billing_contact_email",
            type: "text",
            placeholder: "e.g., jane.smith@example.com",
            icon: <Mail />,
            value: DATA?.account?.billing_contact_email,
            isRequired: true,
          })}
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Skype ID",
            name: "billing_contact_skype",
            type: "text",
            placeholder: "e.g., live:username",
            icon: <FontAwesomeIcon icon={faSkype} size="lg" />,
            value: DATA?.account?.billing_contact_skype,
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Phone Number",
            name: "billing_contact_phone",
            type: "tel",
            placeholder: "+1 234 567 89",
            icon: <Phone />,
            value: DATA?.account?.billing_contact_phone,
          })}
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Mobile Number",
            name: "billing_contact_mobile",
            type: "tel",
            placeholder: "+1 234 567 89",
            icon: <Phone />,
            value: DATA?.account?.billing_contact_mobile,
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
          {renderField({
            label: "Address 1",
            name: "billing_contact_street_1",
            type: "text",
            placeholder: "e.g., 123 Main St, Apt 101",
            icon: <Home />,
            value: DATA?.account?.billing_contact_street_1,
          })}
        </div>
        <div className="col-span-1 md:col-span-1 lg:hidden"></div>
        <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
          {renderField({
            label: "Address 2",
            name: "billing_contact_street_2",
            type: "text",
            placeholder: "e.g., Landmark or Suite Number",
            icon: <Landmark />,
            value: DATA?.account?.billing_contact_street_2,
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "City",
            name: "billing_contact_city",
            type: "text",
            placeholder: "e.g., San Francisco",
            icon: <MapPin />,
            value: DATA?.account?.billing_contact_city,
          })}
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "State",
            name: "billing_contact_state",
            type: "text",
            placeholder: "e.g., California",
            icon: <MapPin />,
            value: DATA?.account?.billing_contact_state,
          })}
        </div>
        <div className="col-span-1 md:col-span-1 lg:hidden"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Zipcode",
            name: "billing_contact_zip_code",
            type: "text",
            placeholder: "e.g., 94103",
            icon: <MapPin />,
            value: DATA?.account?.billing_contact_zip_code,
          })}
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {renderField({
            label: "Country",
            name: "billing_contact_country",
            type: "text",
            placeholder: "e.g., United States",
            icon: <Globe />,
            value: DATA?.account?.billing_contact_country,
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
  );
};

export default BillingDetailForm;
