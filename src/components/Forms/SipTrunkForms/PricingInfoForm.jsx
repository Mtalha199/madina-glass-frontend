import React, { useEffect, useState } from "react";
import {
  CheckboxFieldAndView,
  InputFieldAndView,
  SelectAndView,
} from "../CustomerForms/InputFieldAndView";
import {
  API_END_POINT,
  API_TYPE,
  BILLING_INCREMENT_OPTIONS,
  BILLING_TYPE_OPTIONS,
  DATA_VIEW_MODE,
  DAYS_NOTICE_RATE_DECK,
  DIGIT_USED,
  PRICING_ROUNDING_METHOD,
} from "@/Constant";
import { Network, Plus, Server } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import CommonDrawer from "@/Commons/DrawerCommon";
import { Form } from "@/components/ui/form";
import { useAssignRateDeck } from "@/components/Hooks/CustomHooks";
import { ComboboxCommon } from "@/Commons/FormCommons";
import { APICALL } from "@/components/Api/ApiCall";

function PricingInfoForm({ MODE, DATA, form, COMPANY_NAME }) {
  const [edit, setEdit] = useState(false);
  const { setValue, watch } = useFormContext();
  const formAssignRateDeck = useAssignRateDeck();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setloading] = useState(false);
  const [rateDeckData, setRateDeckData] = useState([]);
  const [count, setCount] = useState([]);

  const handleDrawerClose = () => {
    formAssignRateDeck.reset();
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      API_END_POINT.ALL_RATE_DECK,
      setloading,
      null,
      setRateDeckData,
      setCount
    );
  };
  useEffect(() => {
    if (DATA) {
      setValue("billing_type", DATA?.billing_type);
      setValue("initial", DATA?.initial);
      setValue("subsequent", DATA?.subsequent);
      setValue("price_cap", DATA?.price_cap);
      setValue("price_protection", DATA?.price_protection);
      setValue(
        "override_carrier_price_protection",
        DATA?.override_carrier_price_protection
      );
      setValue("digits_used", DATA?.digits_used);
      setValue("rounding_method", DATA?.rounding_method);
      setValue("outbound_media_ip_block", DATA?.outbound_media_ip_block);
      setValue("inbound_media_ip_block", DATA?.inbound_media_ip_block);
      setValue("allow555", DATA?.allow555);
      setValue("use_global_404_blacklist", DATA?.use_global_404_blacklist);
      setValue("call_extend", DATA?.call_extend);
      setValue("override_call_extending", DATA?.override_call_extending);
    }
  }, [DATA, setValue]);

  async function onSubmit(data) {
    console.log(data);
    // const payload = {
    //   trunk_name: data?.trunk_name,
    //   trunk_type: data?.trunk_type,
    //   cps_limit: data?.cps_limit,
    //   session_limit: data?.session_limit,
    //   dnis_call_limit: data?.dnis_call_limit,
    //   ani_call_limit: data?.ani_call_limit,
    //   global_ani_block: data?.global_ani_block,
    //   global_dnis_block: data?.global_dnis_block,
    //   customer_ani_block: data?.customer_ani_block,
    //   customer_dnis_block: data?.customer_dnis_block,
    //   status: data?.status,
    //   somos: data?.somos,
    //   customer_id: data?.customer_id,
    //   verify_call_token: data?.verify_call_token,
    //   block_matching_src_dst: data?.block_matching_src_dst,
    //   group_id: data?.group_id,
    // };

    // const response = await APICALL(
    //   API_TYPE.POST,
    //   API_END_POINT.ADD_NEW_SIP_TRUNK,
    //   setLoading,
    //   payload,
    //   null,
    //   null,
    //   TOAST_MESSAGES.SIP_TRUNK_ADDED
    // );
    // if (response !== undefined) {
    //   setTrunkId(response?.data?.data?.id);
    // }
  }
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border-t mt-4 pt-4 ">
        <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
          <h2 className="text-lg font-semibold mb-2">Pricing Info Detail</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Specify the pricing info detail to add.
          </p>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {SelectAndView({
            LABEL: "Billing Type",
            NAME: "billing_type",
            PLACEHOLDER: "Select billing type",
            ICON: <Server />,
            OPTIONS: BILLING_TYPE_OPTIONS,
            VALUE: DATA?.billing_type,
            IS_REQUIRED: true,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        {MODE === DATA_VIEW_MODE.VIEW && (
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            <CommonDrawer
              title="Assign Rate Deck"
              description="Please choose a rate deck and days notice and effective data"
              isOpen={openDrawer}
              onOpenChange={handleDrawerClose}
              onSave={() => formAssignRateDeck.handleSubmit(onSubmit)()}
              trigger={
                <Button type="button" variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Assign Rate Deck
                </Button>
              }
            >
              <Form {...formAssignRateDeck}>
                <form onSubmit={formAssignRateDeck.handleSubmit(onSubmit)}>
                  {InputFieldAndView({
                    LABEL: "Company",
                    NAME: "company",
                    TYPE: "text",
                    PLACEHOLDER: "e.g., Global Voice Solutions",
                    ICON: <Network />,
                    VALUE: COMPANY_NAME,
                    IS_REQUIRED: true,
                    MODE: MODE,
                    EDIT: edit,
                    FORM: form,
                  })}
                  <div className="mt-4">
                  <ComboboxCommon
                    LABEL={"Rate Deck"}
                    NAME={"rate_deck"}
                    OPTIONS={rateDeckData?.map((item) => ({
                      value: String(item?.id),
                      label: item?.company_name,
                    }))}
                    CONTROL={formAssignRateDeck.control}
                    IS_REQUIRED={true}
                    PLACEHOLDER={"Select Rate Deck"}
                  />
                  </div>
                  <div className="mt-4">
                  <ComboboxCommon
                    LABEL={"Days Notice"}
                    NAME={"days_notice"}
                    OPTIONS={DAYS_NOTICE_RATE_DECK}
                    CONTROL={formAssignRateDeck.control}
                    IS_REQUIRED={true}
                    PLACEHOLDER={"Select Rate Deck"}
                  />
                  </div>
                </form>
              </Form>
            </CommonDrawer>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {/* <Label>Billing Increment</Label> */}

          {SelectAndView({
            LABEL: "Initial",
            NAME: "initial",
            PLACEHOLDER: "Select initial",
            ICON: <Server />,
            OPTIONS: BILLING_INCREMENT_OPTIONS,
            VALUE: DATA?.initial,
            IS_REQUIRED: true,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {SelectAndView({
            LABEL: "Subsequent",
            NAME: "subsequent",
            PLACEHOLDER: "Select subsequent",
            ICON: <Server />,
            OPTIONS: BILLING_INCREMENT_OPTIONS,
            VALUE: DATA?.subsequent,
            IS_REQUIRED: true,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 mb-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {CheckboxFieldAndView({
            LABEL: "Price Cap",
            NAME: "price_cap",
            VALUE: DATA?.price_cap,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {CheckboxFieldAndView({
            LABEL: "Price Protection",
            NAME: "price_protection",
            VALUE: DATA?.price_cap,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        <div className="col-span-1 md:col-span-1 lg:hidden"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {CheckboxFieldAndView({
            LABEL: "Override Carrier Price Protection",
            NAME: "override_carrier_price_protection",
            VALUE: DATA?.override_carrier_price_protection,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 mt-2 mb-2">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {SelectAndView({
            LABEL: "Digits Used",
            NAME: "digits_used",
            PLACEHOLDER: "Select digits used",
            ICON: <Server />,
            OPTIONS: DIGIT_USED,
            VALUE: DATA?.digits_used,
            IS_REQUIRED: true,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
          {SelectAndView({
            LABEL: "Rounding Method",
            NAME: "rounding_method",
            PLACEHOLDER: "Select rounding method",
            ICON: <Server />,
            OPTIONS: PRICING_ROUNDING_METHOD,
            VALUE: DATA?.rounding_method,
            IS_REQUIRED: true,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
          {CheckboxFieldAndView({
            LABEL: "Outbound Media IP Block",
            NAME: "outbound_media_ip_block",
            VALUE: DATA?.outbound_media_ip_block,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
          {CheckboxFieldAndView({
            LABEL: "Inbound Media IP Block",
            NAME: "inbound_media_ip_block",
            VALUE: DATA?.inbound_media_ip_block,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
          {CheckboxFieldAndView({
            LABEL: "  Allow 555",
            NAME: "allow555",
            VALUE: DATA?.allow555,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
          {CheckboxFieldAndView({
            LABEL: "Use Global 404 Blacklist",
            NAME: "use_global_404_blacklist",
            VALUE: DATA?.use_global_404_blacklist,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
          {CheckboxFieldAndView({
            LABEL: "Call Extend",
            NAME: "call_extend",
            VALUE: DATA?.call_extend,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
          {CheckboxFieldAndView({
            LABEL: "Override Call Extending",
            NAME: "override_call_extending",
            VALUE: DATA?.override_call_extending,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
      </div>
      <div className="col-span-2 flex justify-end mt-4 mb-4">
        <div className="space-x-2">
          {MODE === "view" && (
            <>
              {edit ? (
                <>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setEdit(!edit)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </>
              ) : (
                <Button type="button" onClick={() => setEdit(true)}>
                  Edit
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PricingInfoForm;
