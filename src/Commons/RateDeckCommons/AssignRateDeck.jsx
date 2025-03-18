import React, { useState } from "react";
import CommonDrawer from "../DrawerCommon";
import { useAssignRateDeck } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Network, Plus, Server } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputFieldAndView,
  SelectAndView,
} from "@/components/Forms/CustomerForms/InputFieldAndView";
import { ComboboxCommon, SelectCommon } from "../FormCommons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { APICALL } from "@/components/Api/ApiCall";
import {
  API_END_POINT,
  API_TYPE,
  DATA_VIEW_MODE,
  TOAST_MESSAGES,
} from "@/Constant";
import { cn } from "@/lib/utils";

const AssignRateDeck = ({
  COMPANY_NAME,
  TRUNK_ID,
  SIP_TRUNK_IN_RATE_DECK = true,
  sipTrunkData = [],
  rateDeckData = [],
}) => {
  const form = SIP_TRUNK_IN_RATE_DECK
    ? useAssignRateDeck({ inSipTrunk: true })
    : useAssignRateDeck({ inRateDeck: true });

  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setloading] = useState(false);

  const handleDrawerClose = () => {
    form.reset();
    setOpenDrawer(!openDrawer);
  };

  async function onSubmit(data) {
    const payload = SIP_TRUNK_IN_RATE_DECK
      ? {
          sip_trunk_id: Number(TRUNK_ID),
          rate_deck_id: Number(data?.rate_deck),
          effective_date: new Date(data.effective_date).toISOString(),
        }
      : {
          sip_trunk_id: Number(data?.sip_trunk_id),
          rate_deck_id: Number(TRUNK_ID),
          effective_date: new Date(data.effective_date).toISOString(),
        };

    const response = await APICALL(
      API_TYPE.POST,
      API_END_POINT.ASSIGN_RATE_DECK,
      setloading,
      payload,
      null,
      null,
      TOAST_MESSAGES.RATE_DECK_ASSIGN
    );

    if (response !== undefined) {
      setOpenDrawer(false);
    }
  }

  return (
    <>
      <CommonDrawer
        title="Assign Rate Deck"
        description="Please choose a rate deck and days notice and effective data"
        isOpen={openDrawer}
        onOpenChange={handleDrawerClose}
        onSave={() => form.handleSubmit(onSubmit)()}
        loading={loading}
        trigger={
          <Button type="button" variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Assign Rate Deck
          </Button>
        }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {SIP_TRUNK_IN_RATE_DECK &&
              InputFieldAndView({
                LABEL: "Company",
                NAME: "company",
                TYPE: "text",
                PLACEHOLDER: "e.g., Global Voice Solutions",
                ICON: <Network />,
                VALUE: COMPANY_NAME,
                IS_REQUIRED: true,
                MODE: DATA_VIEW_MODE.VIEW,
                EDIT: false,
                FORM: form,
              })}

            {SIP_TRUNK_IN_RATE_DECK && (
              <div className="mt-4">
                <ComboboxCommon
                  LABEL={"Rate Deck"}
                  NAME={"rate_deck"}
                  OPTIONS={rateDeckData?.map((item) => ({
                    value: String(item?.id),
                    label: item?.file_name,
                  }))}
                  CONTROL={form.control}
                  IS_REQUIRED={true}
                  PLACEHOLDER={"Select Rate Deck"}
                />
              </div>
            )}

            {!SIP_TRUNK_IN_RATE_DECK && (
              <div className="mt-4">
                {SelectAndView({
                  LABEL: "Sip Trunk",
                  NAME: "sip_trunk_id",
                  PLACEHOLDER: "Select Sip trunk",
                  ICON: <Server />,
                  OPTIONS: sipTrunkData?.flatMap((item) =>
                    item?.sip_trunks?.map((newItem) => ({
                      value: String(newItem?.id),
                      label: newItem?.trunk_name,
                    }))
                  ),
                  IS_REQUIRED: true,
                  MODE: DATA_VIEW_MODE.ADD,
                  EDIT: false,
                  FORM: form,
                })}
              </div>
            )}

            <div className="mt-4">
              <FormField
                control={form.control}
                name="effective_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Effective Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select effective date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CommonDrawer>
    </>
  );
};

export default AssignRateDeck;
