import React from "react";
import Skeleton from "@/components/ui/skeleton/Skeleton";

const RoleCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Skeleton variant="rectangular" width={80} height={24} />
          <Skeleton variant="text" height={28} width={150} />
        </div>
        <Skeleton variant="rectangular" width={140} height={36} />
      </div>

      {/* Description */}
      <div className="mb-4 space-y-2">
        <Skeleton variant="text" height={16} width="100%" />
        <Skeleton variant="text" height={16} width="80%" />
      </div>

      {/* Assigned Users */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton variant="rectangular" width={20} height={20} />
        <Skeleton variant="text" height={16} width={120} />
      </div>

      {/* Permissions Section */}
      <div>
        <Skeleton variant="text" height={20} width={100} className="mb-2" />
        <Skeleton variant="rectangular" width={150} height={24} />
      </div>
    </div>
  );
};

export default RoleCardSkeleton;

