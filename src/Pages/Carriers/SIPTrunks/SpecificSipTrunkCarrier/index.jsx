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
} from "@/Constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabsCommon from "@/Commons/TabsCommon";
import { CUSTOMER_LIST_TABS } from "@/components/Tabs/TabConfig";
import { BasicDetailForm } from "@/components/Forms/SipTrunkForms/BasicDetailForm";
import {
  useBasicSipTrunkForm,
  useIpWhitelistForm,
  // useBasicSipTrunkFormForEdit,
  // useIpWhitelistFormForEdit,
  useSipTrunk,
} from "@/components/Hooks/CustomHooks";
import { APICALL } from "@/components/Api/ApiCall";
import { useEffect, useState } from "react";
import FormSkeleton from "@/Commons/FormSkeloton";
import { Form } from "@/components/ui/form";
import IpWhiteListingForm from "@/components/Forms/SipTrunkForms/IpWhiteListingForn";
export default function SpecificSipTrunkCarrier() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [ipWhiteListing, setIPWhiteListing] = useState([]);
  const [newEntries, setNewEntries] = useState();
  // const form = useSipTrunk();
  const basicForm = useBasicSipTrunkForm();
  const ipWhitelistForm = useIpWhitelistForm();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.SIP_TRUNK_LIST}/${id}`,
      setloading,
      null,
      setData,
      setCount
    );
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.ADD_IP_WHITE_LISTING}/${id}`,
      setloading,
      null,
      setIPWhiteListing,
      setCount
    );
  };
  async function onSubmit(data) {
    console.log(data, "data");

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
      customer_id: data?.customer,
    };

    const response = await APICALL(
      API_TYPE.PATCH,
      API_END_POINT.ADD_NEW_SIP_TRUNK,
      setloading,
      payload,
      null,
      null,
      data?.ipEntries.length === 0 ? "Sip trunk updated successfully" : null
    );
    if (response !== undefined) {
      if (data?.ipEntries.length == 0) {
        navigate(SCREEN_PATH.SIP_TRUNK_LIST);
      } else {
        const payloadIPWhiteListing = data.ipEntries.map(
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
            id: id,
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
          API_TYPE.PATCH,
          API_END_POINT.ADD_IP_WHITE_LISTING,
          setloading,
          payloadIPWhiteListing,
          null,
          null,
          "Sip trunk updated successfully"
        );
        if (apiResponse !== undefined) {
          navigate(SCREEN_PATH.SIP_TRUNK_LIST);
        }
      }
    }
  }
  const onBasicSubmit = (basicData) => {
    // Validate and handle basic form submission
    basicForm.trigger().then((isValid) => {
      if (isValid) {
        // Proceed with basic form validation or initial submission
        console.log("Basic Form Data:", basicData);
      }
    });
  };

  const onIpWhitelistSubmit = async (ipData) => {
    try {
      const isValid = await ipWhitelistForm.trigger();
      if (isValid) {
        const filteredEntries = ipData?.ipEntries.filter((entry, index) =>
          newEntries.includes(index)
        );
                const payload1 = filteredEntries?.map(
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
                    trunk_id: id,
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
                  payload1,
                  null,
                  null,
                  "IP White listing updated successfully"
                );
                if (apiResponse !== undefined) {
                  // navigate(SCREEN_PATH.SIP_TRUNK_LIST);
                  getData();
                }
      }
    } catch (error) {
      console.error("Error in onIpWhitelistSubmit:", error);
      // Handle error (e.g., show an error message to the user)
    }
  
  };
  const handleNewEntries = (data) => {
    setNewEntries(data);
  };
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
      <Form {...basicForm}>
        <form onSubmit={basicForm.handleSubmit(onBasicSubmit)}>
          {loading ? (
            <FormSkeleton />
          ) : (
            <BasicDetailForm
              form={basicForm}
              MODE={DATA_VIEW_MODE.VIEW}
              DATA={data[0]}
            />
          )}
        </form>
      </Form>

      <Form {...ipWhitelistForm}>
        <form onSubmit={ipWhitelistForm.handleSubmit(onIpWhitelistSubmit)}>
          {loading ? (
            <FormSkeleton />
          ) : (
            <IpWhiteListingForm
              form={ipWhitelistForm}
              MODE={DATA_VIEW_MODE.VIEW}
              DATA={ipWhiteListing}
              onsubmit={handleNewEntries}
            />
          )}
        </form>
      </Form>
    </div>
  );
}
