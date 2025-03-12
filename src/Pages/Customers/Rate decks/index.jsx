import HeaderCommon from "@/Commons/HeaderCommon";
import RateDeck from "@/Commons/RateDeckCommons/RateDeck";
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
  return (
    <>
      <RateDeck />
    </>
  );
};

export default RateDeckCustomer;
