import FormSkeleton from "@/Commons/FormSkeloton";
import { APICALL } from "@/components/Api/ApiCall";
import { BasicDetailForm } from "@/components/Forms/SipTrunkForms/BasicDetailForm";
import IpWhiteListingForm from "@/components/Forms/SipTrunkForms/IpWhiteListingForn";
import Routing from "@/components/Forms/SipTrunkForms/Routing";
import StirAndShaken from "@/components/Forms/SipTrunkForms/StirAndShaken";
import {
  useContactDetailEdit,
  useSipTrunk,
} from "@/components/Hooks/CustomHooks";
import { CUSTOMER_LIST_TABS } from "@/components/Tabs/TabConfig";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  API_END_POINT,
  API_TYPE,
  DATA_VIEW_MODE,
  SCREEN_PATH,
} from "@/Constant";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AddSipTrunk = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.id;

  const form = useSipTrunk();
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
      customer_id: data?.customer,
    };

    const response = await APICALL(
      API_TYPE.POST,
      API_END_POINT.ADD_NEW_SIP_TRUNK,
      setLoading,
      payload,
      null,
      null,
      data?.ipEntries.length === 0 ? "Sip Trunk Added Successfully" : null
    );
    if (response !== undefined) {
      if (data?.ipEntries.length == 0) {
        navigate(SCREEN_PATH.SIP_TRUNK_LIST);
      } else {
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
            trunk_id: response?.data?.sip_trunk_id,
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
          setLoading,
          payload1,
          null,
          null,
          "Sip Trunk Added Successfully"
        );
        if (apiResponse !== undefined) {
          navigate(SCREEN_PATH.SIP_TRUNK_LIST);
        }
      }
    }
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {loading ? (
              <FormSkeleton />
            ) : (
              <>
                <BasicDetailForm
                  form={form}
                  MODE={DATA_VIEW_MODE.ADD}
                  ID={id}
                />
                <IpWhiteListingForm form={form} MODE={DATA_VIEW_MODE.ADD} />
                <StirAndShaken form={form} MODE={DATA_VIEW_MODE.ADD} />
                <Routing form={form} MODE={DATA_VIEW_MODE.ADD} />


                <div className="col-span-2 flex justify-end mt-4 border-t pt-4">
                  <Button type="submit" className="">
                    Save
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </>
  );
};
