import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const ServiceCard = ({
  ICON,
  TITLE,
  DESCRIPTION,
  CHECKED,
  ONTOGGLE,
  SHOW_ICONS = true,
}) => {
  return (
    <div
      className=" relative border border-primary rounded-lg p-4 shadow-sm bg-background w-full max-w-md  cursor-pointer mb-3"
      onClick={ONTOGGLE}
    >
      <div className={`flex items-center justify-between`}>
        {SHOW_ICONS && (
          <div className="flex items-center space-x-2">{ICON}</div>
        )}
        <div className={SHOW_ICONS ? "" : "absolute right-4 top-5"}>
          <Checkbox id="terms" checked={CHECKED} onCheckedChange={ONTOGGLE} />
        </div>
      </div>
      <h3 className={`text-lg font-semibold ${SHOW_ICONS ? "mt-4" : ""}`}>
        {TITLE}
      </h3>
      <p className="text-gray-500 text-sm mt-4">{DESCRIPTION}</p>
    </div>
  );
};

export default ServiceCard;
