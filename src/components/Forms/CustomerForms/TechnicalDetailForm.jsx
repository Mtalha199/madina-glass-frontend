import { CustomerViewCommon } from "@/Commons/CustomerViewCommon";
import { InputCommon } from "@/Commons/FormCommons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { faSkype } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mail, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const TechnicalDetailForm = ({ form ,MODE,DATA}) => {
    const [edit, setEdit] = useState(false);
  
  const { setValue, watch } = useFormContext();
  useEffect(() => {
    if ( DATA) {
      setValue("techinical_contact_name", DATA?.account?.tech_contact_name || "");
      setValue("techinical_contact_email", DATA?.account?.tech_contact_email || "");
      setValue("techinical_contact_skype", DATA?.account?.tech_contact_skype || "");
      setValue("techinical_contact_phone", DATA?.account?.tech_contact_phone|| "");
      setValue("techinical_contact_mobile", DATA?.account?.tech_contact_mobile || "");
    }
  }, [DATA, setValue]);

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
  return (
    <div className="border-b">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4 ">
        <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
          <h2 className="text-lg font-semibold mb-2">
            Technical Contact Detail
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specify the technical detail you want to add.
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
        {renderField({
        label: "Name",
        name: "techinical_contact_name",
        type: "text",
        placeholder: "e.g., Jane Smith",
        icon: <User />,
        value: DATA?.account?.tech_contact_name || "",
      })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
        {renderField({
        label: "Email",
        name: "techinical_contact_email",
        type: "email",
        placeholder: "jane.smith@example.com",
        icon: <Mail />,
        value: DATA?.account?.tech_contact_email || "",
        isRequired: true,
      })}
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
        {renderField({
        label: "Skype ID",
        name: "techinical_contact_skype",
        type: "text",
        placeholder: "e.g., live:username",
        icon: <FontAwesomeIcon icon={faSkype} size="lg" />,
        value: DATA?.account?.tech_contact_skype || "",
      })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4 ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
        {renderField({
        label: "Phone Number",
        name: "techinical_contact_phone",
        type: "tel",
        placeholder: "+1 234 567 89",
        icon: <Phone />,
        value: DATA?.account?.tech_contact_phone || "",
      })}
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
        {renderField({
        label: "Mobile Number",
        name: "techinical_contact_mobile",
        type: "tel",
        placeholder: "+1 234 567 89",
        icon: <Phone />,
        value: DATA?.account?.tech_contact_mobile || "",
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

export default TechnicalDetailForm;
