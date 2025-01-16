import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FormSkeleton = () => {
  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Company Detail Skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" /> {/* Title */}
          <Skeleton className="h-4 w-1/2" /> {/* Description */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-4 w-1/4 mb-2" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 my-6"></div> {/* Separator */}

      {/* Portal Credential Detail Skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" /> {/* Title */}
          <Skeleton className="h-4 w-1/2" /> {/* Description */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-4 w-1/4 mb-2" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 my-6"></div> {/* Separator */}

      {/* Primary Contact Detail Skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" /> {/* Title */}
          <Skeleton className="h-4 w-1/2" /> {/* Description */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-4 w-1/4 mb-2" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;
