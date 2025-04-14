import React, { useEffect, useState } from "react";
import {
  CheckboxFieldAndView,
  InputFieldAndView,
  SelectAndView,
} from "../CustomerForms/InputFieldAndView";
import { Network, Plus, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonDrawer from "@/Commons/DrawerCommon";
import {
  API_END_POINT,
  API_TYPE,
  BUILD_OFF_PLACE_CARRIER,
  DATA_VIEW_MODE,
  HAS_PERMISSION,
  PARENT_MODULE_NAME,
  PERMISSIONS,
} from "@/Constant";
import { APICALL } from "@/components/Api/ApiCall";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "react-hook-form";

const OtherDetail = ({ form, MODE, DATA }) => {
  const { setValue, watch } = useFormContext();
  const [edit, setEdit] = useState(false);
  const [openToSelectCarrier, setOpenToSelectCarrier] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedTrunks, setSelectedTrunks] = useState([]);
  const [selectedCarriers, setSelectedCarriers] = useState([]);
  useEffect(() => {
    if (DATA?.user_rate_decks) {
      const initialTrunks = DATA.user_rate_decks.map(
        (deck) => deck.sip_trunk_id
      );
      const initialCarriers = DATA.user_rate_decks
        .filter((deck) => deck.sip_trunk)
        .map((deck) => ({
          groupId: deck.sip_trunk_id.toString(),
          groupName: "Pre-selected Trunks",
          trunks: [{ id: deck.sip_trunk_id, name: deck.sip_trunk.trunk_name }],
        }));

      setSelectedTrunks(initialTrunks);
      setSelectedCarriers(initialCarriers);
      form.setValue("selectedCarriers", initialCarriers);
    }

    if (DATA) {
      setValue("build_off_which_place_carrier", DATA.build_off_which_place);
      setValue("max_devision", DATA.max_division);
      setValue(
        "effective_date",
        DATA?.max_effective_date &&
          !isNaN(new Date(DATA.max_effective_date).getTime())
          ? new Date(DATA.max_effective_date).toISOString().split("T")[0]
          : ""
      );
      setValue("custom_for_one_account", DATA.custom_for_one_account);
    }
  }, [DATA, setValue]);

  useEffect(() => {
    if (data.length > 0 && DATA?.user_rate_decks) {
      const initialTrunks = DATA.user_rate_decks.map(
        (deck) => deck.sip_trunk_id
      );
      const initialGroups = data
        .filter((group) => {
          const groupTrunkIds = group.sip_trunks.map((trunk) => trunk.id);
          return groupTrunkIds.every((id) => initialTrunks.includes(id));
        })
        .map((group) => group.id);

      setSelectedGroups(initialGroups);

      const updatedCarriers = data
        .map((group) => {
          const selectedGroupTrunks = group.sip_trunks.filter((trunk) =>
            initialTrunks.includes(trunk.id)
          );
          if (selectedGroupTrunks.length > 0) {
            return {
              groupId: group.id,
              groupName: group.name,
              trunks: selectedGroupTrunks.map((trunk) => ({
                id: trunk.id,
                name: trunk.trunk_name,
              })),
            };
          }
          return null;
        })
        .filter(Boolean);

      setSelectedCarriers(updatedCarriers);
      form.setValue("selectedCarriers", updatedCarriers);
    }
  }, [data, DATA, setValue]);
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

  const handleGroupChange = (groupId, checked) => {
    let updatedGroups = [...selectedGroups];
    if (checked) {
      updatedGroups.push(groupId);
    } else {
      updatedGroups = updatedGroups.filter((id) => id !== groupId);
    }
    setSelectedGroups(updatedGroups);
    const group = data.find((g) => g.id === groupId);
    const groupTrunkIds = group
      ? group.sip_trunks.map((trunk) => trunk.id)
      : [];
    let updatedTrunks = [...selectedTrunks];
    if (checked) {
      groupTrunkIds.forEach((trunkId) => {
        if (!updatedTrunks.includes(trunkId)) {
          updatedTrunks.push(trunkId);
        }
      });
    } else {
      updatedTrunks = updatedTrunks.filter((id) => !groupTrunkIds.includes(id));
    }
    setSelectedTrunks(updatedTrunks);
  };

  const handleTrunkChange = (groupId, trunkId, checked) => {
    let updatedTrunks = [...selectedTrunks];
    if (checked) {
      updatedTrunks.push(trunkId);
    } else {
      updatedTrunks = updatedTrunks.filter((id) => id !== trunkId);
    }
    setSelectedTrunks(updatedTrunks);
    const group = data.find((g) => g.id === groupId);
    const groupTrunkIds = group
      ? group.sip_trunks.map((trunk) => trunk.id)
      : [];
    const allTrunksSelected = groupTrunkIds.every((id) =>
      updatedTrunks.includes(id)
    );
    let updatedGroups = [...selectedGroups];
    if (allTrunksSelected && !updatedGroups.includes(groupId)) {
      updatedGroups.push(groupId);
    } else if (!allTrunksSelected && updatedGroups.includes(groupId)) {
      updatedGroups = updatedGroups.filter((id) => id !== groupId);
    }
    setSelectedGroups(updatedGroups);
  };

  const handleSaveCarriers = () => {
    const formattedSelections = data
      .map((group) => {
        const selectedGroupTrunks = group.sip_trunks.filter((trunk) =>
          selectedTrunks.includes(trunk.id)
        );

        if (selectedGroupTrunks.length > 0) {
          return {
            groupId: group.id,
            groupName: group.name,
            trunks: selectedGroupTrunks.map((trunk) => ({
              id: trunk.id,
              name: trunk.trunk_name,
            })),
          };
        }
        return null;
      })
      .filter(Boolean);

    setSelectedCarriers(formattedSelections);
    setOpenToSelectCarrier(false);
    form.setValue("selectedCarriers", formattedSelections);
    form.trigger("selectedCarriers");
  };
  return (
    <div className="border-t mt-4 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            onOpenChange={setOpenToSelectCarrier}
            onSave={handleSaveCarriers}
            trigger={
              <Button
                disabled={edit == false && MODE == DATA_VIEW_MODE.VIEW}
                type="button"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Carrier
              </Button>
            }
          >
            <div className="space-y-2">
              {data.map((group) => (
                <div key={group.id} className="p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`group-${group.id}`}
                      checked={selectedGroups.includes(group.id)}
                      onCheckedChange={(checked) =>
                        handleGroupChange(group.id, checked === true)
                      }
                    />
                    <label
                      htmlFor={`group-${group.id}`}
                      className="font-medium text-base"
                    >
                      {group.name}
                    </label>
                  </div>
                  <div className="pl-6 mt-2 flex flex-wrap gap-2">
                    {group.sip_trunks &&
                      group.sip_trunks.map((trunk) => (
                        <div
                          key={trunk.id}
                          className="flex items-center space-x-1 px-2 py-1"
                        >
                          <Checkbox
                            id={`trunk-${trunk.id}`}
                            checked={selectedTrunks.includes(trunk.id)}
                            onCheckedChange={(checked) =>
                              handleTrunkChange(
                                group.id,
                                trunk.id,
                                checked === true
                              )
                            }
                          />
                          <label
                            htmlFor={`trunk-${trunk.id}`}
                            className="text-sm"
                          >
                            {trunk.trunk_name}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {data.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No carrier groups available
                </div>
              )}
            </div>
          </CommonDrawer>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-4 lg:col-span-4">
          {form.formState.errors.selectedCarriers && (
            <p className="mt-2 text-red-500 text-bold">
              {form.formState.errors.selectedCarriers.message}
            </p>
          )}
        </div>
      </div>

      {selectedCarriers.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="col-span-1 md:col-span-4 lg:col-span-4">
            <h3 className="text-sm font-medium mb-2">Selected Carriers:</h3>
            {selectedCarriers.map((group) => (
              <div key={group.groupId} className="space-y-1">
                <div className="flex flex-wrap gap-2">
                  {group.trunks.map((trunk) => (
                    <Badge
                      key={trunk.id}
                      variant="outline"
                      className="text-xs mb-2"
                    >
                      {trunk.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 mt-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
          {SelectAndView({
            LABEL: "Build Off Which Place Carrier",
            NAME: "build_off_which_place_carrier",
            PLACEHOLDER: "Select build ..",
            ICON: <Server />,
            OPTIONS: BUILD_OFF_PLACE_CARRIER,
            VALUE: DATA?.build_off_which_place,
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
            VALUE: DATA?.max_division,
            IS_REQUIRED: true,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div>
        {/* <div className="col-span-1 md:col-span-2 lg:col-span-2 gap-4">
          {InputFieldAndView({
            LABEL:
              "Maximum effective date to choose when selecting carrier rate decks",
            NAME: "effective_date",
            TYPE: "date",
            PLACEHOLDER: "0",
            ICON: <Network />,
            VALUE:
              DATA?.max_effective_date &&
              !isNaN(new Date(DATA.max_effective_date).getTime())
                ? new Date(DATA.max_effective_date).toISOString().split("T")[0]
                : "",
            IS_REQUIRED: true,
            MODE: MODE,
            EDIT: edit,
            FORM: form,
          })}
        </div> */}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4">
        <div className="hidden lg:block lg:col-span-1"></div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4 flex">
          <div className="col-span-1 md:col-span-2 lg:col-span-1 gap-4">
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
      </div> */}

      <div className="col-span-2 flex justify-end mt-4 mb-4">
        <div className="space-x-2">
          {HAS_PERMISSION(
            PARENT_MODULE_NAME.CUSTOMER,
            PERMISSIONS.CUSTOMER.RATE_DECK.NAME,
            PERMISSIONS.CUSTOMER.RATE_DECK.ACTIONS.CUSTOMER_RATE_DECK_UPDATE
          ) &&
            MODE === "view" && (
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
