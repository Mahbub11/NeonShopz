"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import Tiptap from "./TipTap";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { ProductSchema } from "@/schema/product/product-schema";
import { toast } from "sonner";
import { z } from "zod";
import { createProduct } from "@/server/action/product/create-product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategories } from "@/services/category/queries";
import { CategoryData, Subcategories } from "@/types/prisma-data-types"; // Adjust imports based on your folder structure

interface SubcategoryWithCategoryName extends Subcategories {
  categoryName: string;
}

export default function ProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editMode = searchParams.get("id");
  const [subcategories, setSubcategories] = useState<
    SubcategoryWithCategoryName[]
  >([]); // Subcategories data structure
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories and subcategories
  const { data, isLoading } = useGetCategories();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      subcategoryId: undefined,
    },
  });

  const { execute, status } = useAction(createProduct, {
    onSuccess: (data) => {
      if (data.data?.error) {
        toast.error(data.data.error);
      }
      if (data.data?.success) {
        toast.success(data.data.success);
      }
    },
    onExecute: (data) => {
      if (editMode) {
        toast.loading("Editing Product");
      } else {
        toast.loading("Creating Product");
      }
    },
  });

  // Fetch and flatten subcategories
  useEffect(() => {
    if (data) {
      const combinedSubcategories = data.flatMap((category: CategoryData) =>
        category.subcategories.map((subcategory) => ({
          id: subcategory.id,
          name: subcategory.name,
          categoryId: category.id, // Keeping reference to parent category
          categoryName: category.name, // For displaying category name alongside
        }))
      );
      setSubcategories(combinedSubcategories);
    }
  }, [data]);

  // Handle form submission
  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    execute({
      ...values,
      subcategoryId: values.subcategoryId?.toString(), // Convert to string to match database type
    });
  }

  // Filter subcategories based on search term
  const filteredSubcategories = subcategories.filter(
    (subcategory) =>
      subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subcategory.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-[60%]">
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value}></Tiptap>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex justify-center items-center">
                      <DollarSign
                        className="p-2 bg-muted"
                        size={40}
                      ></DollarSign>
                      <Input
                        type="number"
                        placeholder="Product Price"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <label>Subcategory</label>
              <Controller
                name="subcategoryId"
                control={form.control}
                render={({ field }) => (
                  <div className="relative">
                  <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ""}>

                      <SelectTrigger>
                        <SelectValue placeholder="Search or select a subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2">
                          <Input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-2"
                          />
                        </div>
                        {filteredSubcategories.length > 0 ? (
                          filteredSubcategories.map((subcategory) => (
                            <SelectItem
                              key={subcategory.id}
                              value={subcategory.id.toString()} // Ensure subcategoryId is passed
                            >
                              {`Subcategory: ${subcategory.name} (Category: ${subcategory.categoryName})`}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-2 py-2 text-gray-500">
                            No options found
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
            <Button className="w-full" type="submit">
              {editMode ? "Save Changes" : "Create Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
