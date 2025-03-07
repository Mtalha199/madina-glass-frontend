import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  CheckboxFieldAndView,
  InputFieldAndView,
  SelectAndView,
  SwitchAndView,
} from "../CustomerForms/InputFieldAndView";
import { Badge, Network, Server } from "lucide-react";
import {
  POPULATE_INTERMINATE_AS,
  ROUNDING_METHOD,
  ROUNDING_PRECISION,
} from "@/Constant";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

const DetailForm = ({ form, MODE, DATA }) => {
  const [edit, setEdit] = useState(false);
   const { setValue, watch } = useFormContext();
useEffect(() => {
  if (DATA) {
    setValue("margin", DATA?.margin );
    setValue("file_name", DATA?.file_name );
    setValue("min_profit", DATA?.min_profit );
    setValue("max_profit", DATA?.max_profit );
    setValue("include_toll_free", DATA?.include_toll_free);
    setValue("toll_free_price", DATA?.toll_free_price );
    setValue("populate_interminate_as", DATA?.populate_interminate_as );
    setValue("rounding_percision", DATA?.rounding_precision ); 
    setValue("rounding_method", DATA?.rounding_method);
    setValue("non_juridictional", DATA?.options?.non_juridictional);
    setValue("local_only_rate_deck", DATA?.options?.local_only_rate_deck);
    setValue("use_carrier_restrictions", DATA?.options?.use_carrier_restrictions );
    setValue("us48", DATA?.areas?.us48 );
    setValue("alaska", DATA?.areas?.alaska);
    setValue("hawaii", DATA?.areas?.hawaii ); 
    setValue("canada", DATA?.areas?.canada);
    setValue("yukon", DATA?.areas?.yukon );
    setValue("non_us_canada_country_code_1", DATA?.areas?.non_us_canada_country_code_1);
    setValue("user_defined", DATA?.areas?.user_defined );
  }
}, [DATA, setValue]);
  return (
    <>
   <div className="">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
          <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
            <h2 className="text-lg font-semibold mb-2">Rate Deck Detail</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Specify the Rate Deck detail to add.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Margin",
              NAME: "margin",
              TYPE: "number",
              PLACEHOLDER: "0",
              ICON: <Network />,
              VALUE: DATA?.margin,
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "File Name",
              NAME: "file_name",
              TYPE: "text",
              PLACEHOLDER: "e.g., Global Voice Solutions",
              ICON: <Network />,
              VALUE: DATA?.file_name, 
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Min Profit",
              NAME: "min_profit",
              TYPE: "number",
              ICON: <Network />,
              PLACEHOLDER: "0",
              VALUE: DATA?.min_profit, 
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Max Profit",
              NAME: "max_profit",
              TYPE: "number",
              ICON: <Network />,
              PLACEHOLDER: "0",
              VALUE: DATA?.max_profit, 
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {SwitchAndView({
              LABEL: "Include Toll Free",
              NAME: "include_toll_free",
              ICON: <Badge />,
              VALUE: DATA?.include_toll_free, 
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
            {InputFieldAndView({
              LABEL: "Toll Free Price",
              NAME: "toll_free_price",
              TYPE: "number",
              ICON: <Network />,
              PLACEHOLDER: "0",
              VALUE: DATA?.toll_free_price, 
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
            {SelectAndView({
              LABEL: "Populate Interminate As",
              NAME: "populate_interminate_as",
              PLACEHOLDER: "Select Populate Inter..",
              ICON: <Server />,
              OPTIONS: POPULATE_INTERMINATE_AS,
              VALUE: DATA?.populate_interminate_as, 
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
            {SelectAndView({
              LABEL: "Rounding Precision",
              NAME: "rounding_percision",
              PLACEHOLDER: "Select Rounding",
              ICON: <Server />,
              OPTIONS: ROUNDING_PRECISION,
              VALUE: DATA?.rounding_precision, 
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
            {SelectAndView({
              LABEL: "Rounding Method",
              NAME: "rounding_method",
              PLACEHOLDER: "Select Rounding",
              ICON: <Server />,
              OPTIONS: ROUNDING_METHOD,
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
          <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4">
            <Label>Options</Label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4 flex">
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "Non-Juridictional",
                NAME: "non_juridictional",
                ICON: <Server />,
                VALUE: DATA?.options?.non_juridictional, 
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "Local Only Rate Deck",
                NAME: "local_only_rate_deck",
                ICON: <Server />,
                VALUE: DATA?.options?.local_only_rate_deck, 
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "Use Carrier Restrictions",
                NAME: "use_carrier_restrictions",
                VALUE: DATA?.options?.use_carrier_restrictions, 
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4">
            <Label>Areas</Label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4 flex">
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "US48",
                NAME: "us48",
                ICON: <Server />,
                VALUE: DATA?.areas?.us48, 
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "Alaska",
                NAME: "alaska",
                ICON: <Server />,
                VALUE: DATA?.areas?.alaska,
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "Hawaii",
                NAME: "hawaii",
                ICON: <Server />,
                VALUE: DATA?.areas?.hawaii,
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "Canada (w/o Yukon)",
                NAME: "canada",
                ICON: <Server />,
                VALUE: DATA?.areas?.canada,
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "Yukon",
                NAME: "yukon",
                ICON: <Server />,
                VALUE: DATA?.areas?.yukon,
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "Non US/Canada Country Code 1",
                NAME: "non_us_canada_country_code_1",
                ICON: <Server />,
                VALUE: DATA?.areas?.non_us_canada_country_code_1,
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
              {CheckboxFieldAndView({
                LABEL: "User Defined",
                NAME: "user_defined",
                ICON: <Server />,
                VALUE: DATA?.areas?.user_defined,
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
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
    </>
  );
};

export default DetailForm;
