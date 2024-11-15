"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/prisma-data-types";

interface DataTableProps {
  columns: ColumnDef<Product, any>[];
  data: Product[];
}

export function ProductDataTable({ columns, data }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const rowsPerPage = 10;

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const titleMatches = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const subcategoryMatches = item.subcategory.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatches || subcategoryMatches;
    });
  }, [data, searchTerm]);

  // Sort filtered data in descending order based on id
  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) => b.id - a.id); // Sort by id in descending order
  }, [filteredData]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
  }, [sortedData, currentPage]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  return (
    <div className="rounded-md border">
      <div className="flex justify-between p-4">
        <Input
          placeholder="Search by title, category, or subcategory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      <div className="flex justify-between p-4 items-center">
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`rounded-full ${
                currentPage === index ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
