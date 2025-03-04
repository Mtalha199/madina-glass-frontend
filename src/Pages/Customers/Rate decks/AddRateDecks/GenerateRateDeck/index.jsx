import FormSkeleton from '@/Commons/FormSkeloton';
import CompanyDetailForm from '@/components/Forms/CustomerForms/CompanyDetailForm';
import DetailForm from '@/components/Forms/RateDeckForms/DetailForm';
import OtherDetail from '@/components/Forms/RateDeckForms/OtherDetail';
import { useContactDetail } from '@/components/Hooks/CustomHooks';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SCREEN_PATH } from '@/Constant';
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GenerateRateDecks = () => {
    const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
    
  const form = useContactDetail();
  async function onSubmit(data) {
console.log(data)
  }
    return (
        <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate(SCREEN_PATH.RATE_DECK_LIST_CUSTOMER)}
          className="mb-4"
        >
          <ArrowLeft />
          Rate Deck List
        </Button>
        <h1 className="text-2xl font-bold mb-4">Add Rate Deck</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {loading ? (
              <FormSkeleton />
            ) : (
              <>
                <DetailForm form={form} MODE={"Add"} />
                <OtherDetail form={form} MODE={"Add"} />
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

export default GenerateRateDecks;