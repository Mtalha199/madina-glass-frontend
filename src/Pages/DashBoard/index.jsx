import { Skeleton } from "@/components/ui/skeleton";


function Dashboard() {
  return (
  

    <div className="flex flex-col space-y-3 p-4">
    <Skeleton className="h-[25rem] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-8 w-[75rem]" />
      <Skeleton className="h-8 w-[60rem]" />
    </div>

  </div>

  );
}

export default Dashboard;
