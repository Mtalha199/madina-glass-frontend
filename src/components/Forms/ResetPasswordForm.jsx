import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputCommon } from "@/Commons/FormCommons";
import { AUTH_NAMING } from "@/Constant";
import { Link } from "react-router-dom";
import { useSignUpForm } from "../Hooks/CustomHooks";
export default function ResetPasswordForm() {
const form=useSignUpForm();
  function onSubmit(values) {
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            {/* <Link to={"/"}> */}
              <Button type="submit" className="w-full">
                {AUTH_NAMING.SET_PASSWORD}
              </Button>
            {/* </Link> */}
          </div>
        </form>
      </Form>
    </>
  );
}
