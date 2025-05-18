"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const workoutFormSchema = z.object({
  workoutName: z.string().min(2, { message: 'Workout name must be at least 2 characters.' }),
  date: z.date({
    required_error: 'Workout date is required.',
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Invalid time format (HH:MM).' }), // HH:MM format
  durationHours: z.coerce.number().min(0).optional(),
  durationMinutes: z.coerce.number().min(0).max(59).optional(),
  caloriesBurned: z.coerce.number().min(0).optional(),
  intensity: z.enum(["low", "medium", "high"]).optional(),
  notes: z.string().max(500, { message: 'Notes cannot exceed 500 characters.' }).optional(),
});

export type WorkoutFormData = z.infer<typeof workoutFormSchema>;

interface LogWorkoutFormProps {
  onSubmit: (data: WorkoutFormData) => void;
  onClose?: () => void; // Optional: for closing a modal, for example
  initialData?: Partial<WorkoutFormData>;
}

export function LogWorkoutForm({ onSubmit, onClose, initialData }: LogWorkoutFormProps) {
  const form = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      workoutName: initialData?.workoutName || '',
      date: initialData?.date || new Date(),
      time: initialData?.time || format(new Date(), 'HH:mm'),
      durationHours: initialData?.durationHours || 0,
      durationMinutes: initialData?.durationMinutes || 30,
      caloriesBurned: initialData?.caloriesBurned || undefined,
      intensity: initialData?.intensity || "medium",
      notes: initialData?.notes || '',
    },
  });

  function handleFormSubmit(data: WorkoutFormData) {
    console.log('Workout log submitted:', data);
    // TODO: Implement actual submission logic (e.g., API call)
    toast.success('Workout logged successfully!');
    onSubmit(data);
    if (onClose) onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="workoutName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Name/Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Morning Run, Chest Day" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                  <div className="relative">
                    <Input type="time" {...field} className="pr-8" />
                    <ClockIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormLabel>Duration</FormLabel>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="durationHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">Hours</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">Minutes</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="caloriesBurned"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories Burned (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 300" {...field} onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
              <FormDescription>Estimated calories burned during the workout.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="intensity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intensity (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select intensity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
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
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any details about your workout, how you felt, etc."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-2">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type="submit">Log Workout</Button>
        </div>
      </form>
    </Form>
  );
}
