import DeleteConfirmationDialog from "@/Commons/DeleteConfirmationCommon";
import CommonDrawer from "@/Commons/DrawerCommon";
import { InputCommon } from "@/Commons/FormCommons";
import HeaderCommon from "@/Commons/HeaderCommon";
import SkeletonTable from "@/Commons/SkeletonTable";
import TableContainer from "@/Commons/TableContainer";
import { APICALL } from "@/components/Api/ApiCall";
import { useAddGroup, useAddUser } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Form } from "@/components/ui/form";
import { API_END_POINT, API_TYPE, TOAST_MESSAGES } from "@/Constant";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

const UserSetting = () => {
  const form = useAddUser();
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const ID = row.getValue("id");
        return (
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                form.setValue("group_name", row.getValue("company_name"));
                setOpenDrawer(true);
              }}
            >
              Edit
            </Button>
            <DeleteConfirmationDialog onConfirm={() => handleDelete(ID)}>
              <Button variant="destructive">Delete</Button>
            </DeleteConfirmationDialog>
          </div>
        );
      },
    },
  ];

  const [openDrawer, setOpenDrawer] = useState(false);
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

  const handleDrawerClose = () => {
    form.reset();
    setOpenDrawer(!openDrawer);
  };
  async function onSubmit(data) {
    const payload = {
      name: data.group_name,
    };
    const response = await APICALL(
      API_TYPE.POST,
      API_END_POINT.GROUP_LIST,
      setloading,
      payload,
      null,
      null,
      TOAST_MESSAGES.GROUP_ADDED
    );
    if (response !== undefined) {
      setOpenDrawer(false);
      getData();
    }
  }

  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      API_END_POINT.GROUP_LIST,
      setloading,
      { page, limit, orderBy, order, search },
      setData,
      setCount
    );
  };
  const handleDelete = async (id) => {
    await APICALL(
      API_TYPE.DELETE,
      `${API_END_POINT.SIP_TRUNK_LIST_CUSTOMER}/${id}`,
      setloading,
      null,
      getData
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
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [page, limit, orderBy, order, search]);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <CommonDrawer
          title="Add Group"
          description="Please enter a file name and save to create a new group."
          isOpen={openDrawer}
          onOpenChange={handleDrawerClose}
          onSave={() => form.handleSubmit(onSubmit)()}
          trigger={
            <Button type="button">
              <Plus />
              Add New User
            </Button>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputCommon
                LABEL={"User Name"}
                NAME={"user_name"}
                PLACEHOLDER={"e.g., janesmith123"}
                TYPE={"text"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"Time Zone"}
                NAME={"time_zone"}
                PLACEHOLDER={"e.g., GMT-5, PST, EST"}
                TYPE={"text"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"Email"}
                NAME={"email"}
                PLACEHOLDER={"e.g., jane.smith@example.com"}
                TYPE={"email"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"First Name"}
                NAME={"first_name"}
                PLACEHOLDER={"e.g., Jane"}
                TYPE={"text"}
                CONTROL={form.control}
              />
              <InputCommon
                LABEL={"Last Name"}
                NAME={"last_name"}
                PLACEHOLDER={"e.g., Smith"}
                TYPE={"text"}
                CONTROL={form.control}
              />
            </form>
          </Form>
        </CommonDrawer>
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
    </>
  );
};

export default UserSetting;
