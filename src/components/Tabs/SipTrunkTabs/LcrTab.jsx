import React, { useState, useEffect } from "react";
import CommonDrawer from "@/Commons/DrawerCommon";
import { InputCommon } from "@/Commons/FormCommons";
import { useLCR } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Edit } from "lucide-react";

const LcrTab = () => {
  const form = useLCR();
  const defaultValues = {
    limit_cps: 0,
    limit_session: 0,
    limit_ani: 0,
    limit_dnis: 0,
    priority: 50,
    override_extend: 0,
  };

  const [checkedItems, setCheckedItems] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [modifiedItems, setModifiedItems] = useState({});
  const [itemValues, setItemValues] = useState({});

  const items = [
    { id: 1, label: "Primary Route" },
    { id: 2, label: "Secondary Route" },
    { id: 3, label: "Backup Route" },
    { id: 4, label: "Emergency Route" },
    { id: 5, label: "Alternative Path" },
    { id: 6, label: "Direct Route" },
    { id: 7, label: "Express Route" },
    { id: 8, label: "Local Route" },
    { id: 9, label: "Custom Route" },
    { id: 10, label: "Special Route" },
    { id: 11, label: "Fast Track" },
    { id: 12, label: "Scenic Route" },
    { id: 13, label: "Urban Path" },
    { id: 14, label: "Rural Route" },
    { id: 15, label: "Transit Route" },
    { id: 16, label: "Freight Path" },
    { id: 17, label: "Main Road" },
    { id: 18, label: "Service Route" },
    { id: 19, label: "Coastal Route" },
    { id: 20, label: "Mountain Path" },
  ];

  useEffect(() => {
    const initialValues = {};
    items.forEach(item => {
      initialValues[item.id] = { ...defaultValues };
    });
    setItemValues(initialValues);
  }, []);

  const checkIfModified = (values) => {
    return Object.keys(defaultValues).some(
      key => Number(values[key]) !== defaultValues[key]
    );
  };

  const handleCheckboxChange = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleEdit = (item) => {
    setSelectedItemId(item.id);
    setIsDrawerOpen(true);
    form.reset(itemValues[item.id]);
  };

  const handleSave = () => {
    const formData = form.getValues();
    const currentValues = {};
    
    // Convert form values to numbers for comparison
    Object.keys(formData).forEach(key => {
      currentValues[key] = Number(formData[key]);
    });

    setItemValues(prev => ({
      ...prev,
      [selectedItemId]: currentValues
    }));

    const isModified = checkIfModified(currentValues);

    // Only set modified if values are different from defaults
    if (isModified) {
      setModifiedItems(prev => ({
        ...prev,
        [selectedItemId]: true
      }));
    } else {
      // Remove the modified flag if values match defaults
      setModifiedItems(prev => {
        const newState = { ...prev };
        delete newState[selectedItemId];
        return newState;
      });
    }

    setIsDrawerOpen(false);
  };

  const handleInputChange = (name, value) => {
    form.setValue(name, value);
    const currentValues = form.getValues();
    
    // Convert all values to numbers for comparison
    const numericValues = {};
    Object.keys(currentValues).forEach(key => {
      numericValues[key] = Number(currentValues[key]);
    });

    const isModified = checkIfModified(numericValues);

    if (isModified) {
      setModifiedItems(prev => ({
        ...prev,
        [selectedItemId]: true
      }));
    } else {
      // Remove the modified flag if values match defaults
      setModifiedItems(prev => {
        const newState = { ...prev };
        delete newState[selectedItemId];
        return newState;
      });
    }
  };

  const selectedItem = items.find((item) => item.id === selectedItemId);

  const inputFields = [
    { name: "limit_cps", label: "Limit CPS", placeholder: "Enter Limit CPS" },
    { name: "limit_session", label: "Limit Session", placeholder: "Enter Limit Session" },
    { name: "limit_ani", label: "Limit ANI", placeholder: "Enter Limit ANI" },
    { name: "limit_dnis", label: "Limit DNIS", placeholder: "Enter Limit DNIS" },
    { name: "priority", label: "Priority", placeholder: "Enter Priority" },
    { name: "override_extend", label: "Override Extend", placeholder: "Enter Override Extend" }
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`checkbox-${item.id}-1`}
                checked={checkedItems[item.id] || false}
                onCheckedChange={() => handleCheckboxChange(item.id)}
              />
              <label
                htmlFor={`checkbox-${item.id}-1`}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 
                  ${modifiedItems[item.id] ? 'text-red-500' : ''}`}
              >
                {item.label}
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
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                />
              </div>
            ))}
          </form>
        </Form>
      </CommonDrawer>
    </div>
  );
};

export default LcrTab;