import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddGroup, BasicSipTrunkSchema, ContactFormSchema, ContactFormSchemaCarrier, ContactFormSchemaEdit, IpWhitelistSchemaForEdit, loginFormSchema, NewGroupFormSchema, NewUrlFormSchema, SignUpFormSchema, SipTrunkForm, StirShakenFormBulk, StirShakenFormSingle } from "../Schema/auth";
import { ATTESTATION_OPTIONS, TRUNK_TYPE_OPTIONS } from "@/Constant";

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
        company_frn:"",
        company_id:"",
        company_street_1 :"",
        company_street_2:"",
        company_city:"",
        company_state:"",
        company_zip_code:"",
        company_country:"",
        
        user_name:"",
        password:"",
        confirm_password:"",

        
        primary_contact_name:"",
        primary_contact_email:"",
        primary_contact_skype:"",
        primary_contact_phone:"",
        primary_contact_mobile:"",

        billing_contact_name:"",
        billing_contact_email:"",
        billing_contact_skype:"",
        billing_contact_phone:"",
        billing_contact_mobile :"",
        billing_contact_street_1:"",
        billing_contact_street_2:"",
        billing_contact_city:"",
        billing_contact_state:"",
        billing_contact_zip_code:"",
        billing_contact_country:"",
       
        techinical_contact_name:"",
        techinical_contact_email:"",
        techinical_contact_skype:"",
        techinical_contact_phone:"",
        techinical_contact_mobile:"",


        notification_notice_email:"",
        notification_rate_email:"",
        notification_balance_email:"",
        notification_trouble_ticket_email:"",
        


      },
    });
}
export function useContactDetailCarrier(){
  return useForm({
      resolver: zodResolver(ContactFormSchemaCarrier),
      defaultValues: {
        company_name: "",
        company_street_1 :"",
        company_street_2:"",
        company_city:"",
        company_state:"",
        company_zip_code:"",
        company_country:"",

        primary_contact_name:"",
        primary_contact_email:"",
        primary_contact_skype:"",
        primary_contact_phone:"",
        primary_contact_mobile:"",

        billing_contact_name:"",
        billing_contact_email:"",
        billing_contact_skype:"",
        billing_contact_phone:"",
        billing_contact_street_1:"",
        billing_contact_street_2:"",
        billing_contact_city:"",
        billing_contact_state:"",
        billing_contact_zip_code:"",
        billing_contact_country:"",
       
        techinical_contact_name:"",
        techinical_contact_email:"",
        techinical_contact_skype:"",
        techinical_contact_phone:"",
        techinical_contact_mobile:"",

        notification_trouble_ticket_email:"",
        


      },
    });
}


export function useContactDetailEdit(){
  return useForm({
      resolver: zodResolver(ContactFormSchemaEdit),
      defaultValues: {
        company_name: "",
        company_type:"",
        company_frn:"",
        company_id:"",
        company_street_1 :"",
        company_street_2:"",
        company_city:"",
        company_state:"",
        company_zip_code:"",
        company_country:"",
        
        user_name:"",
        password:"",
        confirm_password:"",

        
        primary_contact_name:"",
        primary_contact_email:"",
        primary_contact_skype:"",
        primary_contact_phone:"",
        primary_contact_mobile:"",

        billing_contact_name:"",
        billing_contact_email:"",
        billing_contact_skype:"",
        billing_contact_phone:"",
        billing_contact_mobile :"",
        billing_contact_street_1:"",
        billing_contact_street_2:"",
        billing_contact_city:"",
        billing_contact_state:"",
        billing_contact_zip_code:"",
        billing_contact_country:"",
       
        techinical_contact_name:"",
        techinical_contact_email:"",
        techinical_contact_skype:"",
        techinical_contact_phone:"",
        techinical_contact_mobile:"",


        notification_notice_email:"",
        notification_rate_email:"",
        notification_balance_email:"",
        notification_trouble_ticket_email:"",
        


      },
    });
}



export function useSipTrunk(){
  return useForm({
      resolver: zodResolver(SipTrunkForm),
      defaultValues: {
        // trunk_name:"",
        // trunk_type:TRUNK_TYPE_OPTIONS[2].value,
        // customer:"",
        // global_ani_block:false,
        // global_dnis_block:false,
        // customer_ani_block:false,
        // customer_dnis_block:false,
        // cps_limit:"0",
        // session_limit:"0",
        // dnis_call_limit:"0",
        // ani_call_limit:"0",
        // status:true,

        // ipEntries: [],

      },
    });
}




export function useBasicSipTrunkForm() {
  return useForm({
    resolver: zodResolver(BasicSipTrunkSchema),
    defaultValues: {
      trunk_name: "",
      trunk_type: "",
      customer: "",
      global_ani_block: false,
      global_dnis_block: false,
      customer_ani_block: false,
      customer_dnis_block: false,
      cps_limit: "0",
      session_limit: "0",
      dnis_call_limit: "0",
      ani_call_limit: "0",
      status: true,
    },
  });
}

export function useIpWhitelistForm() {
  return useForm({
    resolver: zodResolver(IpWhitelistSchemaForEdit),
    defaultValues: {
      ipEntries: [],
    },
  });
}



export function useStirShakenSingle(){
  return useForm({
      resolver: zodResolver(StirShakenFormSingle),
      defaultValues: {
        attestation:"",
        phone_number:"",
        notes:"",
      },
    });
}

export function useStirShakenBulk(){
  return useForm({
      resolver: zodResolver(StirShakenFormBulk),
      defaultValues: {
        attestation:"",
        mappedData:null,
      },
    });
}


export function useLCR(){
  return useForm({
      resolver: zodResolver(SipTrunkForm),
      defaultValues: {

        limit_cps:0,
        limit_session:0,
        limit_ani:0,

        limit_dnis:0,
        priority:50,
        override_extend:0,


      },
    });
}


export function useAddGroup(){
  return useForm({
      resolver: zodResolver(AddGroup),
      defaultValues: {
        group_name:"",
      },
    });
}