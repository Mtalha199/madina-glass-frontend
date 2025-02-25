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
import { ATTESTATION_OPTIONS, ATTESTATION_OPTIONS_DEFAULT } from "@/Constant";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Search,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { RadioGroupAndView } from "../CustomerForms/InputFieldAndView";

const StirAndShaken = ({ form, MODE, DATA }) => {
  const [open, setOpen] = useState(false);
  const [openSingle, setOpenSingle] = useState(false);
  const [count, setCount] = useState(10);
  const [data, setData] = useState([]);
  const [StirShaken, setStirShaken] = useState([]);
  const formStarShaken = useStirShakenSingle();
  const formStarShakenBulk = useStirShakenBulk();
  const [edit, setEdit] = useState(false);

  async function onSubmit(data) {
    console.log(data);
    const newRecord = {
      phoneNumber: data.phone_number,
      attestationType: data.attestation,
      notes: data.notes,
    };

    setStirShaken((prevRecords) => [...prevRecords, newRecord]);
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

      setStirShaken((prevRecords) => [...prevRecords, ...newRecords]);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages = Math.ceil(StirShaken.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return StirShaken.slice(startIndex, endIndex);
  }, [StirShaken, currentPage, rowsPerPage]);
  const handleFileUploadComplete = (mappedData) => {
    formStarShakenBulk.setValue("mappedData", mappedData);
  };
  const searchedData = useMemo(() => {
    if (!searchQuery) return [];
    return StirShaken.filter((record) =>
      record.phoneNumber.toString().includes(searchQuery)
    );
  }, [StirShaken, searchQuery]);
  useEffect(() => {
    // If DATA contains stirShakenData, initialize with that
    if (DATA?.stirShakenData && Array.isArray(DATA.stirShakenData)) {
      setStirShaken(DATA.stirShakenData);
    }
    
    // Always ensure form has current data
    form.setValue("stirShakenData", StirShaken);
  }, [DATA, form]);
  
  // Update form value whenever StirShaken changes
  useEffect(() => {
    form.setValue("stirShakenData", StirShaken);
  }, [StirShaken, form]);
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
          <div className="col-span-4 md:col-span-4 lg:col-span-4 gap-4">
            {RadioGroupAndView({
              LABEL: "Default Action",
              NAME: "default_action",
              ICON: <Badge />,
              OPTIONS: ATTESTATION_OPTIONS_DEFAULT,
              VALUE: DATA?.default_action,
              MODE: MODE,
              EDIT: edit,
              FORM: form,
            })}
          </div>
        </div>
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
              <CommonDrawer
                title="Add Single DID"
                description="Please enter a single number and choose the attestation label"
                isOpen={openSingle}
                onOpenChange={handleDrawerClose}
                onSave={() => formStarShaken.handleSubmit(onSubmit)()}
                trigger={
                  <Button type="button" variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Single
                  </Button>
                }
              >
                <Form {...formStarShaken}>
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
                </Form>
              </CommonDrawer>

              <CommonDrawer
                title="Add Bulk DID"
                description="Please upload file and choose the attestation label"
                isOpen={open}
                onOpenChange={handleDrawerCloseBulk}
                onSave={() => formStarShakenBulk.handleSubmit(onSubmitBulk)()}
                trigger={
                  <Button type="button" variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Bulk
                  </Button>
                }
              >
                <Form {...formStarShakenBulk}>
                  <form
                    onSubmit={formStarShakenBulk.handleSubmit(onSubmitBulk)}
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
                    <FileUpload onMappingComplete={handleFileUploadComplete} />
                  </form>
                </Form>
              </CommonDrawer>
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
                {StirShaken.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No record Added
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((record) => (
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
        {StirShaken.length > 0 && (
          <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="hidden lg:block lg:col-span-1"></div>
            <div className="col-span-1 md:col-span-4 lg:col-span-4 gap-4 ">
              <div className="col-span-1 md:col-span-4 lg:col-span-4 flex items-center justify-between space-y-4">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <Select
                    value={rowsPerPage.toString()}
                    onValueChange={(value) => {
                      setRowsPerPage(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={rowsPerPage} />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={pageSize.toString()}>
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
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center justify-center text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <input 
        type="hidden" 
        {...form.register("stirShakenData")}
      />
    </>
  );
};

export default StirAndShaken;
