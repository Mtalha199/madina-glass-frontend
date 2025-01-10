import CardDetailCommon from "@/Commons/CardDetailCommon";
import SkeletonCardLayout from "@/Commons/SkelotonCard";
import { APICALL } from "@/components/Api/ApiCall";
import { API_END_POINT, API_TYPE, BILLING_DETAIL, COMPANY_DETAIL, PRIMARY_DETAIL, TECH_DETAIL } from "@/Constant";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const ProfileCustomer = () => {
  const { id } = useParams();
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
      `${API_END_POINT.CUSTOMER_LIST}/${id}`,
      setloading,
      setData,
      setCount,
    );
  };
  const Company_detail=COMPANY_DETAIL(data)
  const Primary_detail=PRIMARY_DETAIL(data)
  const Billing_detail=BILLING_DETAIL(data)
  const Tech_detail=TECH_DETAIL(data)
  return (
    <>
      {loading ? (
        <SkeletonCardLayout ROWS={10} COLUMNS={3} />
      ) : (
        <CardDetailCommon HEADING_NAME={"Company Detail"} DATA={Company_detail} />
      )}

      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 mt-6   ">
        <CardDetailCommon
          HEADING_NAME={"Primary Contact Detail"}
          DATA={Primary_detail}
          IS_TWO_COLUMNS={false}
        />
        <CardDetailCommon
          HEADING_NAME={"Billing Detail"}
          DATA={Billing_detail}
          IS_TWO_COLUMNS={false}
        />
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 mt-6   ">
        <CardDetailCommon
          HEADING_NAME={"Technical  Detail"}
          DATA={Tech_detail}
          IS_TWO_COLUMNS={false}
        />
        <CardDetailCommon
          HEADING_NAME={"Notification Detail"}
          DATA={Primary_detail}
          IS_TWO_COLUMNS={false}
        />
      </div>
    </>
  );
};
