import BillingDetailForm from "@/components/Forms/CustomerForms/BillingDetailForm";
import CompanyDetailForm from "@/components/Forms/CustomerForms/CompanyDetailForm";
import NotificationDetailForm from "@/components/Forms/CustomerForms/NotificationDetailForm";
import PortalCredientials from "@/components/Forms/CustomerForms/PortalCredientials";
import PrimaryContactDetailForm from "@/components/Forms/CustomerForms/PrimaryContactDetailForm";
import TechnicalDetailForm from "@/components/Forms/CustomerForms/TechnicalDetailForm";
import { useContactDetail } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SCREEN_PATH } from "@/Constant";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { custom } from "zod";

export const AddCustomer = ({ IS_TWO_COLUMNS = false }) => {
  const navigate = useNavigate();
  const form = useContactDetail();
  async function onSubmit(values) {
    const addField={
        user:{

        },
        customer:{
          name:values.company_name,
          phone:values.primary_contact_phone, 
          companyname:values.company_name,
          companyaddress:values.company_street,
          companytype:values.company_type,
          primary_contact_name:values.primary_contact_name,
          primary_contact_email:values.primary_contact_email,
          primary_contact_phone:values.primary_contact_phone,
          primary_contact_skype:values.primary_contact_skype,
          billing_contact_name:values.billing_contact_name,
          billing_contact_email:values.billing_contact_email,
          billing_contact_phone:values.billing_contact_phone,
          billing_contact_skype:values.billing_contact_skype,
          tech_contact_name:values.tech_contact_name,
          tech_contact_email:values.tech_contact_email,
          tech_contact_phone:values.tech_contact_phone,
          tech_contact_skype:values.tech_contact_skype,
          rates_notification_email:values.rates_notification_email,
          balance_notification_email:values.balance_notification_email,
          general_notice_email:values.general_notice_email

        }
    }
  //   {
  //     "user": {
  //     "email": "user1233@example.com",
  //     "password": "securepassword",
  //     "role_id": 2
  //     },
  //     "customer": {
  //         "name":"Mazhar Hussain",
  //         "phone" : "0344444",
  //         "companyname": "Example Corp",
  //         "companyaddress": "123 Example Street, City, Country",
  //         "companytype": "Software",
  //         "primary_contact_name": "John Doe",
  //         "primary_contact_email": "john.doe@example.com",
  //         "primary_contact_phone": "+123456789",
  //         "primary_contact_skype": "",
  //         "billing_contact_name": "",
  //         "billing_contact_email": "jane.smith@example.com",
  //         "billing_contact_phone": "+987654321",
  //         "billing_contact_skype": "jane.skype",
  //         "tech_contact_name": "Tom Brown",
  //         "tech_contact_email": "tom.brown@example.com",
  //         "tech_contact_phone": "+192837465",
  //         "tech_contact_skype": "tom.skype",
  //         "rates_notification_email": "rates@example.com",
  //         "balance_notification_email": "balance@example.com",
  //         "general_notice_email": "notice@example.com"
  //     }
  // }
    console.log(values);
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

      {/* <div className="mb-4">
        <h3 className="text-xl font-semibold border-t py-4 border-b">
          Company Detail
        </h3>
      </div> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CompanyDetailForm form={form} />
          <PortalCredientials form={form} />
          <PrimaryContactDetailForm form={form} />
          <BillingDetailForm form={form} />
          <TechnicalDetailForm form={form} />
          <NotificationDetailForm form={form} />

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
