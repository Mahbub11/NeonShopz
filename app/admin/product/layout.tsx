
import Link from "next/link";
import { redirect } from "next/navigation";
import { BarChart, Package, PenIcon } from "lucide-react";
import React from "react";
import DashboardNav from "@/components/admin/navigation/DashboardNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
    const adminLinks =[
        {
          label: "Analytics",
          path: "/dashboard/analytics",
          icon: <BarChart size={16} />,
        },
        {
          label: "Create",
          path: "/admin/product/add-product",
          icon: <PenIcon size={16} />,
        },
        {
          label: "Edit",
          path: "/admin/product/edit-product",
          icon: <BarChart size={16} />,
        },
        {
          label: "Products",
          path: "/admin/product/all",
          icon: <Package size={16} />,
        },
        {
          label: "Category",
          path: "/admin/product/category",
          icon: <Package size={16} />,
        },
      ]

  // If the user is not an admin, show a dialog
  return (
    <>
     <div className="p-10 dark:bg-slate-900 w-full h-full">
      <DashboardNav allLinks={adminLinks} />
      {children}
    </div>
    </>
  );
}
