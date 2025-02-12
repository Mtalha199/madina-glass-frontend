import React, { useState, useEffect } from "react";
import CommonDrawer from "@/Commons/DrawerCommon";
import { InputCommon } from "@/Commons/FormCommons";
import { useSipTrunk } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Edit } from "lucide-react";
// import { Alert, AlertTitle } from "@/components/ui/alert";

const Percentage = () => {
  const form = useSipTrunk();
  const defaultValues = {
    limit_cps: 0,
    limit_session: 0,
    limit_ani: 0,
    limit_dnis: 0,
    priority: 50,
    override_extend: 0,
    percentage: 0,
  };

  const [checkedItems, setCheckedItems] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemValues, setItemValues] = useState({});
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const items = [
    { id: 1, label: "Primary percentage Route" },
    { id: 2, label: "Secondary Route" },
    { id: 3, label: "Backup Route" },
    { id: 4, label: "Emergency Route" },
    { id: 5, label: "Alternative Path" },
  ];

  useEffect(() => {
    const initialValues = {};
    items.forEach(item => {
      initialValues[item.id] = { ...defaultValues };
    });
    setItemValues(initialValues);
  }, []);

  useEffect(() => {
    calculateTotalPercentage();
  }, [itemValues, checkedItems]);

  const calculateTotalPercentage = () => {
    const total = Object.entries(checkedItems).reduce((sum, [itemId, isChecked]) => {
      if (isChecked) {
        return sum + Number(itemValues[itemId]?.percentage || 0);
      }
      return sum;
    }, 0);
    setTotalPercentage(total);
    
    if (total > 100) {
      setErrorMessage("Total percentage exceeds 100%");
    } else if (total < 100 && Object.values(checkedItems).some(Boolean)) {
      setErrorMessage("Total percentage must equal 100%");
    } else if (total === 100) {
      setErrorMessage("");
    }
  };

  const handleCheckboxChange = (itemId, checked) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: checked
    }));
    
    if (checked) {  // Only open drawer when checkbox is checked
      setSelectedItemId(itemId);
      setIsDrawerOpen(true);
      form.reset(itemValues[itemId]);
    }
  };

  const handleEdit = (item) => {
    if (!checkedItems[item.id]) {
      return;
    }
    setSelectedItemId(item.id);
    setIsDrawerOpen(true);
    form.reset(itemValues[item.id]);
  };

  const handleSave = () => {
    const formData = form.getValues();
    const currentValues = { ...formData };
    currentValues.percentage = Number(formData.percentage);

    setItemValues(prev => ({
      ...prev,
      [selectedItemId]: currentValues
    }));

    setIsDrawerOpen(false);
  };

  const selectedItem = items.find((item) => item.id === selectedItemId);

  const inputFields = [
    { name: "limit_cps", label: "Limit CPS", placeholder: "Enter Limit CPS" },
    { name: "limit_session", label: "Limit Session", placeholder: "Enter Limit Session" },
    { name: "limit_ani", label: "Limit ANI", placeholder: "Enter Limit ANI" },
    { name: "limit_dnis", label: "Limit DNIS", placeholder: "Enter Limit DNIS" },
    { name: "priority", label: "Priority", placeholder: "Enter Priority" },
    { name: "override_extend", label: "Override Extend", placeholder: "Enter Override Extend" },
    { name: "percentage", label: "Percentage", placeholder: "Enter Percentage" },
  ];

  return (
    <div className="space-y-4">
      {errorMessage && (
 <div className="text-red-500">{errorMessage}</div>
      )}
      
      {/* <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Total Percentage: {totalPercentage}%</h3>
      </div> */}

      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`checkbox-${item.id}-1`}
                checked={checkedItems[item.id] || false}
                onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
              />
              <label
                htmlFor={`checkbox-${item.id}-1`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
                {checkedItems[item.id] && itemValues[item.id]?.percentage > 0 && 
                  ` (${itemValues[item.id].percentage}%)`}
              </label>
              {checkedItems[item.id] && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  className="p-0 h-6 w-6"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
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
        <Form {...form}>
          <form className="space-y-4">
            {inputFields.map((field) => (
              <div key={field.name}>
                <InputCommon
                  LABEL={field.label}
                  IS_REQUIRED={true}
                  NAME={field.name}
                  TYPE="text"
                  PLACEHOLDER={field.placeholder}
                  CONTROL={form.control}
                />
              </div>
            ))}
          </form>
        </Form>
      </CommonDrawer>
    </div>
  );
};

export default Percentage;