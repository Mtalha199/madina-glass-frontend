import { InputCommon } from "@/Commons/FormCommons";
import React from "react";
import { User, Mail, Phone } from "lucide-react";
import { faSkype } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PrimaryContactDetailForm = ({ form }) => {
  return (
    <>
      <div className="border-b">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4 ">
          <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
            <h2 className="text-lg font-semibold mb-2">
              Primary Contact Detail
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Specify the primary contact you want to add.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"Name"}
              NAME={"primary_contact_name"}
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
              NAME={"primary_contact_email"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., jane.smith@example.com"}
              CONTROL={form.control}
              ICON={<Mail />}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"Skype ID"}
              NAME={"primary_contact_skype"}
              TYPE={"text"}
              PLACEHOLDER={"e.g., live:username"}
              CONTROL={form.control}
              ICON={<FontAwesomeIcon icon={faSkype} size="lg" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"Phone Number"}
              NAME={"primary_contact_phone"}
              TYPE={"tel"}
              PLACEHOLDER={"+1 234 567 89"}
              CONTROL={form.control}
              ICON={<Phone />}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <InputCommon
              LABEL={"Mobile Number"}
              NAME={"primary_contact_mobile"}
              TYPE={"tel"}
              PLACEHOLDER={"+1 234 567 89"}
              CONTROL={form.control}
              ICON={<Phone />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrimaryContactDetailForm;
