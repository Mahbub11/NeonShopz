import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  categorySchema,
  subCategorySchema,
} from "@/types/category/category-types"; // Import the schemas
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAddCategory } from "@/services/category/mutation";

const CreateCategoryForm: React.FC = () => {
  const useCreateCategoryMutation = useAddCategory();
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    //  execute(values);
    useCreateCategoryMutation.mutate(values, {
      onSuccess: () => {
        console.log("category created successfully");
      },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className={cn(
              "w-full",
              status === "executing" ? "animate-pulse" : ""
            )}
          >
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategoryForm;
