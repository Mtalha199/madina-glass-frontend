import AuthPageLayout from "@/Commons/AuthPageLayout";
import { AUTH_NAMING } from "../Constant";
import ForgotPasswordForm from "@/components/Forms/ForgotPasswordForm";
function ForgotPassword() {
  return (
    <AuthPageLayout
      TITLE={AUTH_NAMING.RESET_PASSWORD}
      DESCRIPTION={"Enter your email to recieve link to reset the password"}
      FOOTER={"Cancel?"}
      LINK={"/"}
      LINK_HEADING={"Go to Login"}
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}
export default ForgotPassword;
