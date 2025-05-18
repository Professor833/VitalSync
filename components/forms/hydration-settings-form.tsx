"use client";

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
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"; // For time inputs

const beverageTypesToTrack = [
  { id: "water", label: "Water" },
  { id: "coffee", label: "Coffee" },
  { id: "tea", label: "Tea" },
  { id: "juice", label: "Juice" },
  { id: "soda", label: "Soda" },
  { id: "other", label: "Other" },
] as const;

const hydrationSettingsSchema = z.object({
  dailyGoal: z.number().min(500, "Goal must be at least 500ml").max(10000, "Goal can be at most 10,000ml"),
  reminderFrequency: z.string().optional(), // e.g., "Every 2 hours"
  reminderStartTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid start time."}).optional(),
  reminderEndTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid end time."}).optional(),
  beverageTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one beverage type.",
  }),
});

type HydrationSettingsFormValues = z.infer<typeof hydrationSettingsSchema>;

// TODO: Replace with actual user settings if available
const defaultSettings: HydrationSettingsFormValues = {
  dailyGoal: 3000,
  reminderFrequency: "every_2_hours",
  reminderStartTime: "08:00",
  reminderEndTime: "22:00",
  beverageTypes: ["water", "coffee", "tea"],
};

export function HydrationSettingsForm() {
  const form = useForm<HydrationSettingsFormValues>({
    resolver: zodResolver(hydrationSettingsSchema),
    defaultValues: defaultSettings,
  });

  function onSubmit(data: HydrationSettingsFormValues) {
    console.log("Hydration Settings Saved:", data);
    // TODO: Implement actual settings persistence (e.g., API call, local storage)
    toast.success("Settings Saved!", {
      description: "Your hydration preferences have been updated.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dailyGoal"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Daily Water Goal</FormLabel>
                <span className="text-sm text-muted-foreground">
                  {field.value / 1000} L
                </span>
              </div>
              <FormControl>
                <Slider
                  min={500}
                  max={10000}
                  step={100}
                  defaultValue={[field.value]}
                  onValueChange={(value: number[]) => field.onChange(value[0])}
                />
              </FormControl>
              <FormDescription>
                Recommended daily water intake based on your weight and activity level.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="reminderFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reminder Frequency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="every_hour">Every Hour</SelectItem>
                    <SelectItem value="every_2_hours">Every 2 Hours</SelectItem>
                    <SelectItem value="every_3_hours">Every 3 Hours</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reminderStartTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reminder Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reminderEndTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reminder End Time</FormLabel>
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
          name="beverageTypes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Beverage Types to Track</FormLabel>
                <FormDescription>
                  Select the types of beverages you want to include in your tracking.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {beverageTypesToTrack.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="beverageTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item.id])
                                  : field.onChange(
                                      (field.value || []).filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
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
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
