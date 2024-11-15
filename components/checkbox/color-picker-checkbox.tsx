"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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

// Generate a 10-color array (this can be random or predefined)
const colorArray = [
  "#d7bde2 ",
  " #a9cce3 ",
  " #a9dfbf ",
  " #abebc6 ",
  " #af7ac5 ",
  "#7fb3d5 ",
  " #aed6f1 ",
  " #52be80 ",
  " #f5cba7 ",
  " #eb984e ",
];

const FormSchema = z.object({
  items: z.array(z.string()),
});

interface PropertyFeatureCheckboxProps {
  onFormDataChange: (data: string[]) => void; // This is the callback function to pass the form data to the parent
}

export function ColorPickerCheckbox({
  onFormDataChange,
}: PropertyFeatureCheckboxProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Handle form submission here
    console.log(data);
  }

  const handleCheckedChange = (itemId: string, checked: boolean) => {
    const newItems = checked
      ? [...form.getValues("items"), itemId]
      : form.getValues("items").filter((value) => value !== itemId);

    onFormDataChange(newItems);

    // Update the form values with the new array of selected items
    form.setValue("items", newItems);

    // Trigger form submission
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-5 gap-4">
                {items.map((item, index) => (
                  <FormField
                    key={item.id} // Key should be unique and stable
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      const colorIndex = index % colorArray.length; // Loop through colors
                      const color = colorArray[colorIndex];

                      return (
                        <FormItem
                          key={item.id}
                          className="flex justify-center items-center" // Flex for centering content inside each grid item
                        >
                          <FormControl>
                            {/* Color box as a selectable button */}
                            <div
                              className={`cursor-pointer `}
                              onClick={() =>
                                handleCheckedChange(
                                  item.id,
                                  !field.value?.includes(item.id)
                                )
                              }
                              style={{
                                backgroundColor: color,
                                width: "40px",
                                height: "40px",
                                borderRadius: "100%", // Circular color box
                                border: field.value?.includes(item.id)
                                  ? "2px solid #AEAEAE" // Border when selected
                                  : "none",
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
