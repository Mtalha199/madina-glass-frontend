import DeleteConfirmationDialog from "@/Commons/DeleteConfirmationCommon";
import CommonDrawer from "@/Commons/DrawerCommon";
import { InputCommon } from "@/Commons/FormCommons";
import HeaderCommon from "@/Commons/HeaderCommon";
import SkeletonTable from "@/Commons/SkeletonTable";
import { APICALL } from "@/components/Api/ApiCall";
import { useAddGroup } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { API_END_POINT, API_TYPE } from "@/Constant";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

const Groups = () => {
  const form = useAddGroup();

  const [openSingle, setOpenSingle] = useState(false);
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDrawerClose = () => {
    form.reset();
    setOpenSingle(!openSingle);
  };
  async function onSubmit(data) {
    console.log(data);
  }

  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      API_END_POINT.CUSTOMER_LIST,
      setloading,
      null,
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

  const columns = [
    {
      header: "Name",
      accessorKey: "company_name",
    },

    { header: "Balance", accessorKey: "balance" },
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
                setOpenSingle(true);
              }}
            >
              Edit
            </Button>
            {/* <Button type="button" variant="destructive">
              Delete
            </Button> */}
            <DeleteConfirmationDialog onConfirm={() => handleDelete(ID)}>
              <Button variant="destructive">Delete</Button>
            </DeleteConfirmationDialog>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Groups</h1>
        <CommonDrawer
          title="Add Group"
          description="Please enter a file name and save to create a new group."
          isOpen={openSingle}
          onOpenChange={handleDrawerClose}
          onSave={() => form.handleSubmit(onSubmit)()}
          trigger={
            <Button type="button">
              <Plus />
              Add Group
            </Button>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputCommon
                LABEL={"Group Name"}
                NAME={"group_name"}
                PLACEHOLDER={"e.g., Jane Smith"}
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
        <HeaderCommon DATA={data} COLUMNS={columns} COUNT={count} />
      )}
    </>
  );
};

export default Groups;
