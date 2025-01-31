import { Skeleton } from "@/components/ui/skeleton";

export default function AccountHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
      <div className="flex items-center gap-4">
        {/* Avatar Skeleton */}
        <Skeleton className="w-16 h-16 rounded-full" />
        <div>
          {/* Company Name Skeleton */}
          <Skeleton className="h-6 w-32 mb-2" />
          {/* Status Badge Skeleton */}
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
