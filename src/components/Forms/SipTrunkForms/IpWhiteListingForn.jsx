import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  DATA_VIEW_MODE,
  HAS_PERMISSION,
  PARENT_MODULE_NAME,
  PERMISSIONS,
  TRUNK_TYPE_STATUS_OPTIONS,
} from "@/Constant";
import { Plus, X, Edit, Trash, Save, ArrowLeft } from "lucide-react";
import { InputCommon, SwitchCommon } from "@/Commons/FormCommons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteConfirmationDialog from "@/Commons/DeleteConfirmationCommon";
import AccessDeniedSection from "@/Commons/AccessDeniedSection";

const IpWhiteListingForm = ({
  form,
  MODE,
  DATA,
  ON_SUBMIT,
  ON_SUBMIT_SINGLE,
  ON_DELETE_SINGLE,
}) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [newEntries, setNewEntries] = useState([]);

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "ipEntries",
  });
  useEffect(() => {
    if (MODE === "view" && DATA?.length) {
      replace(DATA);
    }
  }, [MODE, DATA, replace]);

  const onAddEntry = () => {
    const newEntry = {
      name: "",
      customer_ip: "",
      sip_map_ip: "",
      cps_limit: 0,
      session_limit: 0,
      status: true,
      tech_prefix: "",
      suffix: "",
    };
    append(newEntry);
    setNewEntries((prev) => [...prev, fields.length]);
  };

  const onEdit = (index) => {
    setEditIndex(index);
  };

  const handleCancel = () => {
    setEditIndex(-1);
  };
  const handleSave = async () => {
    ON_SUBMIT(newEntries);
  };
  const handleSaveOneRow = async (index) => {
    ON_SUBMIT_SINGLE(index);
  };
  const handleDelete = async (index) => {
    const field = fields[index];
    if (newEntries.includes(index)) {
      remove(index);
      setNewEntries((prev) =>
        prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
      );
      return;
    }
    ON_DELETE_SINGLE(index);
  };

  const renderEditableRow = (index) => (
    <TableRow>
      <TableCell>
        <InputCommon
          NAME={`ipEntries.${index}.name`}
          TYPE="text"
          PLACEHOLDER="e.g., Jane Smith"
          CONTROL={form.control}
        />
      </TableCell>
      <TableCell>
        <InputCommon
          NAME={`ipEntries.${index}.customer_ip`}
          TYPE="text"
          PLACEHOLDER="1.1.1.1"
          CONTROL={form.control}
        />
      </TableCell>
      <TableCell>
        <InputCommon
          NAME={`ipEntries.${index}.sip_map_ip`}
          TYPE="text"
          PLACEHOLDER="2.2.2.2"
          CONTROL={form.control}
        />
      </TableCell>
      <TableCell>
        <InputCommon
          NAME={`ipEntries.${index}.cps_limit`}
          TYPE="number"
          PLACEHOLDER="0"
          CONTROL={form.control}
        />
      </TableCell>
      <TableCell>
        <InputCommon
          NAME={`ipEntries.${index}.session_limit`}
          TYPE="number"
          PLACEHOLDER="0"
          CONTROL={form.control}
        />
      </TableCell>
      <TableCell>
        <InputCommon
          NAME={`ipEntries.${index}.tech_prefix`}
          TYPE="text"
          PLACEHOLDER="Tech Prefix"
          CONTROL={form.control}
        />
      </TableCell>
      <TableCell>
        <InputCommon
          NAME={`ipEntries.${index}.suffix`}
          TYPE="text"
          PLACEHOLDER="Suffix"
          CONTROL={form.control}
        />
      </TableCell>
      <TableCell>
        <SwitchCommon
          NAME={`ipEntries.${index}.status`}
          OPTIONS={TRUNK_TYPE_STATUS_OPTIONS}
          CONTROL={form.control}
        />
      </TableCell>
      <TableCell>
        {/* Show cross icon for new entries */}
        {newEntries.includes(index) ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleDelete(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleSaveOneRow(index)}
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
  return (
    <div className="space-y-6">
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              IP White Listing Detail
            </h2>
            <p className="text-sm text-muted-foreground">
              Specify the SIP trunk detail to add.
            </p>
          </div>
          {HAS_PERMISSION(
            PARENT_MODULE_NAME.CUSTOMER,
            PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
            PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
              .CUSTOMER_SIP_TRUNK_IP_AUTH_CREATE
          ) && (
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAddEntry}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Entry
              </Button>
            </div>
          )}
        </div>
        {MODE === DATA_VIEW_MODE.VIEW &&
        !HAS_PERMISSION(
          PARENT_MODULE_NAME.CUSTOMER,
          PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
          PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS.CUSTOMER_SIP_TRUNK_IP_AUTH_VIEW
        ) ? (
          <AccessDeniedSection />
        ) : MODE === DATA_VIEW_MODE.ADD &&
          !HAS_PERMISSION(
            PARENT_MODULE_NAME.CUSTOMER,
            PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
            PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
              .CUSTOMER_SIP_TRUNK_IP_AUTH_CREATE
          ) ? (
          <AccessDeniedSection />
        ) : fields.length > 0 ? (
          <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4">
            <div className="hidden lg:block lg:col-span-1"></div>
            <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Name</TableHead>
                    <TableHead className="w-[150px]">Customer IP</TableHead>
                    <TableHead className="w-[150px]">SIP Map IP</TableHead>
                    <TableHead className="w-[120px]">CPS Limit</TableHead>
                    <TableHead className="w-[120px]">Session Limit</TableHead>
                    <TableHead className="w-[150px]">Tech Prefix</TableHead>
                    <TableHead className="w-[150px]">Suffix</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) =>
                    MODE === "add" ||
                    newEntries.includes(index) ||
                    editIndex === index ? (
                      renderEditableRow(index)
                    ) : (
                      <TableRow key={field.id}>
                        <TableCell className="w-[150px]">
                          {field.name}
                        </TableCell>
                        <TableCell className="w-[150px]">
                          {field.customer_ip}
                        </TableCell>
                        <TableCell className="w-[150px]">
                          {field.sip_map_ip}
                        </TableCell>
                        <TableCell className="w-[120px]">
                          {field.cps_limit}
                        </TableCell>
                        <TableCell className="w-[120px]">
                          {field.session_limit}
                        </TableCell>
                        <TableCell className="w-[150px]">
                          {field.tech_prefix}
                        </TableCell>
                        <TableCell className="w-[150px]">
                          {field.suffix}
                        </TableCell>
                        <TableCell className="w-[100px]">
                          {field.status ? "Active" : "Inactive"}
                        </TableCell>
                        <TableCell className="w-[100px]">
                          <div className="flex space-x-2">
                            {HAS_PERMISSION(
                              PARENT_MODULE_NAME.CUSTOMER,

                              PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
                              PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
                                .CUSTOMER_SIP_TRUNK_IP_AUTH_UPDATE
                            ) && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(index)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            {HAS_PERMISSION(
                              PARENT_MODULE_NAME.CUSTOMER,

                              PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
                              PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
                                .CUSTOMER_SIP_TRUNK_IP_AUTH_DELETE
                            ) && (
                              <DeleteConfirmationDialog
                                onConfirm={() => handleDelete(index)}
                              >
                                <Button variant="destructive">
                                  <Trash />
                                </Button>
                              </DeleteConfirmationDialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : null}

        {MODE === "view" && newEntries.length > 0 && (
          <div className="flex justify-end border-t pt-4">
            <Button
              type="submit"
              variant="default"
              size="sm"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IpWhiteListingForm;
