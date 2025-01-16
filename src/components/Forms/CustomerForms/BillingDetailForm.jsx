import { InputCommon } from "@/Commons/FormCommons";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { User, Mail, Phone, MapPin, Globe, Home, Landmark } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkype } from "@fortawesome/free-brands-svg-icons";
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
        setValue(
          `billing_contact_${field}`,
          form.getValues(`primary_contact_${field}`)
        );
      });
    } else {
      billingContactFields.forEach((field) => {
        setValue(`billing_contact_${field}`, "");
      });
    }
  };

  return (
    <div className="border-b">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4 ">
        <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
          <h2 className="text-lg font-semibold mb-2">Billing Contact Detail</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specify the billing detail you want to add.
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Name"}
            NAME={"billing_contact_name"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., Jane Smith"}
            CONTROL={form.control}
            ICON={<User />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Email"}
            IS_REQUIRED={true}
            NAME={"billing_contact_email"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., jane.smith@example.com"}
            CONTROL={form.control}
            ICON={<Mail />}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Skype ID"}
            NAME={"billing_contact_skype"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., live:username"}
            CONTROL={form.control}
            ICON={<FontAwesomeIcon icon={faSkype} size="lg" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Phone Number"}
            NAME={"billing_contact_phone"}
            TYPE={"tel"}
            PLACEHOLDER={"+1 234 567 89"}
            CONTROL={form.control}
            ICON={<Phone />}
            umber
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Mobile Number"}
            NAME={"billing_contact_mobile"}
            TYPE={"tel"}
            PLACEHOLDER={"+1 234 567 89"}
            CONTROL={form.control}
            ICON={<Phone />}
            Number
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
          <InputCommon
            LABEL={"Address 1"}
            NAME={"billing_contact_street_1"}
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
            NAME={"billing_contact_street_2"}
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
            NAME={"billing_contact_city"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., San Francisco"}
            CONTROL={form.control}
            ICON={<MapPin />}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"State"}
            NAME={"billing_contact_state"}
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
            NAME={"billing_contact_zip_code"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., 94103"}
            CONTROL={form.control}
            ICON={<MapPin />}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Country"}
            NAME={"billing_contact_country"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., United States"}
            CONTROL={form.control}
            ICON={<Globe />}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingDetailForm;
