import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputCommon } from "@/Commons/FormCommons";
import {
  API_END_POINT,
  AUTH_NAMING,
  AUTHENTICATION_VALUE,
  SCREEN_PATH,
} from "@/Constant";
import { useLoginForm } from "../Hooks/CustomHooks";
import { toast } from "@/hooks/use-toast";
import { Loader } from "@/Commons/Loader";

export default function LoginForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const form = useLoginForm();

  async function onSubmit(values) {
    try {
      setLoading(true);
      localStorage.clear();
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${API_END_POINT.AUTH_LOGIN}`,
        {
          username: values.user_name,
          password: values.password,
        }
      );
      const TOKEN = response?.data?.access_token;
      localStorage.setItem(AUTHENTICATION_VALUE.AUTH_TOKEN, TOKEN);
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.detail || "Something went wrong",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputCommon
            LABEL={"User Name"}
            IS_REQUIRED={true}
            NAME={"user_name"}
            TYPE={"text"}
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
            <Button type="submit" className="w-full">
              {loading ? <Loader size={60} /> : AUTH_NAMING.LOGIN}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
