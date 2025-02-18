import FormSkeleton from "@/Commons/FormSkeloton";
import SkeletonCardLayout from "@/Commons/SkelotonCard";
import DetailForm from "@/components/Forms/RateDeckForms/DetailForm";
import { useContactDetail } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DATA_VIEW_MODE, SCREEN_PATH } from "@/Constant";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SpecificRateDeck = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useContactDetail();
  async function onSubmit(data) {
    console.log(data);
  }
  return (
    <>
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate(SCREEN_PATH.RATE_DECK_LIST_CUSTOMER)}
          className="mb-4"
        >
          <ArrowLeft />
          Customers List
        </Button>
        {loading ? (
          <SkeletonCardLayout ROWS={10} COLUMNS={3} />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {loading ? (
                <FormSkeleton />
              ) : (
                <>
                  <DetailForm form={form} MODE={DATA_VIEW_MODE.VIEW} />
                </>
              )}
            </form>
          </Form>
        )}
      </div>
    </>
  );
};

export default SpecificRateDeck;
