import { InputCommon } from "@/Commons/FormCommons";
import { Lock, User } from "lucide-react";
import React from "react";

const PortalCredientials = ({ form }) => {
  return (
    <div className="border-b">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6 ">
        <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
          <h2 className="text-lg font-semibold mb-2">
            Portal Credential Detail
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specify the credential you want to add.
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"User Name"}
            IS_REQUIRED={true}
            NAME={"user_name"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., Jane Smith"}
            CONTROL={form.control}
            ICON={<User />}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 space-y-4 mb-4 ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Password"}
            IS_REQUIRED={true}
            NAME={"password"}
            TYPE={"password"}
            PLACEHOLDER={"Enter your password"}
            CONTROL={form.control}
            ICON={<Lock />}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          <InputCommon
            LABEL={"Re-type Password"}
            IS_REQUIRED={true}
            NAME={"confirm_password"}
            TYPE={"password"}
            PLACEHOLDER={"Re-enter your password"}
            CONTROL={form.control}
            ICON={<Lock />}
          />
        </div>
      </div>
    </div>
  );
};

export default PortalCredientials;
