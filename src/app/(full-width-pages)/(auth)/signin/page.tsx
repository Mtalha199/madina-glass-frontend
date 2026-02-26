import SignInForm from "@/components/auth/SignInForm";
import RedirectIfAuthenticated from "@/components/auth/RedirectIfAuthenticated";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | BFZ Track",
  description: "Sign in to your BFZ Track account",
};

export default function SignIn() {
  return (
    <RedirectIfAuthenticated>
      <SignInForm />
    </RedirectIfAuthenticated>
  );
}
