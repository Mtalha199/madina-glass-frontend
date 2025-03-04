import React, { useState } from 'react';
import { CheckboxFieldAndView, InputFieldAndView, SelectAndView, SwitchAndView } from '../CustomerForms/InputFieldAndView';
import { Network, Plus, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from 'recharts';
import CommonDrawer from '@/Commons/DrawerCommon';
import { BUILD_OFF_PLACE_CARRIER, POPULATE_INTERMINATE_AS } from '@/Constant';

const OtherDetail = ({ form, MODE, DATA }) => {
      const [edit, setEdit] = useState(false);
      const [openToSelectCarrier, setOpenToSelectCarrier] = useState(false);
      const handleDrawerClose = () => {
        setOpenToSelectCarrier(!openToSelectCarrier);
      };
    return (
        <div className="border-t mt-4 pt-4 ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
          <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
            <h2 className="text-lg font-semibold mb-2">Carriers Detail</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Specify the Carrier detail to add.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4 mt-5">
                        <CommonDrawer
                title="Select Carriers"
                description="Please Select Carrier to add in Rate Deck"
                isOpen={openToSelectCarrier}
                onOpenChange={handleDrawerClose}
                // onSave={() => formStarShaken.handleSubmit(onSubmit)()}
                trigger={
                  <Button type="button"size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Carrier
                  </Button>
                }
              >
                {/* <Form {...formStarShaken}>
                  <form onSubmit={formStarShaken.handleSubmit(onSubmit)}>
                    <div className="space-y-4 pb-4">
                      <RadioGroupCommon
                        IS_REQUIRED={true}
                        LABEL={"Attestation Type"}
                        NAME={"attestation"}
                        OPTIONS={ATTESTATION_OPTIONS}
                        CONTROL={formStarShaken.control}
                      />
                    </div>

                    <InputCommon
                      LABEL={"DID Number"}
                      NAME={"phone_number"}
                      PLACEHOLDER={"+1 234 567 89"}
                      TYPE={"number"}
                      CONTROL={formStarShaken.control}
                    />

                    <div>
                      <TextareaCommon
                        LABEL="Notes"
                        NAME="notes"
                        PLACEHOLDER="Enter Notes"
                        CONTROL={formStarShaken.control}
                        ROWS={8}
                      />
                    </div>
                  </form>
                </Form> */}
              </CommonDrawer>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
            {SelectAndView({
              LABEL: "Build Off Which Place Carrier",
              NAME: "build_off_which_place_carrier",
              PLACEHOLDER: "Select build ..",
              ICON: <Server />,
              OPTIONS: BUILD_OFF_PLACE_CARRIER,
              VALUE: DATA?.company_name,
              IS_REQUIRED: true,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}

          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
          {InputFieldAndView({
              LABEL: "Max Devision",
              NAME: "max_devision",
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
          <div className="col-span-1 md:col-span-2 lg:col-span-2 gap-4">
          {InputFieldAndView({
              LABEL: "Maximum effective date to choose when selecting carrier rate decks",
              NAME: "effective_date",
              TYPE: "date",
              PLACEHOLDER: "0",
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
          <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4 flex">
            {CheckboxFieldAndView({
              LABEL: "Custom for One Account",
              NAME: "custom_for_one_account",
              ICON: <Server />,
              VALUE: DATA?.custom_for_one_account,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
 
        {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4">
            <Label>Options</Label>
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
        </div> */}

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
};

export default OtherDetail;