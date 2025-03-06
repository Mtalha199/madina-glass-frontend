import React, { useState, useEffect } from "react";
import CommonDrawer from "@/Commons/DrawerCommon";
import { InputCommon } from "@/Commons/FormCommons";
import { usePercentage, useSipTrunk } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Edit } from "lucide-react";
import { APICALL } from "@/components/Api/ApiCall";
import { API_END_POINT, API_TYPE, ROUTING_TABS, TOAST_MESSAGES } from "@/Constant";
import { toast } from "@/hooks/use-toast";

const Percentage = ({trunkId ,GET_ROUTING=false}) => {
  console.log(trunkId,GET_ROUTING,"dsdfasdfs")
  const form = usePercentage();
  const defaultValues = {
    limit_cps: 0,
    limit_session: 0,
    limit_ani: 0,
    limit_dnis: 0,
    priority: 50,
    override_extend: 0,
    percentage: 0,
  };
  
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [checkedItems, setCheckedItems] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemValues, setItemValues] = useState({});
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedItems, setSavedItems] = useState({});
  const [routingData, setroutingData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.ALL_GROUP_CARRIER}?extend=true&carrier=1`,
      setLoading,
      null,
      setData,
      setCount
    );
  };
useEffect(() => {
    if(GET_ROUTING)
    {
      getAlreadyRouting();

    }
  }, [GET_ROUTING]);

  const getAlreadyRouting = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.ADD_ROUTING}/${trunkId}`,
      setLoading,
      null,
      setroutingData,
      setCount
    );
  };
  useEffect(() => {
    if (routingData && data.length > 0 && routingData?.type === ROUTING_TABS.PERCENTAGE) {
      const newCheckedItems = {};
      const newSavedItems = {};
      routingData?.assignedDestinations.forEach(dest => {
        newCheckedItems[dest.destination_trunk_id] = true;
        newSavedItems[dest.destination_trunk_id] = {
          limit_cps: dest.limit_cps,
          limit_session: dest.limit_session,
          limit_ani: dest.limit_ani,
          limit_dnis: dest.limit_dnis,
          priority: dest.priority,
          percentage: dest.percentage,
          override_extend: dest.override_extend,
        };
      });
  
      setCheckedItems(newCheckedItems);
      setSavedItems(newSavedItems);
    }
  }, [routingData, data]);
  useEffect(() => {
    const initialValues = {};
    data.forEach(group => {
      group.sip_trunks.forEach(trunk => {
        initialValues[trunk.id] = { ...defaultValues };
      });
    });
    setItemValues(initialValues);
  }, [data]);

  useEffect(() => {
    calculateTotalPercentage();
  }, [savedItems]);

  const calculateTotalPercentage = () => {
    const total = Object.values(savedItems).reduce((sum, item) => {
      return sum + Number(item.percentage || 0);
    }, 0);
    
    setTotalPercentage(total);
    
    if (total > 100) {
      setErrorMessage("Total percentage exceeds 100%");
    } else if (total < 100) {
      setErrorMessage("Total percentage must equal 100%");
    } else {
      setErrorMessage("");
    }
  };

  const handleCheckboxChange = (trunkId, checked) => {
    setCheckedItems(prev => ({
      ...prev,
      [trunkId]: checked
    }));
    
    if (checked) {
      setSelectedItemId(trunkId);
      setIsDrawerOpen(true);
      form.reset(itemValues[trunkId]);
    } else {
      const newSavedItems = { ...savedItems };
      delete newSavedItems[trunkId];
      setSavedItems(newSavedItems);
    }
  };

  const handleEdit = (trunk) => {
    if (!checkedItems[trunk.id]) {
      return;
    }
    setSelectedItemId(trunk.id);
    setIsDrawerOpen(true);
    form.reset(savedItems[trunk.id] || itemValues[trunk.id]);
  };

  const handleSave = () => {
    const formData = form.getValues();
    const currentValues = { ...formData };
    currentValues.percentage = Number(formData.percentage);

    setSavedItems(prev => ({
      ...prev,
      [selectedItemId]: currentValues
    }));
    setCheckedItems(prev => ({
      ...prev,
      [selectedItemId]: true
    }));

    setIsDrawerOpen(false);
  };

  const inputFields = [
    { name: "limit_cps", label: "Limit CPS", placeholder: "Enter Limit CPS" },
    { name: "limit_session", label: "Limit Session", placeholder: "Enter Limit Session" },
    { name: "limit_ani", label: "Limit ANI", placeholder: "Enter Limit ANI" },
    { name: "limit_dnis", label: "Limit DNIS", placeholder: "Enter Limit DNIS" },
    { name: "priority", label: "Priority", placeholder: "Enter Priority" },
    { name: "override_extend", label: "Override Extend", placeholder: "Enter Override Extend" },
    { name: "percentage", label: "Percentage", placeholder: "Enter Percentage" },
  ];
  const handleSaveAll = async () => {
    if (totalPercentage !== 100) {
      toast({
        variant: "destructive",
        title: "Total percentage must be 100%",
      });
      return;
    }
    const destination_trunk = Object.entries(savedItems)
      .map(([sipTrunkId, values]) => ({
        destination_trunk_id: Number(sipTrunkId),
        limit_cps: Number(values.limit_cps),
        limit_session: Number(values.limit_session),
        limit_ani: Number(values.limit_ani),
        limit_dnis: Number(values.limit_dnis),
        priority: Number(values.priority),
        override_extend: Number(values.override_extend),
        percentage:Number(values.percentage)
      }));

    const payload = {
      type: ROUTING_TABS.PERCENTAGE,
      destinationTrunks: destination_trunk,
    };

    await APICALL(
        API_TYPE.PUT,
        `${API_END_POINT.ADD_ROUTING}/${trunkId}`,
        setLoading,
        payload,
        null,
        null,
        TOAST_MESSAGES.ROUTING_ADDED
      );
    
  };
  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}
      

      {data.map((group) => (
        <div key={group.id} className="mb-6">
          <h2 className="text-xl font-bold mb-4">{group.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.sip_trunks.map((trunk) => (
              <div key={trunk.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`trunk-${trunk.id}`}
                  checked={!!checkedItems[trunk.id]}
                  onCheckedChange={(checked) => handleCheckboxChange(trunk.id, checked)}
                />
                <label
                  htmlFor={`trunk-${trunk.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {trunk.trunk_name}
                  {savedItems[trunk.id] && 
                    ` (${savedItems[trunk.id].percentage}%)`}
                </label>
                {checkedItems[trunk.id] && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(trunk)}
                    className="p-0 h-6 w-6"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="col-span-2 flex justify-end mt-4">
        <Button
          type="button"
          onClick={handleSaveAll}
          disabled={trunkId==null}
        >
          Save
        </Button>
      </div>
      <CommonDrawer
        title={`Edit Trunk`}
        description={`Edit details for selected trunk`}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSave={() => form.handleSubmit(handleSave)()}
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