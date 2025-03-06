import { API_END_POINT, API_TYPE, SCREEN_PATH } from "@/Constant";
import React, { useState, useEffect } from "react";
import HeaderCommon from "./HeaderCommon";
import { APICALL } from "@/components/Api/ApiCall";
import SkeletonTable from "./SkeletonTable";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import TableContainer from "./TableContainer";
import DataTable from "@/components/ui/data-table";

const SipTrunkCommonTable = ({ id,CARRIER=false }) => {

  const columns = [
    { header: "ID", accessorKey: "id" },
    {
      header: "Name",
      accessorKey: "trunk_name",
      cell: ({ row }) => {
        const fullName = row.getValue("trunk_name");
        const id = row.getValue("id");
        return (
          <Link to={CARRIER ? `/carrier/siptrunk/${id}` : `/siptrunk/${id}`}>
            <span className="text-primary hover:underline">{fullName}</span>
          </Link>
        );
      },
    },
    { header: "Customer Name", accessorKey: "company_name" },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    { header: "Trunk Type", accessorKey: "trunk_type" },
    {
      header: "Global Ani Block",
      accessorKey: "global_ani_block",
      cell: ({ row }) => {
        const status = row.getValue("global_ani_block");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    {
      header: "Customer Ani Block",
      accessorKey: "customer_ani_block",
      cell: ({ row }) => {
        const status = row.getValue("customer_ani_block");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    { header: "DNIS Call Limit", accessorKey: "dnis_call_limit" },
    { header: "ANI Call Limit", accessorKey: "ani_call_limit" },
    { header: "Session Limit", accessorKey: "session_limit" },
    { header: "Default Stir Shaken", accessorKey: "default_stir_shaken" },
    { header: "SIP Trunk ID", accessorKey: "sip_trunk_id" },
    {
      header: "Global DNIS Block",
      accessorKey: "global_dnis_block",
      cell: ({ row }) => {
        const status = row.getValue("global_dnis_block");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    {
      header: "Customer DNIS Block",
      accessorKey: "customer_dnis_block",
      cell: ({ row }) => {
        const status = row.getValue("customer_dnis_block");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    { header: "CPS Limit", accessorKey: "cps_limit" },
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
    const endpoint = id
    ? `${API_END_POINT.SIP_TRUNK_LIST_CUSTOMER}/${id}`
    : CARRIER ? `${API_END_POINT.SIP_TRUNK_LIST }?carrier=1`:  `${API_END_POINT.SIP_TRUNK_LIST}?carrier=0`;
    await APICALL(
      API_TYPE.GET,
      endpoint,
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
    <div>
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
  );
};

export default SipTrunkCommonTable;
