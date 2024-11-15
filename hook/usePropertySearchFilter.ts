import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation"; // new from next/navigation
import { useQueryClient } from "@tanstack/react-query";


// Utility function to create query params from filter state
const createQueryParams = (filters: any): string => {
  const queryParams = new URLSearchParams();

  if (filters.selectedItems.length > 0) {
    queryParams.set("features", filters.selectedItems.join(","));
  }
  if (filters.type) queryParams.set("type", filters.type);
  if (filters.category) queryParams.set("category", filters.category);
  if (filters.location) queryParams.set("location", filters.location);
  queryParams.set("priceMin", filters.price[0].toString());
  queryParams.set("priceMax", filters.price[1].toString());

  return queryParams.toString(); // This returns the query string format
};

export const useFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<{
    selectedItems: string[];
    type: string;
    category: string;
    location: string;
    price: [number, number];
    bed_rooms: string;
    bath_rooms: string;
  }>({
    selectedItems: [],
    type: "",
    category: "",
    location: "",
    price: [100, 50000],
    bed_rooms: "",
    bath_rooms: "",
  });

  useEffect(() => {
    // Sync filters state with the URL query params on initial load or URL change
    const features = searchParams.getAll("features");
    const type = searchParams.get("type") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";
    const priceMin = searchParams.get("priceMin")
      ? Number(searchParams.get("priceMin"))
      : 10;
    const priceMax = searchParams.get("priceMax")
      ? Number(searchParams.get("priceMax"))
      : 500000;

    setFilters({
      selectedItems: features || [],
      type,
      category,
      location,
      price: [priceMin, priceMax],
      bed_rooms: "",
      bath_rooms: "",
    });
  }, [searchParams]);

  // Function to update filters and update URL
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };
      const queryString = createQueryParams(updatedFilters);
      const newUrl = `${pathname}?${queryString}`;
      window.history.pushState({}, "", newUrl); // Update the URL
      return updatedFilters;
    });
  };


  return {
    filters,
    updateFilters,
    loading,
   
  };
};
