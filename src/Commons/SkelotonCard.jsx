import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonCardLayout = () => {

  return (
    <div className="">
        <div
          className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
        >
          <div className="mb-6">
            <Skeleton className="h-6 w-1/3 rounded-md bg-gray-300" />
          </div>
          <div className="space-y-5">
            {Array.from({ length: 8 }).map((_, fieldIndex) => (
              <div
                key={fieldIndex}
                className="flex items-center space-x-4 animate-pulse"
              >
                <Skeleton className="h-6 w-6 rounded-full bg-gray-300" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full rounded-md bg-gray-300" />
                  <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default SkeletonCardLayout;
