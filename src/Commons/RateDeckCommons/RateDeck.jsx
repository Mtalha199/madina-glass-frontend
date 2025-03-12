
import SkeletonTable from "@/Commons/SkeletonTable";
import TableContainer from "@/Commons/TableContainer";
import { APICALL } from "@/components/Api/ApiCall";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { API_END_POINT, API_TYPE, SCREEN_PATH } from "@/Constant";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonDrawer from "../DrawerCommon";
import FileUpload from "../FileUploadCommon";
import { Form } from "@/components/ui/form";
import { useRateDeckUpload, useStirShakenBulk } from "@/components/Hooks/CustomHooks";
const RateDeck = ({CUSTOMER=true}) => {
  const navigate = useNavigate();
    const formStarShakenBulk = useRateDeckUpload();
  
  const columns = [
    {
      header: "Name",
      accessorKey: "file_name",
      cell: ({ row }) => {
        const fullName = row.getValue("file_name");
        const id = row.getValue("id");
        return (
          <Link to={`/customer/rate-deck/${id}`}>
            <span className="text-primary hover:underline">{fullName}</span>
          </Link>
        );
      },
    },

    { header: "Min Profit", accessorKey: "min_profit" },
  ];
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.accessorKey)
  );
  const [search, setSearch] = useState(null);
    const [open, setOpen] = useState(false);
    const handleDrawerCloseBulk = () => {
        formStarShakenBulk.reset();
        setOpen(!open);
      };
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [page, limit, orderBy, order, search]);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      API_END_POINT.RATE_DECK,
      setloading,
      { page, limit, orderBy, order, search },
      setData,
      setCount
    );
  };
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
      const mappedData = formStarShakenBulk.getValues("mappedData")
      console.log(mappedData,"mappedData")
    }
    const handleFileUploadComplete = (mappedData) => {
        formStarShakenBulk.setValue("mappedData", mappedData);
      };
      const additionalSelects = [
        {
            name: "NPAXXXX",
            label: "Select NPAXXX",
            placeholder: "Choose Inter npaxxx",
            required: false
          },
        {
          name: "inter",
          label: "Select Inter Column",
          placeholder: "Choose Inter header",
          required: false
        },
        {
          name: "intra",
          label: "Select Intra Column",
          placeholder: "Choose Intra header",
          required: false
        },
        {
          name: "immediate",
          label: "Select Immediate Column",
          placeholder: "Choose Immediate header",
          required: false
        }
      ];
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Rate Decks</h1>
          <div className="flex space-x-2">
            {
                CUSTOMER && 
                <Link to={SCREEN_PATH.ADD_NEW_RATE_DECK_GENERATE}>
                <Button>
                  <Plus className=" h-4 w-4" />
                  Generate Rate Deck
                </Button>
              </Link>
            }
            <CommonDrawer
                title="Upload File"
                description="Please upload file and choose the header to map"
                isOpen={open}
                onOpenChange={handleDrawerCloseBulk}
                onSave={() => formStarShakenBulk.handleSubmit(onSubmitBulk)()}
                loading={loading}
                trigger={
                  <Button
                    type="button"
                  >
                    <Plus className="h-4 w-4"/>
                    Upload Rate Deck
                  </Button>
                }
              >
                <Form {...formStarShakenBulk}>
                  <form
                    onSubmit={formStarShakenBulk.handleSubmit(onSubmitBulk)}
                  >
                    <FileUpload onMappingComplete={handleFileUploadComplete}  additionalSelects={additionalSelects} DID={false}/>
                  </form>
                </Form>
              </CommonDrawer>
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
