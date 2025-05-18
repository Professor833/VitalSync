"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // For unit selection
import { toast } from "sonner";

const formSchema = z.object({
  weight: z.coerce.number().min(1, "Too low").max(500, "Too high"),
  unit: z.enum(["kg", "lbs"]), // Kept as non-optional
  date: z.string().optional(),
  time: z.string().optional(),
});

export type WeightFormValues = z.infer<typeof formSchema>;

interface WeightFormProps {
  onSubmit: (data: WeightFormValues) => void;
  defaultValues?: Partial<WeightFormValues>;
}

export function WeightForm({ onSubmit, defaultValues }: WeightFormProps) {
  const form = useForm<WeightFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: undefined, // Or a specific default e.g., 0, if appropriate
      unit: "kg", // Default unit
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      ...defaultValues, // User-provided defaults can override
    },
  });

  function handleFormSubmit(data: WeightFormValues) {
    console.log("Weight Data:", data);
    toast.success("Weight Added", {
      description: `${data.weight} ${data.unit}`,
    });
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 70" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="kg">kg (kilograms)</SelectItem>
                  <SelectItem value="lbs">lbs (pounds)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Measurement</Button>
      </form>
    </Form>
  );
}
