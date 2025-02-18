import HeaderCommon from "@/Commons/HeaderCommon";
import SkeletonTable from "@/Commons/SkeletonTable";
import { APICALL } from "@/components/Api/ApiCall";
import { Button } from "@/components/ui/button";
import { API_END_POINT, API_TYPE, SCREEN_PATH } from "@/Constant";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RateDeckCustomer = () => {
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getData();
  }, []);
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
  const columns = [
    {
      header: "Name",
      accessorKey: "company_name",
            cell: ({ row }) => {
              const fullName = row.getValue("company_name");
              const id = row.getValue("id");
              return (
                <Link to={`/customer/rate-deck/${id}`}>
                  <span className="text-primary hover:underline">{fullName}</span>
                </Link>
              );
            },
    },

    { header: "Balance", accessorKey: "balance" },
  ];
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
          <HeaderCommon DATA={data} COLUMNS={columns} COUNT={count} />
        )}
      </div>
    </>
  );
};

export default RateDeckCustomer;
