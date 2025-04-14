import CommonDrawer from "@/Commons/DrawerCommon";
import FileUpload from "@/Commons/FileUploadCommon";
import {
  InputCommon,
  RadioGroupCommon,
  TextareaCommon,
} from "@/Commons/FormCommons";
import {
  useStirShakenBulk,
  useStirShakenSingle,
} from "@/components/Hooks/CustomHooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  API_END_POINT,
  API_TYPE,
  ATTESTATION_OPTIONS,
  ATTESTATION_OPTIONS_DEFAULT,
  DATA_VIEW_MODE,
  HAS_PERMISSION,
  PARENT_MODULE_NAME,
  PERMISSIONS,
  TOAST_MESSAGES,
} from "@/Constant";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Plus,
  Search,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { RadioGroupAndView } from "../CustomerForms/InputFieldAndView";
import { APICALL } from "@/components/Api/ApiCall";
import { DOWNLOADFILE } from "@/Commons/DownloadFile";
import { Loader } from "@/Commons/Loader";
import AccessDeniedSection from "@/Commons/AccessDeniedSection";

const StirAndShaken = ({ form, MODE, TRUNK_ID = null }) => {
  const [open, setOpen] = useState(false);
  const [openSingle, setOpenSingle] = useState(false);
  const [StirShaken, setStirShaken] = useState([]);
  const [StirShakenData, setStirShakenData] = useState([]);

  const formStarShaken = useStirShakenSingle();
  const formStarShakenBulk = useStirShakenBulk();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaderDownload, setLoaderDownload] = useState(false);

  const [countStirShaken, setCountStirShaken] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  async function onSubmit(data) {
    const newRecord = {
      phoneNumber: data.phone_number,
      attestationType: data.attestation,
      notes: data.notes,
    };
    const updatedStirShaken = [newRecord];
    const AllNumbers = updatedStirShaken.map((item) => ({
      number: item.phoneNumber,
      attest: item.attestationType,
      notes: item.notes,
    }));
    const stirShakenPayload = {
      number: AllNumbers,
      default_stir_shaken: data.default_action,
      trunk_id: TRUNK_ID,
      default_stir_shaken: form.getValues("default_action"),
    };
    await APICALL(
      API_TYPE.POST,
      API_END_POINT.ADD_STIR_SHAKEN,
      setLoading,
      stirShakenPayload,
      null,
      null,
      TOAST_MESSAGES.STIR_SHAKEN_ADDED
    );
    await getStirShakenData();
    setOpenSingle(!openSingle);
  }
  async function onSubmitBulk(data) {
    const mappedData = formStarShakenBulk.getValues("mappedData");
    if (mappedData && mappedData.phoneNumbers) {
      const newRecords = mappedData.phoneNumbers.map((phoneNumber, index) => ({
        phoneNumber,
        attestationType: data.attestation,
        notes: mappedData.notes[index] || "-",
      }));
      const AllNumbers = newRecords.map((item) => ({
        number: item.phoneNumber,
        attest: item.attestationType,
        notes: item.notes,
      }));
      const stirShakenPayload = {
        number: AllNumbers,
        default_stir_shaken: data.default_action,
        trunk_id: TRUNK_ID,
        default_stir_shaken: form.getValues("default_action"),
      };
      await APICALL(
        API_TYPE.POST,
        API_END_POINT.CUSTOMER_SIP_TRUNK_STIR_SHAKEN,
        setLoading,
        stirShakenPayload,
        null,
        null,
        TOAST_MESSAGES.STIR_SHAKEN_ADDED
      );
      await getStirShakenData();
      setOpen(false);
    }
  }
  const handleDrawerClose = () => {
    formStarShaken.reset();
    setOpenSingle(!openSingle);
  };
  const handleDrawerCloseBulk = () => {
    formStarShakenBulk.reset();
    setOpen(!open);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(countStirShaken / limit);

  const goToPage = (pageNum) => {
    const newPage = Math.max(1, Math.min(pageNum, totalPages));
    setPage(newPage);
  };

  const handleFileUploadComplete = (mappedData) => {
    formStarShakenBulk.setValue("mappedData", mappedData);
  };

  useEffect(() => {
    if (TRUNK_ID !== null) {
      getStirShakenData();
    }
  }, [TRUNK_ID, page, limit]);

  const getStirShakenData = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.CUSTOMER_SIP_TRUNK_STIR_SHAKEN}/${TRUNK_ID}`,
      setLoading,
      { page, limit },
      setStirShakenData,
      setCountStirShaken
    );
  };

  useEffect(() => {
    if (StirShakenData?.number) {
      const transformedData = StirShakenData.number.map((item) => ({
        id: item.id,
        attestationType: item.attest,
        phoneNumber: item.number,
        notes: item.notes || "-",
      }));
      setStirShaken(transformedData);
    }
  }, [StirShakenData]);

  const handleRowsPerPageChange = (value) => {
    setLimit(Number(value));
    setPage(1);
  };
  const handleDownload = async () => {
    await DOWNLOADFILE(
      `${API_END_POINT.ADD_STIR_SHAKEN}/download/${TRUNK_ID}`,
      "Stir Shaken",
      setLoaderDownload,
      "CSV file download successfully"
    );
  };
  return (
    <>
      <div className="border-t mt-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
          <div className="col-span-1 md:col-span-5 lg:col-span-1 gap-4">
            <h2 className="text-lg font-semibold mb-2">Stir/Shaken Detail</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Specify the Stir/Shaken detail to add.
            </p>
          </div>
          {((MODE === DATA_VIEW_MODE.ADD &&
            HAS_PERMISSION(
              PARENT_MODULE_NAME.CUSTOMER,

              PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
              PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
                .CUSTOMER_SIP_TRUNK_STIR_SHAKEN_CREATE
            )) ||
            (MODE === DATA_VIEW_MODE.VIEW &&
              HAS_PERMISSION(
                PARENT_MODULE_NAME.CUSTOMER,

                PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
                PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
                  .CUSTOMER_SIP_TRUNK_STIR_SHAKEN_LIST
              ))) && (
            <div className="col-span-4 md:col-span-4 lg:col-span-4 gap-4">
              {RadioGroupAndView({
                LABEL: "Default Action",
                NAME: "default_action",
                OPTIONS: ATTESTATION_OPTIONS_DEFAULT,
                VALUE: StirShakenData.default_stir_shaken,
                MODE: MODE,
                EDIT: edit,
                FORM: form,
              })}
            </div>
          )}
        </div>
        <div>
          {MODE === DATA_VIEW_MODE.ADD &&
          !HAS_PERMISSION(
            PARENT_MODULE_NAME.CUSTOMER,

            PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
            PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
              .CUSTOMER_SIP_TRUNK_STIR_SHAKEN_CREATE
          ) ? (
            <AccessDeniedSection />
          ) : MODE === DATA_VIEW_MODE.VIEW &&
            !HAS_PERMISSION(
              PARENT_MODULE_NAME.CUSTOMER,

              PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
              PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
                .CUSTOMER_SIP_TRUNK_STIR_SHAKEN_LIST
            ) ? (
            <AccessDeniedSection />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div className="hidden lg:block lg:col-span-1"></div>
                <div className="col-span-1 md:col-span-4 flex justify-between items-center w-full">
                  <div className="relative w-full max-w-[400px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Type a command or search"
                      className="w-full rounded-lg bg-background pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    {HAS_PERMISSION(
                      PARENT_MODULE_NAME.CUSTOMER,

                      PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
                      PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
                        .CUSTOMER_SIP_TRUNK_STIR_SHAKEN_DOWNLOAD
                    ) &&
                      StirShaken.length > 0 &&
                      MODE === DATA_VIEW_MODE.VIEW && (
                        <Button variant="outline" onClick={handleDownload}>
                          {loaderDownload ? (
                            <Loader size={60} />
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4" /> Download
                            </>
                          )}
                        </Button>
                      )}

                    {HAS_PERMISSION(
                      PARENT_MODULE_NAME.CUSTOMER,

                      PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
                      PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS
                        .CUSTOMER_SIP_TRUNK_STIR_SHAKEN_CREATE
                    ) && (
                      <>
                        <CommonDrawer
                          title="Add Single DID"
                          description="Please enter a single number and choose the attestation label"
                          isOpen={openSingle}
                          onOpenChange={handleDrawerClose}
                          onSave={() => formStarShaken.handleSubmit(onSubmit)()}
                          loading={loading}
                          trigger={
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={TRUNK_ID === null}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Single
                            </Button>
                          }
                        >
                          <Form {...formStarShaken}>
                            <form
                              onSubmit={formStarShaken.handleSubmit(onSubmit)}
                            >
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
                          </Form>
                        </CommonDrawer>

                        <CommonDrawer
                          title="Add Bulk DID"
                          description="Please upload file and choose the attestation label"
                          isOpen={open}
                          onOpenChange={handleDrawerCloseBulk}
                          onSave={() =>
                            formStarShakenBulk.handleSubmit(onSubmitBulk)()
                          }
                          trigger={
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={TRUNK_ID === null}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Bulk
                            </Button>
                          }
                        >
                          <Form {...formStarShakenBulk}>
                            <form
                              onSubmit={formStarShakenBulk.handleSubmit(
                                onSubmitBulk
                              )}
                            >
                              <div className="space-y-4 pb-4">
                                <RadioGroupCommon
                                  IS_REQUIRED={true}
                                  LABEL={"Attestation"}
                                  NAME={"attestation"}
                                  OPTIONS={ATTESTATION_OPTIONS}
                                  CONTROL={formStarShakenBulk.control}
                                />
                              </div>
                              <FileUpload
                                onMappingComplete={handleFileUploadComplete}
                              />
                            </form>
                          </Form>
                        </CommonDrawer>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-5 gap-4 space-y-4 ">
                <div className="hidden lg:block lg:col-span-1"></div>
                <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4 border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Attestation Type</TableHead>
                        <TableHead>DID Number</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {StirShaken?.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center text-muted-foreground"
                          >
                            No record Added
                          </TableCell>
                        </TableRow>
                      ) : (
                        StirShaken?.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>
                              <Badge variant="outline">
                                {record.attestationType}
                              </Badge>
                            </TableCell>
                            <TableCell>{record.phoneNumber}</TableCell>

                            <TableCell className="max-w-[300px] truncate">
                              {record.notes || "-"}
                            </TableCell>
                            <TableCell>{record.dateAdded}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              {StirShaken?.length > 0 && (
                <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="hidden lg:block lg:col-span-1"></div>
                  <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4 ">
                    <div className="col-span-1 md:col-span-4 lg:col-span-4 flex items-center justify-between space-y-4">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                          value={limit.toString()}
                          onValueChange={handleRowsPerPageChange}
                        >
                          <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={limit} />
                          </SelectTrigger>
                          <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                              <SelectItem
                                key={pageSize}
                                value={pageSize.toString()}
                              >
                                {pageSize}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center  space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="hidden h-8 w-8 p-0 lg:flex"
                          onClick={() => goToPage(1)}
                          disabled={page === 1}
                        >
                          <span className="sr-only">Go to first page</span>
                          <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => goToPage(page - 1)}
                          disabled={page === 1}
                        >
                          <span className="sr-only">Go to previous page</span>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center justify-center text-sm font-medium">
                          Page {page} of {totalPages || 1}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => goToPage(page + 1)}
                          disabled={page === totalPages || totalPages === 0}
                        >
                          <span className="sr-only">Go to next page</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="hidden h-8 w-8 p-0 lg:flex"
                          onClick={() => goToPage(totalPages)}
                          disabled={page === totalPages || totalPages === 0}
                        >
                          <span className="sr-only">Go to last page</span>
                          <ChevronsRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <input type="hidden" {...form.register("stirShakenData")} />
    </>
  );
};

export default StirAndShaken;
