import SkeletonTable from "@/Commons/SkeletonTable";
import TableContainer from "@/Commons/TableContainer";
import { APICALL } from "@/components/Api/ApiCall";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import {
  API_END_POINT,
  API_TYPE,
  COLUMN_TO_MAP_UPLOAD_RATE_DECK,
  DATA_VIEW_MODE,
  HAS_PERMISSION,
  PARENT_MODULE_NAME,
  PERMISSIONS,
  RATE_DECK_STATE,
  SCREEN_PATH,
  TOAST_MESSAGES,
} from "@/Constant";
import { CalendarIcon, Download, Plus, Server } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonDrawer from "../DrawerCommon";
import FileUpload from "../FileUploadCommon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useRateDeckUpload,
  useRateDeckUploadWithSipTrunk,
  useStirShakenBulk,
} from "@/components/Hooks/CustomHooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import CommonFileUpload from "../CommonFileUploading";
import { SelectAndView } from "@/components/Forms/CustomerForms/InputFieldAndView";
import { Loader } from "../Loader";
import { DOWNLOADFILE } from "../DownloadFile";
import AssignRateDeck from "./AssignRateDeck";
import { pollInProgressItems } from "@/components/Utils/Utils";
const RateDeck = ({ CUSTOMER = true }) => {
  const navigate = useNavigate();
  const formRateDeck = useRateDeckUpload();
  const formRateDeckWithSipTrunk = useRateDeckUploadWithSipTrunk();
  const form = CUSTOMER ? formRateDeck : formRateDeckWithSipTrunk;

  const [loadingDownload, setloadingDownload] = useState(false);
  const [loaderDownload, setLoaderDownload] = useState({});
  const handleDownload = async (id) => {
    setLoaderDownload((prev) => ({ ...prev, [id]: true }));
    await DOWNLOADFILE(
      `${CUSTOMER ? API_END_POINT.CUSTOMER_RATE_DECK_DOWNLOAD_INTERNEL :API_END_POINT.CARRIER_RATE_DECK_DOWNLOAD_INTERNEL  }/${id}`,
      "Rate deck",
      setloadingDownload,
      "CSV file download successfully"
    );
    setLoaderDownload((prev) => ({ ...prev, [id]: false }));
  };
  const columns = [
    {
      header: "Name",
      accessorKey: "file_name",
      cell: ({ row }) => {
        const fullName = row.getValue("file_name");
        const id = row.getValue("id");
    
        return CUSTOMER ? (
          <Link to={`/customer/rate-deck/${id}`}>
            <span className="text-primary hover:underline">{fullName}</span>
          </Link>
        ) : (
          <span>{fullName}</span>
        );
      },
    },
    
    { header: "Effective Date", accessorKey: "min_profit" },
    {
      header: "Actions",

      cell: ({ row }) => {
        const ID = row.getValue("id");
        const isLoading = loaderDownload[ID] || false;
        return (
          <div className="flex space-x-2">
            {(CUSTOMER
              ? HAS_PERMISSION(
                  PARENT_MODULE_NAME.CUSTOMER,
                  PERMISSIONS.CUSTOMER.RATE_DECK.NAME,
                  PERMISSIONS.CUSTOMER.RATE_DECK.ACTIONS
                    .CUSTOMER_RATE_DECK_DOWNLOAD
                )
              : HAS_PERMISSION(
                  PARENT_MODULE_NAME.CARRIER,
                  PERMISSIONS.CARRIER.RATE_DECK.NAME,
                  PERMISSIONS.CARRIER.RATE_DECK.ACTIONS
                    .CARRIER_RATE_DECK_DOWNLOAD
                )) && (
              <>
                {isLoading ? (
                  <Button variant="outline" size="sm">
                    <Loader size={20} LOADING={false} /> Download
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(ID)}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                )}
              </>
            )}

            {CUSTOMER &&
              HAS_PERMISSION(
                PARENT_MODULE_NAME.CUSTOMER,
                PERMISSIONS.CUSTOMER.RATE_DECK.NAME,
                PERMISSIONS.CUSTOMER.RATE_DECK.ACTIONS.CUSTOMER_RATE_DECK_ASSIGN
              ) && (
                <AssignRateDeck
                  SIP_TRUNK_IN_RATE_DECK={false}
                  TRUNK_ID={ID}
                  sipTrunkData={siptrunkData}
                />
              )}
          </div>
        );
      },
    },
  ];

  const [uploadData, setUploadData] = useState(null);
  const [loading, setloading] = useState(false);
  const [loadingId, setloadingId] = useState(false);

  const [data, setData] = useState([]);
  const [dataId, setDataId] = useState([]);

  const [count, setCount] = useState(0);
  const [countId, setCountId] = useState(0);

  const [countSipTrunk, setCountSipTrunk] = useState(0);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.accessorKey)
  );
  const [search, setSearch] = useState(null);
  const [open, setOpen] = useState(false);
  const [siptrunkData, setSipTrunkData] = useState([]);

  const handleDrawerCloseBulk = async () => {
    form.reset();
    setOpen(!open);
    if (open === false && CUSTOMER === false) {
      await APICALL(
        API_TYPE.GET,
        `${API_END_POINT.ALL_GROUP_CARRIER}?extend=true&carrier=1`,
        setloading,
        null,
        setSipTrunkData,
        setCountSipTrunk
      );
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [page, limit, orderBy, order, search]);
  const getData = async () => {
    const API_END = CUSTOMER
      ? `${API_END_POINT.CUSTOMER_RATE_DECK}`
      : `${API_END_POINT.CARRIER_RATE_DECK}`;
    await APICALL(
      API_TYPE.GET,
      API_END,
      setloading,
      { page, limit, orderBy, order, search },
      setData,
      setCount
    );
  };

  useEffect(() => {
    pollInProgressItems(
      data,
      setLoaderDownload,
      `${API_END_POINT.RATE_DECK}`,
      RATE_DECK_STATE.COMPLETED,
      30,
      10000
    );
  }, [data]);
  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(column);
      setOrder("asc");
    }
  };

  const handleSearch = (query) => {
    if (query === "") query = null;
    setSearch(query);
    setPage(1);
  };
  const handleVisibleColumnsChange = (newVisibleColumns) => {
    setVisibleColumns(newVisibleColumns);
  };
  async function onSubmitBulk(data) {
    console.log(data);

    const formData = new FormData();
    formData.append("file", uploadData.file);
    formData.append("coloumns", JSON.stringify(uploadData.columns));
    if (data?.effective_date) {
      const date = new Date(data.effective_date);
      const isoDate = date.toISOString();
      formData.append("effective_date", isoDate);
    }
    if (data?.sip_trunk_id) {
      formData.append("sip_trunk_id", data?.sip_trunk_id);
    }
    const response = await APICALL(
      API_TYPE.POST,
      `${CUSTOMER ? API_END_POINT.CUSTOMER_RATE_DECK : API_END_POINT.CARRIER_RATE_DECK}`,
      setloading,
      formData,
      null,
      null,
      TOAST_MESSAGES.RATE_DECK_UPLOAD
    );
    {
      response !== undefined && setOpen(false);
      getData();
    }
  }
  const handleUploadComplete = (data) => {
    setUploadData(data);
  };
  useEffect(() => {
    if (CUSTOMER === true) {
      getSiptrunkData();
    }
  }, []);
  const getSiptrunkData = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.ALL_GROUP_CARRIER}?extend=true&carrier=0`,
      setloading,
      null,
      setSipTrunkData,
      setCountSipTrunk
    );
  };
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Rate Decks</h1>
          <div className="flex space-x-2">
            {CUSTOMER &&
              HAS_PERMISSION(
                PARENT_MODULE_NAME.CUSTOMER,
                PERMISSIONS.CUSTOMER.RATE_DECK.NAME,
                PERMISSIONS.CUSTOMER.RATE_DECK.ACTIONS.CUSTOMER_RATE_DECK_CREATE
              ) && (
                <Link to={SCREEN_PATH.ADD_NEW_RATE_DECK_GENERATE}>
                  <Button>
                    <Plus className=" h-4 w-4" />
                    Generate Rate Deck
                  </Button>
                </Link>
              )}
            {/* {CUSTOMER && HAS_PERMISSION(PERMISSIONS.CUSTOMER.RATE_DECK.NAME, PERMISSIONS.CUSTOMER.RATE_DECK.ACTIONS.CUSTOMER_RATE_DECK_CREATE) && (
     <CommonDrawer
     title="Upload File"
     description="Please upload file and choose the header to map"
     isOpen={open}
     onOpenChange={handleDrawerCloseBulk}
     onSave={() => form.handleSubmit(onSubmitBulk)()}
     loading={loading}
     trigger={
       <Button type="button">
         <Plus className="h-4 w-4" />
         Upload Rate Deck
       </Button>
     }
   >
     <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmitBulk)}>
         <CommonFileUpload
           columnMappings={COLUMN_TO_MAP_UPLOAD_RATE_DECK}
           onComplete={handleUploadComplete}
         />
         {CUSTOMER === false && (
           <>
             <div className="mt-4">
               {SelectAndView({
                 LABEL: "Sip Trunk",
                 NAME: "sip_trunk_id",
                 PLACEHOLDER: "Select Sip trunk",
                 ICON: <Server />,
                 OPTIONS: siptrunkData?.flatMap((item) =>
                   item?.sip_trunks.map((newItem) => ({
                     value: String(newItem?.id),
                     label: newItem?.trunk_name,
                   }))
                 ),
                 IS_REQUIRED: true,
                 MODE: DATA_VIEW_MODE.ADD,
                 EDIT: false,
                 FORM: form,
               })}
             </div>
             <div className="mt-4">
               <FormField
                 control={form.control}
                 name="effective_date"
                 render={({ field }) => (
                   <FormItem className="flex flex-col">
                     <FormLabel>Effective Date</FormLabel>
                     <Popover>
                       <PopoverTrigger asChild>
                         <FormControl>
                           <Button
                             variant={"outline"}
                             className={cn(
                               "w-full pl-3 text-left font-normal",
                               !field.value && "text-muted-foreground"
                             )}
                           >
                             {field.value ? (
                               format(field.value, "PPP")
                             ) : (
                               <span>Select effective date</span>
                             )}
                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                           </Button>
                         </FormControl>
                       </PopoverTrigger>
                       <PopoverContent
                         className="w-auto p-0"
                         align="start"
                       >
                         <Calendar
                           mode="single"
                           selected={field.value}
                           onSelect={field.onChange}
                           initialFocus
                         />
                       </PopoverContent>
                     </Popover>
                     <FormMessage />
                   </FormItem>
                 )}
               />
             </div>
           </>
         )}
       </form>
     </Form>
   </CommonDrawer>
            )
            } */}
            {(CUSTOMER
              ? HAS_PERMISSION(
                  PARENT_MODULE_NAME.CUSTOMER,
                  PERMISSIONS.CUSTOMER.RATE_DECK.NAME,
                  PERMISSIONS.CUSTOMER.RATE_DECK.ACTIONS
                    .CUSTOMER_RATE_DECK_UPLOAD
                )
              : HAS_PERMISSION(
                  PARENT_MODULE_NAME.CARRIER,
                  PERMISSIONS.CARRIER.RATE_DECK.NAME,
                  PERMISSIONS.CARRIER.RATE_DECK.ACTIONS.CARRIER_RATE_DECK_UPLOAD
                )) && (
              <CommonDrawer
                title="Upload File"
                description="Please upload file and choose the header to map"
                isOpen={open}
                onOpenChange={handleDrawerCloseBulk}
                onSave={() => form.handleSubmit(onSubmitBulk)()}
                loading={loading}
                trigger={
                  <Button type="button">
                    <Plus className="h-4 w-4" />
                    {CUSTOMER ? "Upload Rate Deck" : "Upload Carrier Rate Deck"}
                  </Button>
                }
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitBulk)}>
                    <CommonFileUpload
                      columnMappings={COLUMN_TO_MAP_UPLOAD_RATE_DECK}
                      onComplete={handleUploadComplete}
                    />
                    {CUSTOMER === false && (
                      <>
                        <div className="mt-4">
                          {SelectAndView({
                            LABEL: "Sip Trunk",
                            NAME: "sip_trunk_id",
                            PLACEHOLDER: "Select Sip trunk",
                            ICON: <Server />,
                            OPTIONS: siptrunkData?.flatMap((item) =>
                              item?.sip_trunks.map((newItem) => ({
                                value: String(newItem?.id),
                                label: newItem?.trunk_name,
                              }))
                            ),
                            IS_REQUIRED: true,
                            MODE: DATA_VIEW_MODE.ADD,
                            EDIT: false,
                            FORM: form,
                          })}
                        </div>
                        <div className="mt-4">
                          <FormField
                            control={form.control}
                            name="effective_date"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Effective Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select effective date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}
                  </form>
                </Form>
              </CommonDrawer>
            )}
          </div>
        </div>
        {loading ? (
          <SkeletonTable ROWS={10} COLUMNS={3} />
        ) : (
          <>
            <TableContainer
              SEARCH={search}
              COLUMNS={columns}
              onSearch={handleSearch}
              VISIBILE_COLUMN_CHANGE={handleVisibleColumnsChange}
              INITIAL_VISIBLE_COLUMNS={visibleColumns}
            />
            <DataTable
              data={data}
              columns={columns?.filter((col) =>
                visibleColumns.includes(col?.accessorKey)
              )}
              COUNT={count}
              PAGE={page}
              SET_PAGE={setPage}
              LIMIT={limit}
              SET_LIMIT={setLimit}
              HANDLE_SORT={handleSort}
            />
          </>
        )}
      </div>
    </>
  );
};

export default RateDeck;
