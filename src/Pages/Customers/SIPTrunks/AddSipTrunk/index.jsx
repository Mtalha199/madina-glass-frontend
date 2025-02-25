import FormSkeleton from "@/Commons/FormSkeloton";
import { APICALL } from "@/components/Api/ApiCall";
import { BasicDetailForm } from "@/components/Forms/SipTrunkForms/BasicDetailForm";
import IpWhiteListingForm from "@/components/Forms/SipTrunkForms/IpWhiteListingForn";
import PricingInfoForm from "@/components/Forms/SipTrunkForms/PricingInfoForm";
import Routing from "@/components/Forms/SipTrunkForms/Routing";
import StirAndShaken from "@/components/Forms/SipTrunkForms/StirAndShaken";
import {
  useBasicSipTrunkForm,
  // useBasicSipTrunkFormForEdit,
  useContactDetailEdit,
  useIpWhitelistForm,
  usePricingInfo,
  useSipTrunk,
  useStirShakenForm,
} from "@/components/Hooks/CustomHooks";
import { CUSTOMER_LIST_TABS } from "@/components/Tabs/TabConfig";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  API_END_POINT,
  API_TYPE,
  DATA_VIEW_MODE,
  SCREEN_PATH,
  TOAST_MESSAGES,
} from "@/Constant";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AddSipTrunk = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const id = state?.id;
  const [trunkId, setTrunkId] = useState(null);
  const form = useBasicSipTrunkForm();
  const formIpWhiteListing = useIpWhitelistForm();
  const formStirShaken = useStirShakenForm();
  const routingListing = useIpWhitelistForm();
  const formPricingInfo = usePricingInfo();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    const payload = {
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
      API_TYPE.POST,
      API_END_POINT.ADD_NEW_SIP_TRUNK,
      setLoading,
      payload,
      null,
      null,
      TOAST_MESSAGES.SIP_TRUNK_ADDED
    );
    debugger;
    if (response !== undefined) {
      setTrunkId(response?.data?.data?.id);
      debugger;
    }
  }
  async function onSubmitIpWhiteListing(data) {
    const payload1 = data.ipEntries.map(
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
        trunk_id: trunkId,
        customer_ip,
        sip_map_ip,
        cps_limit: cps_limit ?? 0,
        session_limit: session_limit ?? 0,
        status,
        tech_prefix,
        suffix,
      })
    );
    await APICALL(
      API_TYPE.POST,
      API_END_POINT.ADD_IP_WHITE_LISTING,
      setLoading,
      payload1,
      null,
      null,
      TOAST_MESSAGES.IP_WHITE_LISTING_ADDED
    );
  }
  async function onSubmitStirShaken(data) {
  const AllNumbers = data.stirShakenData.map(item => ({
    number:item.phoneNumber,
    attest: item.attestationType,
    notes: item.notes
  }));
const stirShakenPayload={
  number:AllNumbers,
  default_stir_shaken:data.default_action,
  trunk_id:trunkId
}
    await APICALL(
      API_TYPE.POST,
      API_END_POINT.ADD_STIR_SHAKEN,
      setLoading,
      stirShakenPayload,
      null,
      null,
      TOAST_MESSAGES.STIR_SHAKEN_ADDED
    );
  }
  async function onSubmitPricingInfo(data) {
    console.log(data);
    
  const pricingInfoPayload={
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
    trunk_id:trunkId
  }
      await APICALL(
        API_TYPE.POST,
        API_END_POINT.ADD_PRICING_INFO,
        setLoading,
        pricingInfoPayload,
        null,
        null,
        TOAST_MESSAGES.PRICING_INFO_ADDED
      );
    }
  return (
    <>
      <div className="p-6">
        {id == undefined ? (
          <Button
            variant="ghost"
            onClick={() => navigate(SCREEN_PATH.SIP_TRUNK_LIST)}
            className="mb-4"
          >
            <ArrowLeft />
            Sip Trunk List
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() =>
              navigate(`/customer/${id}`, {
                state: { activeTab: CUSTOMER_LIST_TABS[3].value },
              })
            }
            className="mb-4"
          >
            <ArrowLeft />
            Sip Trunk List
          </Button>
        )}

        <h1 className="text-2xl font-bold mb-4">Add Sip Trunk</h1>

        {loading ? (
          <FormSkeleton />
        ) : (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <BasicDetailForm
                  form={form}
                  MODE={DATA_VIEW_MODE.ADD}
                  ID={id}
                />
                <div className="col-span-2 flex justify-end">
                  <Button type="submit" className="">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
            <Form {...formIpWhiteListing}>
              <form
                onSubmit={formIpWhiteListing.handleSubmit(
                  onSubmitIpWhiteListing
                )}
              >
                <IpWhiteListingForm
                  form={formIpWhiteListing}
                  MODE={DATA_VIEW_MODE.ADD}
                />
                <div className="col-span-2 flex justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={trunkId === null}
                    className=""
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
            <Form {...formStirShaken}>
              <form
                onSubmit={formStirShaken.handleSubmit(
                  onSubmitStirShaken
                )}
              >
                <StirAndShaken form={formStirShaken} MODE={DATA_VIEW_MODE.ADD} />
                <div className="col-span-2 flex justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={trunkId === null}
                    className=""
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
            <Form {...routingListing}>
              <form
                onSubmit={routingListing.handleSubmit(onSubmitIpWhiteListing)}
              >
                <Routing form={form} MODE={DATA_VIEW_MODE.ADD} />
                <div className="col-span-2 flex justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={trunkId === null}
                    className=""
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
            <Form {...formPricingInfo}>
              <form
                onSubmit={formPricingInfo.handleSubmit(
                  onSubmitPricingInfo
                )}
              >
                <PricingInfoForm form={formPricingInfo} MODE={DATA_VIEW_MODE.ADD} />
                <div className="col-span-2 flex justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={trunkId === null}
                    className=""
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>
    </>
  );
};
