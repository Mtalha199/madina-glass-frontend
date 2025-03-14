import { Loader2 } from "lucide-react";

export const Loader = ({ size = 24, className = "", LOADING=true }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2
        className={`animate-spin ${className}`}
        width={size}
        height={size}
      />
      {
        LOADING && <span>Loading...</span>
      }
    </div>
  );
};
