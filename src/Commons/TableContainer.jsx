import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const TableContainer = ({
    SEARCH,
  COLUMNS,
  onSearch,
  INITIAL_VISIBLE_COLUMNS,
  VISIBILE_COLUMN_CHANGE,
}) => {
  const [visibleColumns, setVisibleColumns] = useState(
    INITIAL_VISIBLE_COLUMNS || COLUMNS?.map((col) => col?.accessorKey)
  );

  const toggleColumn = (columnKey) => {
    setVisibleColumns((prev) => {
      const newVisibleColumns = prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey];
        VISIBILE_COLUMN_CHANGE?.(newVisibleColumns);
      return newVisibleColumns;
    });
  };

  return (
    <div className="flex items-center justify-between w-full mt-7 mb-5">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
        value={SEARCH}
          type="search"
          placeholder="Type a command or search"
          className="w-full rounded-lg bg-background pl-8 md:w-[400px] lg:w-[400px]"
          onChange={(e) => onSearch?.(e.target.value)}
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
  );
};

export default TableContainer;