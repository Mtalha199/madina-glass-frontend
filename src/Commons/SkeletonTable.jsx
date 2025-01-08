import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonTable = ({ ROWS = 5, COLUMNS = 4 }) => {
  return (
    <div className="overflow-x-auto w-full p-4 bg-gray-50 rounded-lg shadow-md">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            {Array.from({ length: COLUMNS }).map((_, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-gray-300 text-left"
              >
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <tr key={rowIndex} className="bg-white hover:bg-gray-100">
              {Array.from({ length: COLUMNS }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-4 border-b border-gray-200"
                >
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
