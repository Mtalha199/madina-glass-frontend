import CommonDrawer from "@/Commons/DrawerCommon";
import { InputCommon, RadioGroupCommon, TextareaCommon } from "@/Commons/FormCommons";
import CustomerPaymentTableCommon from "@/Commons/TableCommons/CustomerPaymentTable";
import CustomerPaymentForm from "@/components/Forms/CustomerPaymentForm";
import { useStirShakenSingle } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const CustomerPayment = () => {
      const [openSingle, setOpenSingle] = useState(false);
      const formStarShaken = useStirShakenSingle();
    async function onSubmit(data) {
        console.log(data);
      }
      const handleDrawerClose = () => {
        setOpenSingle(!openSingle);
      };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer Payment</h1>
        <div className="flex space-x-2">
              <CommonDrawer
                title="Add Balance"
                description="Please enter a amount and choose the payment type to add balance"
                isOpen={openSingle}
                onOpenChange={handleDrawerClose}
                onSave={() => formStarShaken.handleSubmit(onSubmit)()}
                trigger={
                  <Button type="button">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Balance
                  </Button>
                }
              >
                <CustomerPaymentForm onSubmit={onSubmit} />
              </CommonDrawer>
              </div>
      </div>
      <CustomerPaymentTableCommon />
    </div>
  );
};

export default CustomerPayment;
