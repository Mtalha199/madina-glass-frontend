import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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

const DetailForm = ({ form, MODE, DATA }) => {
  const [edit, setEdit] = useState(false);

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
              VALUE: DATA?.trunk_name,
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
              VALUE: DATA?.trunk_name,
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
              VALUE: DATA?.trunk_name,
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
              VALUE: DATA?.trunk_name,
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
              NAME: "status",
              ICON: <Badge />,
              VALUE: DATA?.status,
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
              VALUE: DATA?.trunk_name,
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
              VALUE: DATA?.company_name,
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
            {SelectAndView({
              LABEL: "Rounding Precision",
              NAME: "customer",
              PLACEHOLDER: "Select Rounding",
              ICON: <Server />,
              OPTIONS: ROUNDING_PRECISION,
              VALUE: DATA?.company_name,
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
            {CheckboxFieldAndView({
              LABEL: "Non-Juridictional",
              NAME: "non_juridictional",
              ICON: <Server />,
              VALUE: DATA?.company_name,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
            {CheckboxFieldAndView({
              LABEL: "Local Only Rate Deck",
              NAME: "local_only_rate_deck",
              ICON: <Server />,
              VALUE: DATA?.company_name,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
            {CheckboxFieldAndView({
              LABEL: "Use Carrier Restrictions",
              NAME: "use_carrier_restrictions",
              ICON: <Server />,
              VALUE: DATA?.company_name,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
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
            {CheckboxFieldAndView({
              LABEL: "US48",
              NAME: "us48",
              ICON: <Server />,
              VALUE: DATA?.company_name,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
            {CheckboxFieldAndView({
              LABEL: "Alaska",
              NAME: "alaska",
              ICON: <Server />,
              VALUE: DATA?.company_name,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
            {CheckboxFieldAndView({
              LABEL: "Hawali",
              NAME: "hawali",
              ICON: <Server />,
              VALUE: DATA?.company_name,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
            {CheckboxFieldAndView({
              LABEL: "Canada (w/o Yukon)",
              NAME: "canada",
              ICON: <Server />,
              VALUE: DATA?.company_name,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
            {CheckboxFieldAndView({
              LABEL: "Yukon",
              NAME: "yukon",
              ICON: <Server />,
              VALUE: DATA?.company_name,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
            {CheckboxFieldAndView({
              LABEL: "non US/Canada Country Code 1",
              NAME: "non_us_canada_country_code_1",
              ICON: <Server />,
              VALUE: DATA?.company_name,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
            {CheckboxFieldAndView({
              LABEL: "User Defined  ",
              NAME: "user_defined",
              ICON: <Server />,
              VALUE: DATA?.company_name,
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
    </>
  );
};

export default DetailForm;
