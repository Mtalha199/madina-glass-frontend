import { InputCommon } from "@/Commons/FormCommons";
import React from "react";

const PrimaryContactDetailForm = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold border-t py-4 border-b">
        Primary Contact Detail
      </h3>
      <InputCommon
        LABEL={"Email"}
        IS_REQUIRED={true}
        NAME={"primary_contact_email"}
        TYPE={"text"}
        PLACEHOLDER={"jane.smith@example.com"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Name"}
        NAME={"primary_contact_name"}
        TYPE={"text"}
        PLACEHOLDER={"Jane smith"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Contact Number"}
        NAME={"primary_contact_phone"}
        TYPE={"tel"}
        PLACEHOLDER={"+123456789"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Skype ID"}
        NAME={"primary_contact_skype"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., live:username"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Street"}
        NAME={"primary_contact_street"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., 123 Main St"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"City"}
        NAME={"primary_contact_city"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., San Francisco"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"State"}
        NAME={"primary_contact_state"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., California"}
        CONTROL={form.control}
      />

      <InputCommon
        LABEL={"Zipcode"}
        NAME={"primary_contact_zip_code"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., 94103"}
        CONTROL={form.control}
      />
      <InputCommon
        LABEL={"Country"}
        NAME={"primary_contact_country"}
        TYPE={"text"}
        PLACEHOLDER={"e.g., United States"}
        CONTROL={form.control}
      />
    </div>
  );
};

export default PrimaryContactDetailForm;
