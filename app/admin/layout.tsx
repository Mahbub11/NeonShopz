import Link from "next/link";
import React from "react";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper"; // Adjust the path as needed
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If the user is not an admin, show a dialog
  return (
    <div className="w-[90%] md:w-[80%] mx-auto mt-10">
      {children}
    </div>
  );
}
