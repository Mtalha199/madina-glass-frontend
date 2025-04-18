import React, { useState, useEffect } from "react";
import CommonDrawer from "@/Commons/DrawerCommon";
import { InputCommon } from "@/Commons/FormCommons";
import { useLCR } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Edit } from "lucide-react";
import { APICALL } from "@/components/Api/ApiCall";
import {
  API_END_POINT,
  API_TYPE,
  HAS_PERMISSION,
  PARENT_MODULE_NAME,
  PERMISSIONS,
  ROUTING_TABS,
  TOAST_MESSAGES,
} from "@/Constant";
import { Toast } from "@/components/ui/toast";
import { useFormContext } from "react-hook-form";

const LcrTab = ({ trunkId, GET_ROUTING = false }) => {
  const form = useLCR();

  const defaultValues = {
    limit_cps: 0,
    limit_session: 0,
    limit_ani: 0,
    limit_dnis: 0,
    priority: 50,
    override_extend: 0,
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [rountingData, setroutingData] = useState([]);

  const [count, setCount] = useState(0);
  const [checkedGroups, setCheckedGroups] = useState({});
  const [checkedSipTrunks, setCheckedSipTrunks] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSipTrunkId, setSelectedSipTrunkId] = useState(null);
  const [modifiedItems, setModifiedItems] = useState({});
  const [itemValues, setItemValues] = useState({});

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
    if (GET_ROUTING) {
      getAlreadyRouting();
    }
  }, [GET_ROUTING]);

  const getAlreadyRouting = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.CUSTOMER_SIP_TRUNK_ROUTING}/${trunkId}`,
      setLoading,
      null,
      setroutingData,
      setCount
    );
  };

  useEffect(() => {
    if (
      GET_ROUTING &&
      rountingData.assignedDestinations &&
      data.length > 0 &&
      rountingData.type === ROUTING_TABS.LCR
    ) {
      const newCheckedSipTrunks = {};
      const newItemValues = {};
      const newModifiedItems = {};
      rountingData.assignedDestinations.forEach((destination) => {
        let foundSipTrunk = null;
        for (const group of data) {
          foundSipTrunk = group.sip_trunks?.find(
            (st) => st.id === destination.destination_trunk_id
          );
          if (foundSipTrunk) {
            newCheckedSipTrunks[foundSipTrunk.id] = true;
            const itemKey = `sip_trunk_${foundSipTrunk.id}`;
            newItemValues[itemKey] = {
              limit_cps: destination.limit_cps,
              limit_session: destination.limit_session,
              limit_ani: destination.limit_ani,
              limit_dnis: destination.limit_dnis,
              priority: destination.priority,
              override_extend: destination.override_extend || 0,
            };
            if (checkIfModified(newItemValues[itemKey])) {
              newModifiedItems[itemKey] = true;
            }

            break;
          }
        }
      });

      setCheckedSipTrunks(newCheckedSipTrunks);
      setItemValues(newItemValues);
      setModifiedItems(newModifiedItems);
      const newCheckedGroups = {};
      data.forEach((group) => {
        if (group.sip_trunks) {
          const allSipTrunksInGroupChecked = group.sip_trunks.every(
            (sipTrunk) => newCheckedSipTrunks[sipTrunk.id]
          );
          if (allSipTrunksInGroupChecked) {
            newCheckedGroups[group.id] = true;
          }
        }
      });
      setCheckedGroups(newCheckedGroups);
    }
  }, [GET_ROUTING, rountingData, data]);

  const groupsWithSipTrunks = data.filter(
    (group) => group.sip_trunks && group.sip_trunks.length > 0
  );
  useEffect(() => {
    if (data.length > 0) {
      const initialValues = {};
      groupsWithSipTrunks.forEach((group) => {
        group.sip_trunks.forEach((sipTrunk) => {
          const itemKey = `sip_trunk_${sipTrunk.id}`;
          if (!itemValues[itemKey]) {
            initialValues[itemKey] = { ...defaultValues };
          }
        });
      });

      // Only add defaults where needed
      if (Object.keys(initialValues).length > 0) {
        setItemValues((prev) => ({
          ...prev,
          ...initialValues,
        }));
      }
    }
  }, [data, itemValues]);

  const checkIfModified = (values) => {
    return Object.keys(defaultValues).some(
      (key) => Number(values[key]) !== defaultValues[key]
    );
  };

  const handleGroupCheckboxChange = (groupId) => {
    const newCheckedGroups = {
      ...checkedGroups,
      [groupId]: !checkedGroups[groupId],
    };

    setCheckedGroups(newCheckedGroups);

    const group = groupsWithSipTrunks.find((g) => g.id === groupId);
    if (group && group.sip_trunks) {
      const newCheckedSipTrunks = { ...checkedSipTrunks };

      group.sip_trunks.forEach((sipTrunk) => {
        newCheckedSipTrunks[sipTrunk.id] = newCheckedGroups[groupId];
      });

      setCheckedSipTrunks(newCheckedSipTrunks);
    }
  };

  const handleSipTrunkCheckboxChange = (sipTrunkId, groupId) => {
    const newCheckedSipTrunks = {
      ...checkedSipTrunks,
      [sipTrunkId]: !checkedSipTrunks[sipTrunkId],
    };

    setCheckedSipTrunks(newCheckedSipTrunks);

    const group = groupsWithSipTrunks.find((g) => g.id === groupId);
    if (group && group.sip_trunks) {
      const allSipTrunksChecked = group.sip_trunks.every(
        (sipTrunk) => newCheckedSipTrunks[sipTrunk.id]
      );
      const noSipTrunksChecked = group.sip_trunks.every(
        (sipTrunk) => !newCheckedSipTrunks[sipTrunk.id]
      );

      if (allSipTrunksChecked) {
        setCheckedGroups({
          ...checkedGroups,
          [groupId]: true,
        });
      } else if (noSipTrunksChecked) {
        setCheckedGroups({
          ...checkedGroups,
          [groupId]: false,
        });
      }
    }
  };
  const handleEdit = (sipTrunkId) => {
    setSelectedSipTrunkId(sipTrunkId);
    
    const destination = rountingData.assignedDestinations?.find(
      (dest) => dest.destination_trunk_id === sipTrunkId
    );
    const currentValues = destination 
      ? {
          limit_cps: Number(destination.limit_cps) || 0,
          limit_session: Number(destination.limit_session) || 0,
          limit_ani: Number(destination.limit_ani) || 0,
          limit_dnis: Number(destination.limit_dnis) || 0,
          priority: Number(destination.priority) || 50,
          override_extend: Number(destination.override_extend) || 0,
        }
      : { ...defaultValues };
    form.setValue("limit_cps", currentValues.limit_cps.toString());
    form.setValue("limit_session", currentValues.limit_session.toString());
    form.setValue("limit_ani", currentValues.limit_ani.toString());
    form.setValue("limit_dnis", currentValues.limit_dnis.toString());
    form.setValue("priority", currentValues.priority.toString());
    form.setValue("override_extend", currentValues.override_extend.toString());
    setIsDrawerOpen(true);
  };
  const handleSave = () => {
    const formData = form.getValues();
    const currentValues = {};

    Object.keys(formData).forEach((key) => {
      currentValues[key] = Number(formData[key]);
    });

    const itemKey = `sip_trunk_${selectedSipTrunkId}`;

    setItemValues((prev) => ({
      ...prev,
      [itemKey]: currentValues,
    }));

    const isModified = checkIfModified(currentValues);

    if (isModified) {
      setModifiedItems((prev) => ({
        ...prev,
        [itemKey]: true,
      }));
    } else {
      setModifiedItems((prev) => {
        const newState = { ...prev };
        delete newState[itemKey];
        return newState;
      });
    }

    setIsDrawerOpen(false);
  };

  const handleInputChange = (name, value) => {
    form.setValue(name, value);
    const currentValues = form.getValues();

    const numericValues = {};
    Object.keys(currentValues).forEach((key) => {
      numericValues[key] = Number(currentValues[key]);
    });

    const isModified = checkIfModified(numericValues);
    const itemKey = `sip_trunk_${selectedSipTrunkId}`;

    if (isModified) {
      setModifiedItems((prev) => ({
        ...prev,
        [itemKey]: true,
      }));
    } else {
      setModifiedItems((prev) => {
        const newState = { ...prev };
        delete newState[itemKey];
        return newState;
      });
    }
  };

  const handleSaveAll = async () => {
    const destination_trunk = Object.entries(checkedSipTrunks)
      .filter(([_, isChecked]) => isChecked)
      .map(([sipTrunkId]) => {
        const itemKey = `sip_trunk_${sipTrunkId}`;
        const values = itemValues[itemKey] || defaultValues;

        return {
          destination_trunk_id: Number(sipTrunkId),
          limit_cps: values.limit_cps,
          limit_session: values.limit_session,
          limit_ani: values.limit_ani,
          limit_dnis: values.limit_dnis,
          priority: values.priority,
          override_extend: values.override_extend,
        };
      });
    const payload = {
      type: ROUTING_TABS.LCR,
      destinationTrunks: destination_trunk,
    };
    const response = await APICALL(
      API_TYPE.PUT,
      `${API_END_POINT.CUSTOMER_SIP_TRUNK_ROUTING}/${trunkId}`,
      setLoading,
      payload,
      null,
      null,
      TOAST_MESSAGES.ROUTING_ADDED
    );
    if (response !== undefined) {
      getAlreadyRouting();
    }
  };

  const getSipTrunkName = () => {
    for (const group of groupsWithSipTrunks) {
      const sipTrunk = group.sip_trunks.find(
        (st) => st.id === selectedSipTrunkId
      );
      if (sipTrunk) {
        return sipTrunk.trunk_name;
      }
    }
    return "";
  };

  const inputFields = [
    { name: "limit_cps", label: "Limit CPS", placeholder: "Enter Limit CPS" },
    {
      name: "limit_session",
      label: "Limit Session",
      placeholder: "Enter Limit Session",
    },
    { name: "limit_ani", label: "Limit ANI", placeholder: "Enter Limit ANI" },
    {
      name: "limit_dnis",
      label: "Limit DNIS",
      placeholder: "Enter Limit DNIS",
    },
    { name: "priority", label: "Priority", placeholder: "Enter Priority" },
    {
      name: "override_extend",
      label: "Override Extend",
      placeholder: "Enter Override Extend",
    },
  ];

  return (
    <div className="space-y-6">
      {groupsWithSipTrunks.map((group) => (
        <div key={group.id} className="">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id={`group-${group.id}`}
              checked={checkedGroups[group.id] || false}
              onCheckedChange={() => handleGroupCheckboxChange(group.id)}
            />
            <label
              htmlFor={`group-${group.id}`}
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {group.name}
            </label>
          </div>

          <div className="ml-6 grid grid-cols-4 gap-4">
            {group.sip_trunks.map((sipTrunk) => (
              <div key={sipTrunk.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`sip-trunk-${sipTrunk.id}`}
                  checked={checkedSipTrunks[sipTrunk.id] || false}
                  onCheckedChange={() =>
                    handleSipTrunkCheckboxChange(sipTrunk.id, group.id)
                  }
                />
                <label
                  htmlFor={`sip-trunk-${sipTrunk.id}`}
                  className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 
                    ${
                      modifiedItems[`sip_trunk_${sipTrunk.id}`]
                        ? "text-red-500"
                        : ""
                    }`}
                >
                  {sipTrunk.trunk_name}
                </label>
                {checkedSipTrunks[sipTrunk.id] && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(sipTrunk.id)}
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
        {
          HAS_PERMISSION(
          PARENT_MODULE_NAME.CUSTOMER,

                    PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
                    PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
                      .CUSTOMER_SIP_TRUNK_ROUTING_UPDATE
                  ) && (
                    <Button
                    type="button"
                    onClick={handleSaveAll}
                    disabled={trunkId == null}
                  >
                    Save
                  </Button> )
        }

      </div>
      <CommonDrawer
        title={`Edit SIP Trunk: ${getSipTrunkName()}`}
        description={`Edit details for ${getSipTrunkName()}`}
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
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
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
