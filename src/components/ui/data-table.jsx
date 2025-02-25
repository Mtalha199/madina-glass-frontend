import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  FileQuestion,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function DataTable({
  data,
  columns,
  COUNT,
  PAGE,
  SET_PAGE,
  LIMIT,
  SET_LIMIT,
  HANDLE_SORT,
}) {
  const TOTAL_PAGES = Math.ceil(COUNT / LIMIT);
  const goToPage = (page) => {
    SET_PAGE(Math.max(1, Math.min(page, TOTAL_PAGES)));
  };
  const EmptyState = () => (
    <TableRow>
      <TableCell colSpan={100} className="h-[400px] text-center p-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-medium">No records found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                There are no records to display at the moment. Records will
                appear here once they are added.
              </p>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      <div className="space-y-4">
        <div className="border rounded-md tableWidth">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.accessorKey}
                    className={column.className}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => HANDLE_SORT(column.accessorKey)}
                      className="h-8 whitespace-nowrap"
                    >
                      {column.header}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <EmptyState />
              ) : (
                data.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.accessorKey}
                        className={column.className}
                      >
                        <div className="flex items-center">
                          {column.cell
                            ? column.cell({
                                row: { getValue: (key) => row[key] },
                              })
                            : row[column.accessorKey]}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {data.length === 0 ? null : (
        <div className="flex items-center justify-between space-y-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={LIMIT?.toString()}
              onValueChange={(value) => {
                SET_LIMIT(Number(value));
                SET_PAGE(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={LIMIT} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => goToPage(1)}
              disabled={PAGE === 1}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => goToPage(PAGE - 1)}
              disabled={PAGE === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center justify-center text-sm font-medium">
              Page {PAGE} of {TOTAL_PAGES}
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => goToPage(PAGE + 1)}
              disabled={PAGE === TOTAL_PAGES}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => goToPage(TOTAL_PAGES)}
              disabled={PAGE === TOTAL_PAGES}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default DataTable;
