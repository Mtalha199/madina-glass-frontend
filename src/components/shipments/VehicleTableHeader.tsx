import React from "react";
import { TableCell, TableHeader, TableRow } from "../ui/table";

export default function VehicleTableHeader() {
  return (
    <TableHeader className="border-b border-gray-100 dark:border-white/5">
      <TableRow>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          Reference Number
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          Customer Type
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          Route
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          Final Destination
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          City
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          Vessel Number
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          DHL Tracking Number
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          Status
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          Progress
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
        >
          Created At
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-12 whitespace-nowrap"
        >
          <span className="sr-only">Actions</span>
        </TableCell>
      </TableRow>
    </TableHeader>
  );
}

