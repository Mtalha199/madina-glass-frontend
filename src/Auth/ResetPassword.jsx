import AuthPageLayout from "@/Commons/AuthPageLayout";
import { AUTH_NAMING } from "../Constant";
import ResetPasswordForm from "@/components/Forms/ResetPasswordForm";
function ResetPassword() {
  return (
    <AuthPageLayout
      TITLE={AUTH_NAMING.SET_PASSWORD}
      DESCRIPTION={"Set a New Password"}
      FOOTER={"Cancel?"}
      LINK={"/"}
      LINK_HEADING={"Go to Login"}
    >
      <ResetPasswordForm />
    </AuthPageLayout>
  );
}
export default ResetPassword;
