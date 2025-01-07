
import BreadCrumbCommon from "@/Commons/BreadCrumbCommon";
import HeaderCommon from "@/Commons/HeaderCommon";
import { Plus } from "lucide-react";
import {  useNavigate } from "react-router-dom";
import CardDesign from "./CardDesign";
import { MODULENAME, SCREEN_PATH } from "@/Constant";


const Rotator=()=>{
  const navigate = useNavigate();

    const actionButtons = [
        {
          label: "Create New Url",
          variant: "outline",
          onClick: () => navigate(SCREEN_PATH.ROTATOR_NEW_URL),
          icon:<Plus />
        },
      ];
    return (
        <>
    <BreadCrumbCommon
        BREADCRUMBS={false}
        ITEMS={[
          { label: "Number Reputation", href: "#" },
          { label: MODULENAME.ROTATOR },
        ]}
        SHOW_BUTTONS={true}
        BUTTONS={actionButtons}
      />
      <HeaderCommon />
      <CardDesign />
        </>
    )
}
export default Rotator;