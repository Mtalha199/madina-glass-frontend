import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, NewGroupFormSchema, NewUrlFormSchema, SignUpFormSchema } from "../Schema/auth";

export function useLoginForm() {
  return useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
}
export function useSignUpForm(){
    return useForm({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
          email: "",
          phone_number: "",
          company:"",
          password: "",
        },
      });
}
export function useNewGroupForm(){
  return useForm({
      resolver: zodResolver(NewGroupFormSchema),
      defaultValues: {
        group_name: "",
      },
    });
}
export function useNewUrlForm(){
  return useForm({
      resolver: zodResolver(NewUrlFormSchema),
      defaultValues: {
        name: "",
      },
    });
}