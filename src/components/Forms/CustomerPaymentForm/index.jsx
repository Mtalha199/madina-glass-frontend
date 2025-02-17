import {
  ComboboxCommon,
  InputCommon,
  TextareaCommon,
} from "@/Commons/FormCommons";
import { APICALL } from "@/components/Api/ApiCall";
import { useStirShakenSingle } from "@/components/Hooks/CustomHooks";
import { Form } from "@/components/ui/form";
import { API_END_POINT, API_TYPE } from "@/Constant";
import React, { useEffect, useState } from "react";

const CustomerPaymentForm = ({ onSubmit }) => {
  const formStarShaken = useStirShakenSingle();
  const [customerData, setCustomerData] = useState([]);
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      API_END_POINT.CUSTOMER_LIST,
      setloading,
      null,
      setCustomerData,
      setCount
    );
  };
  return (
    <Form {...formStarShaken}>
      <form onSubmit={formStarShaken.handleSubmit(onSubmit)}>
        <div className="mb-2">
          <ComboboxCommon
            LABEL="Customer"
            NAME="customer"
            OPTIONS={customerData?.map((item) => ({
              value: String(item?.id),
              label: item?.company_name,
            }))}
            CONTROL={formStarShaken.control}
            IS_REQUIRED={true}
            PLACEHOLDER="Select Customer"
          />
        </div>
        <div className="mb-2">
          <ComboboxCommon
            LABEL="Transaction Type"
            NAME="transaction_type"
            OPTIONS={customerData?.map((item) => ({
              value: String(item?.id),
              label: item?.company_name,
            }))}
            CONTROL={formStarShaken.control}
            IS_REQUIRED={true}
            PLACEHOLDER="Select Customer"
          />
        </div>
        <InputCommon
          IS_REQUIRED={true}
          LABEL={"Credit Amount"}
          NAME={"credit_amount"}
          PLACEHOLDER={"$10"}
          TYPE={"number"}
          CONTROL={formStarShaken.control}
        />

        <div>
          <TextareaCommon
            LABEL="Comment"
            NAME="comment"
            PLACEHOLDER="Enter Comment"
            CONTROL={formStarShaken.control}
            ROWS={8}
          />
          <TextareaCommon
            LABEL="Reciept Message"
            NAME="reciept_message"
            PLACEHOLDER="Enter reciept message"
            CONTROL={formStarShaken.control}
            ROWS={8}
          />
        </div>
      </form>
    </Form>
  );
};

export default CustomerPaymentForm;
