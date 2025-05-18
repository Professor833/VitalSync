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
import { toast } from "sonner"; // Import from sonner

const formSchema = z.object({
  systolic: z.coerce.number().min(50, "Too low").max(300, "Too high"),
  diastolic: z.coerce.number().min(30, "Too low").max(200, "Too high"),
  date: z.string().optional(), // Consider using a date picker later
  time: z.string().optional(), // Consider using a time picker later
});

export type BloodPressureFormValues = z.infer<typeof formSchema>;

interface BloodPressureFormProps {
  onSubmit: (data: BloodPressureFormValues) => void;
  defaultValues?: Partial<BloodPressureFormValues>;
}

export function BloodPressureForm({ onSubmit, defaultValues }: BloodPressureFormProps) {
  const form = useForm<BloodPressureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0], // Default to today
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }), // Default to current time
      ...defaultValues,
    },
  });

  function handleFormSubmit(data: BloodPressureFormValues) {
    console.log("Blood Pressure Data:", data);
    toast.success("Blood Pressure Added", {
      description: `Systolic: ${data.systolic}, Diastolic: ${data.diastolic}`,
    });
    onSubmit(data);
    // Potentially close the dialog here if passed a close function
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="systolic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Systolic (mmHg)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 120" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="diastolic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diastolic (mmHg)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 80" {...field} />
              </FormControl>
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
