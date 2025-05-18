"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon as LucideCalendarIcon, Moon, Sun } from "lucide-react"; // Renamed CalendarIcon to avoid conflict
import { InfoCircledIcon } from "@radix-ui/react-icons"; // Corrected import for InfoCircledIcon

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
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select component and its parts
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SleepLogEntry } from '@/lib/types'; // Import SleepLogEntry

// Zod schema for form validation
const formSchema = z.object({
  sleepDate: z.date({
    required_error: "A date for sleep is required.",
  }),
  bedtime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  wakeTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  notes: z.string().max(500, "Notes must be 500 characters or less").optional(),
  quality: z.enum(['Good', 'Okay', 'Poor']).optional(),
  dreamAnalysis: z.string().max(2000, "Dream analysis must be 2000 characters or less").optional(), // Added dreamAnalysis
});

export type LogSleepFormValues = z.infer<typeof formSchema>;

interface LogSleepFormProps {
  onSubmitSuccess: () => void;
  onAddSleepLog: (newLog: Omit<SleepLogEntry, 'id'>) => void;
  // initialValues?: Partial<LogSleepFormValues>; // For editing existing logs
}

export function LogSleepForm({ onSubmitSuccess, onAddSleepLog }: LogSleepFormProps) {
  const form = useForm<LogSleepFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sleepDate: new Date(), // Default to today
      bedtime: "22:00",
      wakeTime: "06:00",
      notes: "",
      quality: undefined,
      dreamAnalysis: "", // Default dreamAnalysis
    },
  });

  const onSubmit = (data: LogSleepFormValues) => {
    // Calculate total sleep duration
    const bedTimeDate = new Date(data.sleepDate);
    const [bedHours, bedMinutes] = data.bedtime.split(':').map(Number);
    bedTimeDate.setHours(bedHours, bedMinutes, 0, 0);

    const wakeTimeDate = new Date(data.sleepDate); // Assume wake time is on the next day if bedtime is late
    const [wakeHours, wakeMinutes] = data.wakeTime.split(':').map(Number);
    wakeTimeDate.setHours(wakeHours, wakeMinutes, 0, 0);

    // If wake time is earlier than bedtime, assume it's the next day
    if (wakeTimeDate.getTime() <= bedTimeDate.getTime()) {
      wakeTimeDate.setDate(wakeTimeDate.getDate() + 1);
    }

    const durationMs = wakeTimeDate.getTime() - bedTimeDate.getTime();
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const totalSleep = `${durationHours}h ${durationMinutes}m`;

    const newLogData: Omit<SleepLogEntry, 'id'> = {
      sleepDate: data.sleepDate,
      date: format(data.sleepDate, 'MMM dd, yyyy'),
      bedtime: format(bedTimeDate, 'p'), // Format to e.g., 10:00 PM
      wakeTime: format(wakeTimeDate, 'p'), // Format to e.g., 6:00 AM
      totalSleep: totalSleep,
      notes: data.notes,
      quality: data.quality,
      dreamAnalysis: data.dreamAnalysis, // Include dreamAnalysis
    };

    onAddSleepLog(newLogData); // Pass the processed data to the parent
    onSubmitSuccess(); // Call to close modal or give other feedback
    form.reset(); // Reset form for next entry
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sleepDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Sleep Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <LucideCalendarIcon className="ml-auto h-4 w-4 opacity-50" /> {/* Use renamed lucide icon */}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bedtime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedtime</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wakeTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wake Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="quality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sleep Quality (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sleep quality" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Okay">Okay</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>General Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any thoughts on your sleep, factors affecting it, etc."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dreamAnalysis"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Dream Analysis (Optional)
                {/* TODO: Implement a Popover for the info icon */}
                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2 h-5 w-5">
                      <InfoCircledIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 text-sm">
                    <p className="font-semibold mb-1">Freudian Dream Analysis</p>
                    <p className="mb-2">
                      Based on Sigmund Freud's theories, dream analysis involves interpreting dreams 
                      to uncover unconscious desires and thoughts. Common symbols and themes can reveal 
                      insights into your psyche.
                    </p>
                    <a 
                      href="https://www.simplypsychology.org/psychoanalysis.html" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                    >
                      Learn more about Psychoanalysis
                    </a>
                  </PopoverContent>
                </Popover> */}
              </FormLabel>
              <FormDescription className="text-xs">
                Log your dreams and attempt an interpretation based on Freudian psychology. 
                This can be a tool for self-reflection. 
                <a 
                  href="https://www.verywellmind.com/freudian-dream-theory-2795845" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline ml-1"
                >
                  Learn more.
                </a>
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Describe your dream and any symbolic interpretations..."
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-2">Log Sleep</Button>
      </form>
    </Form>
  );
}
