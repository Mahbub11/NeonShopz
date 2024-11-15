"use client";

import { AddCategory } from "@/components/category/create-category";
import { CategoryColumns } from "@/components/category/table/columns";
import { CategoryDataTable } from "@/components/category/table/data-table";
import { useGetCategories } from "@/services/category/queries";

export default function Page() {
  const { data, isLoading } = useGetCategories();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(data);

  return (
    <div>
      <AddCategory></AddCategory>
      <CategoryDataTable
        data={data!}
        columns={CategoryColumns}
      ></CategoryDataTable>
    </div>
  );
}
