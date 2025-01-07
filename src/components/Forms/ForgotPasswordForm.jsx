import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputCommon } from "@/Commons/FormCommons";
import { AUTH_NAMING } from "@/Constant";
import { Link } from "react-router-dom";
import { useLoginForm } from "../Hooks/CustomHooks";
export default function ForgotPasswordForm() {
  const form = useLoginForm();
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
          <div>
            {/* <Link to={"/reset-password"}> */}
              <Button type="submit" className="w-full">
                {AUTH_NAMING.RESET_PASSWORD}
              </Button>
            {/* </Link> */}
          </div>
        </form>
      </Form>
    </>
  );
}
