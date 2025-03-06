import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const StatusBadge = ({ DATA, STATUS_CONFIG, ON_STATUS_CHANGE }) => {
  const getStatusVariant = () => {
    return DATA ? STATUS_CONFIG.true.variant : STATUS_CONFIG.false.variant;
  };

  const getStatusLabel = () => {
    return DATA ? STATUS_CONFIG.true.label : STATUS_CONFIG.false.label;
  };
  const getOppositeValue = () => {
    return !DATA;
  };

  const getOppositeLabel = () => {
    return DATA ? STATUS_CONFIG.false.label : STATUS_CONFIG.true.label;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Badge variant={getStatusVariant()}>
            {getStatusLabel()}
            <ChevronDown className="h-4 w-4" />
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => ON_STATUS_CHANGE(getOppositeValue())}>
          {getOppositeLabel()}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusBadge;
