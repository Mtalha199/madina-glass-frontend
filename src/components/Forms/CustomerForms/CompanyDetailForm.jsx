import { InputCommon } from "@/Commons/FormCommons";
import React from "react";

const CompanyDetailForm = ({ form }) => {
  return (
    <>
    <div className="border-b">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
        <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
          <h2 className="text-lg font-semibold mb-2">Company Detail</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specify the company detail you want to add.
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Company Name"}
            IS_REQUIRED={true}
            NAME={"company_name"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., Tech Solutions Inc."}
            CONTROL={form.control}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Company Type"}
            NAME={"company_type"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., Private Limited"}
            CONTROL={form.control}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"FRN"}
            NAME={"frn"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., Tech Solutions Inc."}
            CONTROL={form.control}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"499-A-ID"}
            NAME={"a_id"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., Private Limited"}
            CONTROL={form.control}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
          <InputCommon
            LABEL={"Address 1"}
            NAME={"company_street"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., 123 Main St"}
            CONTROL={form.control}
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:hidden"></div>
        <div className="col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 gap-4">
          <InputCommon
            LABEL={"Address 2"}
            NAME={"company_street"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., 123 Main St"}
            CONTROL={form.control}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"City"}
            NAME={"company_city"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., San Francisco"}
            CONTROL={form.control}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"State"}
            NAME={"company_state"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., California"}
            CONTROL={form.control}
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:hidden"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Zipcode"}
            NAME={"company_zip_code"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., 94103"}
            CONTROL={form.control}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Country"}
            NAME={"company_country"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., United States"}
            CONTROL={form.control}
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default CompanyDetailForm;
