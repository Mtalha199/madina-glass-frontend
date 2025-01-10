import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const CardDetailCommon = ({
  HEADING_NAME,
  IS_EDIT = true,
  DATA = [],
  IS_TWO_COLUMNS = true,
}) => {
  const halfIndex = Math.ceil(DATA.length / 2);
  const leftColumn = IS_TWO_COLUMNS ? DATA.slice(0, halfIndex) : DATA;
  const rightColumn = IS_TWO_COLUMNS ? DATA.slice(halfIndex) : [];

  return (
    <div className="bg-background border-t rounded-lg p-4">
      <div className="mb-4 flex justify-between">
        <h3 className="text-xl font-semibold">{HEADING_NAME}</h3>
        {IS_EDIT && (
          <Button variant="ghost">
            <Edit />
          </Button>
        )}
      </div>
      <div
        className={`grid ${
          IS_TWO_COLUMNS ? "lg:grid-cols-2 md:grid-cols-1" : "grid-cols-1"
        } gap-6 text-sm my-4 border-t`}
      >
        <div className="space-y-4 mt-4">
          {leftColumn?.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-gray-500" />
              <p className="text-gray-500">{item?.label}:</p>
              <p className={`font-medium ${item?.valueItalic ? "italic" : ""}`}>
                {item?.value}
              </p>
            </div>
          ))}
        </div>
        {IS_TWO_COLUMNS && (
          <div className="space-y-4 mt-4">
            {rightColumn?.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-gray-500" />
                <p className="text-gray-500">{item?.label}:</p>
                <p
                  className={`font-medium ${item?.valueItalic ? "italic" : ""}`}
                >
                  {item?.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetailCommon;
