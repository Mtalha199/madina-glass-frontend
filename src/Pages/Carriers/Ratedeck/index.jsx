import HeaderCommon from "@/Commons/HeaderCommon";
import SkeletonTable from "@/Commons/SkeletonTable";
import TableContainer from "@/Commons/TableContainer";
import { APICALL } from "@/components/Api/ApiCall";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { API_END_POINT, API_TYPE, SCREEN_PATH } from "@/Constant";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RateDeckCustomer = () => {
  const navigate = useNavigate();
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
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Rate Decks</h1>
          <div className="flex space-x-2">
            <Link to={SCREEN_PATH.ADD_NEW_RATE_DECK_GENERATE}>
              <Button>
                <Plus className=" h-4 w-4" />
                Generate Rate Deck
              </Button>
            </Link>
            <Button type="button">
              <Plus className="h-4 w-4" />
              Upload Rate Deck
            </Button>
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

export default RateDeckCustomer;
