import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema, loginFormSchema, NewGroupFormSchema, NewUrlFormSchema, SignUpFormSchema } from "../Schema/auth";

export function useLoginForm() {
  return useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      user_name: "",
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


export function useContactDetail(){
  return useForm({
      resolver: zodResolver(ContactFormSchema),
      defaultValues: {
        company_name: "",
        company_type:"",
        company_street:"",
        company_city:"",
        company_state:"",
        company_country:"",
        company_zip_code:"",
        primary_contact_email:"",
        primary_contact_name:"",
        primary_contact_phone:"",
        primary_contact_skype:"",
        primary_contact_street:"",
        primary_contact_city:"",
        primary_contact_state:"",
        primary_contact_country:"",
        primary_contact_zip_code:"",
        billing_contact_email:"",
        billing_contact_name:"",
        billing_contact_phone:"",
        billing_contact_skype:"",
        billing_contact_street:"",
        billing_contact_city:"",
        billing_contact_state:"",
        billing_contact_country:"",
        billing_contact_zip_code:"",
        notification_contact_email:"",
        notification_contact_name:"",
        notification_contact_phone:"",
        notification_contact_skype:"",
        


      },
    });
}