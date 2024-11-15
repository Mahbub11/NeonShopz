"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const items = [
  { id: "comodous", label: "Comodous", quantity: 2 },
  { id: "cosmopolis", label: "Cosmopolis", quantity: 8 },
  { id: "de_fermentumo", label: "De Fermentumo", quantity: 2 },
  { id: "dincidunteros", label: "Dincidunteros", quantity: 37 },
  { id: "donatello", label: "Donatello", quantity: 1 },
  { id: "izabella", label: "Izabella", quantity: 2 },
  { id: "loremous", label: "Loremous", quantity: 40 },
  { id: "loremous_comodous", label: "Loremous Comodous", quantity: 16 },
  { id: "milancelos", label: "Milancelos", quantity: 2 },
  { id: "solutmades", label: "Solutmades", quantity: 12 },
] as const;

// Define a sizes array with id and size_name
const sizes = [
  { id: "small", size_name: "Small" },
  { id: "medium", size_name: "Medium" },
  { id: "large", size_name: "Large" },
  { id: "xlarge", size_name: "X-Large" },
  { id: "xxlarge", size_name: "X-Small" },

  { id: "1", size_name: "28" },
  { id: "2", size_name: "29" },
  { id: "3", size_name: "30" },
  { id: "4", size_name: "31" },
  { id: "5", size_name: "32" },
];

const FormSchema = z.object({
  items: z.array(z.string()),
});

interface PropertyFeatureCheckboxProps {
  onFormDataChange: (data: string[]) => void; // This is the callback function to pass the form data to the parent
}

export function SizePickerCheckbox({
  onFormDataChange,
}: PropertyFeatureCheckboxProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const handleCheckedChange = (sizeId: string, checked: boolean) => {
    const newItems = checked
      ? [...form.getValues("items"), sizeId]
      : form.getValues("items").filter((value) => value !== sizeId);

    onFormDataChange(newItems);

    // Update the form values with the new array of selected items
    form.setValue("items", newItems);

    // Trigger form submission
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                {/* Flex container for even spacing of items */}
                <div className="flex flex-wrap justify-between items-center gap-3">
                  {sizes.map((size) => (
                    <FormField
                      key={size.id} // Key should be unique and stable
                      control={form.control}
                      name="items"
                      render={({ field }) => (
                        <FormItem className="flex justify-center items-center">
                          <FormControl>
                            {/* Size name displayed as a clickable box */}
                            <div
                              className="cursor-pointer p-2 border "
                              onClick={() =>
                                handleCheckedChange(
                                  size.id,
                                  !field.value?.includes(size.id)
                                )
                              }
                              style={{
                                border: field.value?.includes(size.id)
                                  ? "1px solid black"
                                  : "1px solid #AEAEAE", // Border when selected
                              }}
                            >
                              <span className="text-center text-sm">
                                {size.size_name} {/* Display size name */}
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
