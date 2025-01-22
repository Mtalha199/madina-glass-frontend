import FormSkeleton from "@/Commons/FormSkeloton";
import { APICALL } from "@/components/Api/ApiCall";
import BillingDetailForm from "@/components/Forms/CustomerForms/BillingDetailForm";
import CompanyDetailForm from "@/components/Forms/CustomerForms/CompanyDetailForm";
import NotificationDetailForm from "@/components/Forms/CustomerForms/NotificationDetailForm";
import PortalCredientials from "@/components/Forms/CustomerForms/PortalCredientials";
import PrimaryContactDetailForm from "@/components/Forms/CustomerForms/PrimaryContactDetailForm";
import TechnicalDetailForm from "@/components/Forms/CustomerForms/TechnicalDetailForm";
import { useContactDetail } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { API_END_POINT, API_TYPE, SCREEN_PATH } from "@/Constant";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { custom } from "zod";

export const AddCustomer = () => {
  const navigate = useNavigate();
  const form = useContactDetail();

  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    const payload = {
      user: {
        username: data.user_name,
        password: data.password,
      },
      customer: {
        company_name: data.company_name,
        company_type: data.company_type,
        company_frn: data.company_frn,
        company_id: data.company_id,
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
        billing_contact_mobile: data.billing_contact_mobile,
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
        rates_notification_email: data.notification_rate_email,
        balance_notification_email: data.notification_balance_email,
        general_notice_email: data.notification_notice_email,
      },
    };
    const response = await APICALL(
      API_TYPE.POST,
      API_END_POINT.ADD_CUSTOMER,
      setLoading,
      payload,
      null,
      null,
      "Customer Added Successfully"
    );
    if (response !== undefined) {
      navigate(SCREEN_PATH.CUSTOMER_LIST);
    }
  }
  return (
    <div className="p-6">
      <Button
        variant="ghost"
        onClick={() => navigate(SCREEN_PATH.CUSTOMER_LIST)}
        className="mb-4"
      >
        <ArrowLeft />
        Customers List
      </Button>
      <h1 className="text-2xl font-bold mb-4">Add Customer</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {loading ? (
            <FormSkeleton />
          ) : (
            <>
              <CompanyDetailForm form={form} MODE={"Add"} />
              <PortalCredientials form={form} />
              <PrimaryContactDetailForm form={form} />
              <BillingDetailForm form={form} />
              <TechnicalDetailForm form={form} />
              <NotificationDetailForm form={form} />
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
