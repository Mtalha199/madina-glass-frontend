import FormSkeleton from "@/Commons/FormSkeloton";
import { APICALL } from "@/components/Api/ApiCall";
import CompanyDetailForm from "@/components/Forms/CustomerForms/CompanyDetailForm";
import DetailForm from "@/components/Forms/RateDeckForms/DetailForm";
import OtherDetail from "@/components/Forms/RateDeckForms/OtherDetail";
import { useContactDetail, useRateDeck } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { API_END_POINT, API_TYPE, SCREEN_PATH, TOAST_MESSAGES } from "@/Constant";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GenerateRateDecks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useRateDeck();
  async function onSubmit(data) {
    const payload = {
      margin: data.margin,
      file_name: data.file_name,
      min_profit: data.min_profit,
      max_profit: data.max_profit,
      include_toll_free: data.include_toll_free,
      toll_free_price: data.toll_free_price,
      populate_interminate_as: data.populate_interminate_as,
      rounding_precision:data.rounding_percision,
      rounding_method: data.rounding_method,
      options: {
        non_juridictional: data.non_juridictional,
        local_only_rate_deck: data.local_only_rate_deck,
        use_carrier_restrictions: data.use_carrier_restrictions,
        price_cap:data.price_cap,

      },
      areas: {
        us48: data.us48,
        alaska: data.alaska,
        hawaii: data.hawaii,
        canada: data.canada,
        yukon: data.yukon,
        non_us_canada_country_code_1: data.non_us_canada_country_code_1,
        user_defined: data.user_defined,
      },
      sip_trunks_ids: data.selectedCarriers.map((item) =>
        item.trunks.map((item) => item?.id)
      ).flat(),
      build_off_which_place: data.build_off_which_place_carrier,
      max_division: parseInt(data.max_devision, 10),
      max_effective_date: new Date(data.effective_date).toISOString(),
      custom_for_one_account: data.custom_for_one_account,
    };
        const response = await APICALL(
          API_TYPE.POST,
          API_END_POINT.RATE_DECK,
          setLoading,
          payload,
          null,
          null,
          TOAST_MESSAGES.RATE_DECK_ADDED
        );
        if (response !== undefined) {
          navigate(SCREEN_PATH.RATE_DECK_LIST_CUSTOMER);
        }
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
