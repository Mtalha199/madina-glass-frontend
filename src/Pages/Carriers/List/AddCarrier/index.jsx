import FormSkeleton from "@/Commons/FormSkeloton";
import { APICALL } from "@/components/Api/ApiCall";
import BillingDetailFormCarrier from "@/components/Forms/CarrierForms/BillingDetailFormCarrier";
import CompanyDetailFormCarrier from "@/components/Forms/CarrierForms/CompanyDetailFormCarrier";
import NotificationDetailFormCarrier from "@/components/Forms/CarrierForms/NotificationDetailFormCarrier";
import PrimaryContactDetailFormCarrier from "@/components/Forms/CarrierForms/PrimaryContactDetailFormCarrier";
import TechnicalDetailFormCarrier from "@/components/Forms/CarrierForms/TechnicalDetailFormCarrier";
import BillingDetailForm from "@/components/Forms/CustomerForms/BillingDetailForm";
import CompanyDetailForm from "@/components/Forms/CustomerForms/CompanyDetailForm";
import NotificationDetailForm from "@/components/Forms/CustomerForms/NotificationDetailForm";
import PortalCredientials from "@/components/Forms/CustomerForms/PortalCredientials";
import PrimaryContactDetailForm from "@/components/Forms/CustomerForms/PrimaryContactDetailForm";
import TechnicalDetailForm from "@/components/Forms/CustomerForms/TechnicalDetailForm";
import {  useContactDetailCarrier } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { API_END_POINT, API_TYPE, DATA_VIEW_MODE, SCREEN_PATH, TOAST_MESSAGES } from "@/Constant";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { custom } from "zod";

export const AddCarrier = () => {
  const navigate = useNavigate();
  const form = useContactDetailCarrier();

  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    const payload = {
      carrier: {
        username: data.user_name,
        password: data.password,
      },
      profile: {
        company_name: data.company_name,
        company_address1:data.company_street_1,
        company_address2: data.company_street_2,
        company_city: data.company_city,
        company_state:data.company_state,
        company_zipcode: data.company_zip_code,
        company_country:data.company_country,

        primary_contact_name: data.primary_contact_name,
        primary_contact_email: data.primary_contact_email,
        primary_contact_phone: data.primary_contact_phone,
        primary_contact_skype: data.primary_contact_skype,
        primary_contact_mobile: data.primary_contact_mobile,

        billing_contact_name: data.billing_contact_name,
        billing_contact_email: data.billing_contact_email,
        billing_contact_phone: data.billing_contact_phone,
        billing_contact_skype: data.billing_contact_skype,
        billing_address1:data.billing_contact_street_1,
        billing_address2: data.billing_contact_street_2,
        billing_city: data.billing_contact_city,
        billing_state:data.billing_contact_state,
        billing_zipcode: data.billing_contact_zip_code,
        billing_country:data.billing_contact_country,

        tech_contact_name: data.techinical_contact_name,
        tech_contact_email: data.techinical_contact_email,
        tech_contact_phone: data.techinical_contact_phone,
        tech_contact_skype: data.techinical_contact_skype,
        tech_contact_mobile: data.techinical_contact_mobile,

        trouble_ticket_email: data.notification_trouble_ticket_email,
      },
    };
    const response = await APICALL(
      API_TYPE.POST,
      API_END_POINT.CARRIERS,
      setLoading,
      payload,
      null,
      null,
      TOAST_MESSAGES.CARRIER_ADDED
    );
    if (response !== undefined) {
      navigate(SCREEN_PATH.CARRIERS_LIST);
    }
  }
  return (
    <div className="p-6">
      <Button
        variant="ghost"
        onClick={() => navigate(SCREEN_PATH.CARRIERS_LIST)}
        className="mb-4"
      >
        <ArrowLeft />
        Carriers List 
      </Button>
      <h1 className="text-2xl font-bold mb-4">Add Carrier</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {loading ? (
            <FormSkeleton />
          ) : (
            <>
              <CompanyDetailFormCarrier form={form} MODE={DATA_VIEW_MODE.ADD} />
              <PortalCredientials form={form} MODE={DATA_VIEW_MODE.ADD}  />
              <PrimaryContactDetailFormCarrier form={form} MODE={DATA_VIEW_MODE.ADD} />
              <BillingDetailFormCarrier form={form} MODE={DATA_VIEW_MODE.ADD} />
              <TechnicalDetailFormCarrier form={form} MODE={DATA_VIEW_MODE.ADD} />
              <NotificationDetailFormCarrier form={form} MODE={DATA_VIEW_MODE.ADD} />
            </>
          )}

          <div className="col-span-2 flex justify-end mt-4">
            <Button type="submit" className="">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
