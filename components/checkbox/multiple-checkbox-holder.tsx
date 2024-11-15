"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const FormSchema = z.object({
  items: z.array(z.string()),
});

interface PropertyFeatureCheckboxProps {
  onFormDataChange: (data: string[]) => void; // This is the callback function to pass the form data to the parent
}

export function PropertyFeatureCheckbox({
  onFormDataChange,
}: PropertyFeatureCheckboxProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }
  const handleCheckedChange = (itemId: string, checked: boolean) => {
    const newItems = checked
      ? [...form.getValues("items"), itemId]
      : form.getValues("items").filter((value) => value !== itemId);

    console.log(newItems);
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
            <FormItem className="grid grid-cols-1">
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex space-x-2 w-full h-full"
                      >
                        <FormControl className="mt-[7px]">
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleCheckedChange(
                                item.id,
                                checked ? true : false
                              )
                            }
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
