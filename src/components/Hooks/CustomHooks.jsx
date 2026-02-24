import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddGroup, AddRoleSchema, AddUser, AssignRateDeckInRateDeck, AssignRateDeckInSipTrunk, AssignRateDeckSchema, BasicSipTrunkSchema, ContactFormSchema, ContactFormSchemaCarrier, ContactFormSchemaCarrierEdit, ContactFormSchemaEdit, IpWhitelistSchema, IpWhitelistSchemaForEdit, LCRForm, loginFormSchema, NewGroupFormSchema, NewUrlFormSchema, PercentageForm, PricingInfochema, RateDeckForm, rateDeckUploadBaseSchema, rateDeckUploadWithSipTrunkSchema, SignUpFormSchema, SipTrunkForm, StirShakenFormBulk, StirShakenFormSingle, StirShakenSchema } from "../Schema/auth";
import { ATTESTATION_OPTIONS, ATTESTATION_OPTIONS_DEFAULT, TRUNK_TYPE_OPTIONS, VERIFY_CALL_TOKEN } from "@/Constant";

export function useLoginForm() {
  return useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
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
export function useContactDetailCarrierEdit(){
  return useForm({
      resolver: zodResolver(ContactFormSchemaCarrierEdit),
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
      customer_id: "",
      group_id:"",
      trunk_type:TRUNK_TYPE_OPTIONS[2].value,
      status: true,
      somos:false,
      cps_limit: 0,
      session_limit: 0,
      dnis_call_limit: 0,
      ani_call_limit: 0,
      global_ani_block: false,
      global_dnis_block: false,
      customer_ani_block: false,
      customer_dnis_block: false,
      verify_call_token:VERIFY_CALL_TOKEN[0].value,
      block_matching_src_dst:"",
    },
  });
}

export function useIpWhitelistForm() {
  return useForm({
    resolver: zodResolver(IpWhitelistSchema),
    defaultValues: {
      ipEntries: [],
    },
  });
}
export function useStirShakenForm() {
  return useForm({
    resolver: zodResolver(StirShakenSchema),
    defaultValues: {
      default_action:ATTESTATION_OPTIONS_DEFAULT[0].value,
      stirShakenData: []
    },
  });
}

export function usePricingInfo() {
  return useForm({
    resolver: zodResolver(PricingInfochema),
    defaultValues: {
      billing_type: "",
      initial: "",
      subsequent: "",
      price_cap: false,
      price_protection: false,
      override_carrier_price_protection: false,
      digits_used: "",
      rounding_method: "",
      outbound_media_ip_block: false,
      inbound_media_ip_block: false,
      allow555: false,
      use_global_404_blacklist: false,
      call_extend: false,
      override_call_extending: false,
    },
  });
}

export function useAssignRateDeck(options = {}) {
  const { inSipTrunk = false, inRateDeck = false } = options;
  
  let schema = AssignRateDeckSchema;
  if (inSipTrunk) {
    schema = AssignRateDeckInSipTrunk;
  } else if (inRateDeck) {
    schema = AssignRateDeckInRateDeck;
  }
  
  const defaultValues = {
    effective_date: "",
    ...(inSipTrunk ? { rate_deck: "" } : {}),
    ...(inRateDeck ? { sip_trunk_id: "" } : {})
  };
  
  return useForm({
    resolver: zodResolver(schema),
    defaultValues,
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
export function useRateDeckUpload() {
  return useForm({
    resolver: zodResolver(rateDeckUploadBaseSchema),
    defaultValues: {
      // effective_date: "", 
    },
  });
}
export function useRateDeckUploadWithSipTrunk() {
  return useForm({
    resolver: zodResolver(rateDeckUploadWithSipTrunkSchema),
    defaultValues: {
      effective_date: "",
      sip_trunk_id: "",
    },
  });
}

export function useLCR(){
  return useForm({
      resolver: zodResolver(LCRForm),
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

export function usePercentage(){
  return useForm({
      resolver: zodResolver(PercentageForm),
      defaultValues: {

        limit_cps:0,
        limit_session:0,
        limit_ani:0,
        limit_dnis:0,
        priority:50,
        override_extend:0,
        percentage:0,


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

export function useAddUser(){
  return useForm({
      resolver: zodResolver(AddUser),
      defaultValues: {
        user_name:"",
        time_zone:"",
        email:"",
        first_name:"",
        last_name:"",

      },
    });
}
export function useAddRole(){
  return useForm({
      resolver: zodResolver(AddRoleSchema),
      defaultValues: {
        role_name:"",
      description:"",
      },
    });
}
// ---------------------------------------------------RATE+DECK----------------------------------------------------------------------
export function useRateDeck(){
  return useForm({
      resolver: zodResolver(RateDeckForm),
      defaultValues: {
        margin: "",
        file_name:"",
        min_profit:"",
        max_profit:"",
        include_toll_free :false,
        toll_free_price:"",
        populate_interminate_as:"",
        rounding_percision:"",
        rounding_method:"",
        // non_juridictional:false,
        // local_only_rate_deck:false,
        // use_carrier_restrictions:false,
        us48:false,
        alaska:false,
        hawaii:false,
        canada:false,
        yukon:false,
        non_us_canada_country_code_1:false,
        // user_defined:false,

        build_off_which_place_carrier:"",
        max_devision:"",
        // effective_date:"",
        // custom_for_one_account:false,
        selectedCarriers: [],

      },
    });
}