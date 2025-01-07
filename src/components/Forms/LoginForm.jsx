import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputCommon } from "@/Commons/FormCommons";
import { AUTH_NAMING } from "@/Constant";
import { Link } from "react-router-dom";
import { useLoginForm } from "../Hooks/CustomHooks";
export default function LoginForm() {
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
            <InputCommon
              LABEL={"Password"}
              IS_REQUIRED={true}
              NAME={"password"}
              TYPE={"password"}
              CONTROL={form.control}
            />

            <div className="flex items-center">
              <div className="ml-auto inline-block text-sm underline">
                <Link
                  to="/forgot-password"
                  className="text-primary ml-auto inline-block text-sm underline font-bold"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>
          <div>
            {/* <Link to={"/dashboard"}> */}
              <Button type="submit" className="w-full">
                {AUTH_NAMING.LOGIN}
              </Button>
            {/* </Link> */}
          </div>
        </form>
      </Form>
    </>
  );
}
