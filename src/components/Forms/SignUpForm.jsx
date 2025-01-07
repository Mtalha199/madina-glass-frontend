import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputCommon } from "@/Commons/FormCommons";
import { AUTH_NAMING } from "@/Constant";
import { Link } from "react-router-dom";
import { useSignUpForm } from "../Hooks/CustomHooks";
export default function SignUpForm() {
const form=useSignUpForm();
  function onSubmit(values) {
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputCommon
            LABEL={"Email"}
            IS_REQUIRED={true}
            NAME={"email"}
            TYPE={"email"}
            PLACEHOLDER={"m@example.com"}
            CONTROL={form.control}
          />
          <InputCommon
            LABEL={"Phone"}
            IS_REQUIRED={true}
            NAME={"phone_number"}
            TYPE={"number"}
            PLACEHOLDER={"+1 555 746 1234"}
            CONTROL={form.control}
          />
          <InputCommon
            LABEL={"Company"}
            IS_REQUIRED={true}
            NAME={"company"}
            TYPE={"text"}
            PLACEHOLDER={"e.g., Tech Innovations Inc."}
            CONTROL={form.control}
          />
          <InputCommon
            LABEL={"Password"}
            IS_REQUIRED={true}
            NAME={"password"}
            TYPE={"password"}
            CONTROL={form.control}
          />
          <InputCommon
            LABEL={"Confirm Password"}
            IS_REQUIRED={true}
            NAME={"confirm_password"}
            TYPE={"password"}
            CONTROL={form.control}
          />
          <div>
            {/* <Link to={"/dashboard"}> */}
              <Button type="submit" className="w-full">
                {AUTH_NAMING.SIGN_UP}
              </Button>
            {/* </Link> */}
          </div>
        </form>
      </Form>
    </>
  );
}
