import CommonDrawer from "@/Commons/DrawerCommon";
import { InputCommon } from "@/Commons/FormCommons";
import { useSipTrunk } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Edit } from "lucide-react";
import React, { useState } from "react";

const Percentage = () => {
  const form = useSipTrunk();

  const items = [
    { id: 1, label: "Primary percentage Route" },
    { id: 2, label: "Secondary Route" },
    { id: 3, label: "Backup Route" },
    { id: 4, label: "Emergency Route" },
    { id: 5, label: "Alternative Path" },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleEdit = (item) => {
    setSelectedItemId(item.id); // Set the selected item's ID
    setIsDrawerOpen(true); // Open the drawer
  };

  const handleSave = () => {
    console.log(`Save changes for item with ID: ${selectedItemId}`);
    setIsDrawerOpen(false); // Close the drawer after saving
  };

  const selectedItem = items.find((item) => item.id === selectedItemId);
  async function onSubmit(data) {
    console.log(data);
  }
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id={`checkbox-${item.id}-1`} />
              <label
                htmlFor={`checkbox-${item.id}-1`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </label>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => handleEdit(item)}
                className="p-0 h-6 w-6"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CommonDrawer
        title={`Edit ${selectedItem?.label}`}
        description={`Edit details for ${selectedItem?.label}`}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSave={handleSave}
      >
        <div>
          {/* <p>Edit form or content for item with ID: {selectedItemId}</p> */}
          {/* Add your form or other content here */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputCommon
                LABEL={"Limit CPS"}
                IS_REQUIRED={true}
                NAME={"limit_cps"}
                TYPE={"text"}
                PLACEHOLDER={"Enter Limit CPS"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"Limit Session"}
                IS_REQUIRED={true}
                NAME={"limit_session"}
                TYPE={"text"}
                PLACEHOLDER={"Enter Limit Session"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"Limit ANI"}
                IS_REQUIRED={true}
                NAME={"limit_ani"}
                TYPE={"text"}
                PLACEHOLDER={"Enter Limit ANI"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"Limit DNIS"}
                IS_REQUIRED={true}
                NAME={"limit_dnis"}
                TYPE={"text"}
                PLACEHOLDER={"Enter Limit DNIS"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"Priority"}
                IS_REQUIRED={true}
                NAME={"priority"}
                TYPE={"text"}
                PLACEHOLDER={"Enter Priority"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"Override Extend"}
                IS_REQUIRED={true}
                NAME={"override_extend"}
                TYPE={"text"}
                PLACEHOLDER={"Enter Override Extend"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"Percentage"}
                IS_REQUIRED={true}
                NAME={"percentage"}
                TYPE={"text"}
                PLACEHOLDER={"Enter Percentage"}
                CONTROL={form.control}
              />
            </form>
          </Form>
        </div>
      </CommonDrawer>
    </div>
  );
};

export default Percentage;
