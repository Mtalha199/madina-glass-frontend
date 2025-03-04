"use client";

import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import {
  API_END_POINT,
  API_TYPE,
  DATA_VIEW_MODE,
  SCREEN_PATH,
  TOAST_MESSAGES,
} from "@/Constant";
import { BasicDetailForm } from "@/components/Forms/SipTrunkForms/BasicDetailForm";
import {
  useBasicSipTrunkForm,
  useIpWhitelistForm,
  usePricingInfo,
  useStirShakenForm,
} from "@/components/Hooks/CustomHooks";
import { APICALL } from "@/components/Api/ApiCall";
import { useEffect, useState } from "react";
import FormSkeleton from "@/Commons/FormSkeloton";
import { Form } from "@/components/ui/form";
import IpWhiteListingForm from "@/components/Forms/SipTrunkForms/IpWhiteListingForn";
import StirAndShaken from "@/components/Forms/SipTrunkForms/StirAndShaken";
import PricingInfoForm from "@/components/Forms/SipTrunkForms/PricingInfoForm";
import Routing from "@/components/Forms/SipTrunkForms/Routing";
export default function SpecificSipTrunk() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);

  const [data, setData] = useState([]);
  const [ipWhiteListingData, setIPWhiteListingData] = useState([]);

  const [newEntries, setNewEntries] = useState();
  const form = useBasicSipTrunkForm();
  const formIpWhiteListing = useIpWhitelistForm();
  const formStirShaken = useStirShakenForm();
  const formPricingInfo = usePricingInfo();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.VIEW_SIP_TRUNK}/${id}`,
      setloading,
      null,
      setData,
      setCount
    );
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.VIEW_IP_WHITE_LISTING}/${id}`,
      setloading,
      null,
      setIPWhiteListingData,
      setCount
    );
  };
  async function onSubmit(data) {
    const payload = {
      id: id,
      trunk_name: data?.trunk_name,
      trunk_type: data?.trunk_type,
      cps_limit: data?.cps_limit,
      session_limit: data?.session_limit,
      dnis_call_limit: data?.dnis_call_limit,
      ani_call_limit: data?.ani_call_limit,
      global_ani_block: data?.global_ani_block,
      global_dnis_block: data?.global_dnis_block,
      customer_ani_block: data?.customer_ani_block,
      customer_dnis_block: data?.customer_dnis_block,
      status: data?.status,
      somos: data?.somos,
      customer_id: data?.customer_id,
      verify_call_token: data?.verify_call_token,
      block_matching_src_dst: data?.block_matching_src_dst,
      group_id: data?.group_id,
    };

    const response = await APICALL(
      API_TYPE.PUT,
      `${API_END_POINT.ADD_NEW_SIP_TRUNK}/${id}`,
      setloading,
      payload,
      null,
      null,
      TOAST_MESSAGES.SIP_TRUNK_UPDATED
    );
    if (response !== undefined) {
      getData();
    }
  }

  const onIpWhitelistSubmit = async (ipData) => {
    try {
      const isValid = await formIpWhiteListing.trigger();
      if (isValid) {
        const filteredEntries = ipData?.ipEntries.filter((entry, index) =>
          newEntries.includes(index)
        );
        const ipWhiteListingPayload = filteredEntries?.map(
          ({
            name,
            customer_ip,
            sip_map_ip,
            cps_limit,
            session_limit,
            status,
            tech_prefix = "",
            suffix = "",
          }) => ({
            name: name,
            trunk_id: Number(id),
            customer_ip,
            sip_map_ip,
            cps_limit: cps_limit ?? 0,
            session_limit: session_limit ?? 0,
            status,
            tech_prefix,
            suffix,
          })
        );
        const apiResponse = await APICALL(
          API_TYPE.POST,
          API_END_POINT.ADD_IP_WHITE_LISTING,
          setloading,
          ipWhiteListingPayload,
          null,
          null,
          TOAST_MESSAGES.IP_WHITE_LISTING_ADDED
        );
        if (apiResponse !== undefined) {
          getData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewEntries = (data) => {
    setNewEntries(data);
  };
  const handleSaveOneRow = async (index) => {
    const currentFormValues = formIpWhiteListing.getValues();
    console.log(currentFormValues);
    const updatedFieldValues = currentFormValues.ipEntries[index];
    const { id, ...payloadData } = updatedFieldValues;
    const response = await APICALL(
      API_TYPE.PUT,
      `${API_END_POINT.ADD_IP_WHITE_LISTING}/${updatedFieldValues.id}`,
      setloading,
      payloadData,
      null,
      null,
      TOAST_MESSAGES.IP_WHITE_LISTING_UPDATED
    );
    if (response !== undefined) {
      getData();
    }
  };
  const handleDeleteRow = async (index) => {
    const currentFormValues = formIpWhiteListing.getValues();
    const updatedFieldValues = currentFormValues.ipEntries[index];
    const response = await APICALL(
      API_TYPE.DELETE,
      `${API_END_POINT.ADD_IP_WHITE_LISTING}/${updatedFieldValues.id}`,
      setloading,
      null,
      null,
      null,
      TOAST_MESSAGES.IP_WHITE_LISTING_DELETED
    );
    if (response !== undefined) {
      getData();
    }
  };
  async function onSubmitStirShaken(data) {
    console.log(data);
  }
  async function onSubmitPricingInfo(data) {
    const pricingInfoPayload = {
      billing_type: data.billing_type,
      billing_increment: data.billing_increment,
      initial: data.initial,
      subsequent: data.subsequent,
      price_cap: data.price_cap,
      price_protection: data.price_protection,
      override_carrier_price_protection: data.override_carrier_price_protection,
      digits_used: data.digits_used,
      rounding_method: data.rounding_method,
      outbound_media_ip_block: data.outbound_media_ip_block,
      inbound_media_ip_block: data.inbound_media_ip_block,
      allow555: data.allow555,
      use_global_404_blacklist: data.use_global_404_blacklist,
      call_extend: data.call_extend,
      override_call_extending: data.override_call_extending,
    };
    const response = await APICALL(
      API_TYPE.PUT,
      `${API_END_POINT.ADD_PRICING_INFO}/${id}`,
      setloading,
      pricingInfoPayload,
      null,
      null,
      TOAST_MESSAGES.PRICING_INFO_UPDATED
    );
    if (response !== undefined) {
      getData();
    }
  }
  return (
    <div className="p-6">
      <Button
        variant="ghost"
        onClick={() => navigate(SCREEN_PATH.SIP_TRUNK_LIST)}
        className="mb-4"
      >
        <ArrowLeft />
        Sip Trunk List
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {loading ? (
            <FormSkeleton />
          ) : (
            <BasicDetailForm
              form={form}
              MODE={DATA_VIEW_MODE.VIEW}
              DATA={data}
            />
          )}
        </form>
      </Form>

      <Form {...formIpWhiteListing}>
        <form onSubmit={formIpWhiteListing.handleSubmit(onIpWhitelistSubmit)}>
          {loading ? (
            <FormSkeleton />
          ) : (
            <IpWhiteListingForm
              form={formIpWhiteListing}
              MODE={DATA_VIEW_MODE.VIEW}
              DATA={ipWhiteListingData}
              ON_SUBMIT={handleNewEntries}
              ON_SUBMIT_SINGLE={handleSaveOneRow}
              ON_DELETE_SINGLE={handleDeleteRow}
            />
          )}
        </form>
      </Form>
      <Form {...formStirShaken}>
        <form onSubmit={formStirShaken.handleSubmit(onSubmitStirShaken)}>
          <StirAndShaken
            form={formStirShaken}
            MODE={DATA_VIEW_MODE.VIEW}
            TRUNK_ID={id}
          />
        </form>
      </Form>
      <Routing form={form} MODE={DATA_VIEW_MODE.ADD} />
      <Form {...formPricingInfo}>
        <form onSubmit={formPricingInfo.handleSubmit(onSubmitPricingInfo)}>
          <PricingInfoForm form={formPricingInfo} MODE={DATA_VIEW_MODE.VIEW} DATA={data?.pricing_info}  />
        </form>
      </Form>
    </div>
  );
}
