import React from "react";
import Skeleton from "@/components/ui/skeleton/Skeleton";

const PermissionItemSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Skeleton variant="rectangular" width={20} height={20} />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={16} width="60%" />
          <Skeleton variant="text" height={14} width="80%" />
        </div>
      </div>
    </div>
  );
};

export default PermissionItemSkeleton;

