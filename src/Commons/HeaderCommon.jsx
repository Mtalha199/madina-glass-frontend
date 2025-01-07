import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

const HeaderCommon = ({ ITEMS,COLUMNS,DATA }) => {
  const [visibleColumns, setVisibleColumns] = useState(
    COLUMNS?.map((col) => col?.accessorKey)
  );
  const toggleColumn = (columnKey) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };
  return (
    <>
    <div className="flex items-center justify-between w-full mt-7 mb-5">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Type a command or search"
          className="w-full rounded-lg bg-background pl-8 md:w-[400px] lg:w-[400px]"
        />
      </div>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {COLUMNS?.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.accessorKey}
                checked={visibleColumns.includes(column.accessorKey)}
                onCheckedChange={() => toggleColumn(column.accessorKey)}
              >
                {column.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
     <DataTable
     data={DATA}
     columns={COLUMNS?.filter((col) => visibleColumns.includes(col?.accessorKey))}
   />
   </>
  );
};

export default HeaderCommon;
