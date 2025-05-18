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
import { Textarea } from "@/components/ui/textarea"; // For notes
import { toast } from "sonner";

const formSchema = z.object({
  metricName: z.string().min(2, "Name too short").max(50, "Name too long"),
  value: z.string().min(1, "Value is required"), // Kept as string to be flexible
  unit: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  notes: z.string().optional(),
});

export type CustomMetricFormValues = z.infer<typeof formSchema>;

interface CustomMetricFormProps {
  onSubmit: (data: CustomMetricFormValues) => void;
  defaultValues?: Partial<CustomMetricFormValues>;
}

export function CustomMetricForm({ onSubmit, defaultValues }: CustomMetricFormProps) {
  const form = useForm<CustomMetricFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      ...defaultValues,
    },
  });

  function handleFormSubmit(data: CustomMetricFormValues) {
    console.log("Custom Metric Data:", data);
    toast.success("Custom Metric Added", {
      description: `${data.metricName}: ${data.value} ${data.unit || ''}`.trim(),
    });
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="metricName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metric Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Mood, Energy Level" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Happy, 7, 500ml" {...field} />
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
              <FormLabel>Unit (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., /10, kcal, steps" {...field} />
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
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional details..." {...field} />
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
