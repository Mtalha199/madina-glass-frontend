import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthPageLayout from "@/Commons/AuthPageLayout";
import { AUTH_NAMING } from "@/Constant";
import { InputCommon } from "@/Commons/FormCommons";
import SignUpForm from "@/components/Forms/SignUpForm";

const SignUp = () => {
  return (
    <>
      <AuthPageLayout
        TITLE={AUTH_NAMING.SIGN_UP}
        DESCRIPTION={"Create a New Account"}
        FOOTER={"Already have an account?"}
        LINK={"/"}
        LINK_HEADING={AUTH_NAMING.LOGIN}
      >
        <SignUpForm />
      </AuthPageLayout>
    </>
  );
};

export default SignUp;
