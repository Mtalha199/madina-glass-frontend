import AuthPageLayout from "@/Commons/AuthPageLayout";
import { SCREEN_PATH, AUTH_NAMING } from "../Constant";
import LoginForm from "@/components/Forms/LoginForm";
function Login() {
  return (
    <AuthPageLayout
      TITLE={AUTH_NAMING.LOGIN}
      DESCRIPTION={"Login to access"}
      FOOTER={"Don't have an account?"}
      LINK={SCREEN_PATH.REGISTER}
      LINK_HEADING={"Create New Account"}
    >
      <LoginForm />
    </AuthPageLayout>
  );
}
export default Login;
