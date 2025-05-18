"use client";

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MoodLevel, MoodEntry } from '@/app/dashboard/mood-journal/data';
import { toast } from 'sonner'; // Assuming sonner is used for toasts as per project setup

const moodLevels: [MoodLevel, ...MoodLevel[]] = ['Great', 'Good', 'Neutral', 'Bad', 'Awful'];

const logMoodFormSchema = z.object({
  moodLevel: z.enum(moodLevels, { 
    required_error: 'Please select your mood.' 
  }),
  notes: z.string().max(500, 'Notes should not exceed 500 characters.').optional(),
  tags: z.string().optional(), // Simple comma-separated tags for now
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Invalid time format (HH:MM)' }),
});

type LogMoodFormValues = z.infer<typeof logMoodFormSchema>;

interface LogMoodModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onLogMood: (newEntry: Omit<MoodEntry, 'id'>) => void;
}

export function LogMoodModal({ isOpen, onOpenChange, onLogMood }: LogMoodModalProps) {
  const form = useForm<LogMoodFormValues>({
    resolver: zodResolver(logMoodFormSchema),
    defaultValues: {
      moodLevel: 'Neutral',
      notes: '',
      tags: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    },
  });

  function onSubmit(data: LogMoodFormValues) {
    const newEntry: Omit<MoodEntry, 'id'> = {
      date: `${data.date}T${data.time}:00.000Z`, // Combine date and time, ensure ISO format
      moodLevel: data.moodLevel as MoodLevel,
      time: data.time,
      notes: data.notes,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
    };
    onLogMood(newEntry);
    toast.success('Mood logged successfully!');
    onOpenChange(false); // Close modal on success
    form.reset(); // Reset form for next time
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Log Your Mood</DialogTitle>
          <DialogDescription>
            How are you feeling right now? Select your mood and add any details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="moodLevel"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Current Mood</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-2 pt-1"
                  >
                    {moodLevels.map((level) => (
                      <FormItem key={level} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={level} id={`mood-${level}`} />
                        </FormControl>
                        <FormLabel htmlFor={`mood-${level}`} className="font-normal cursor-pointer">
                          {level}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
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
                      placeholder="Any thoughts, feelings, or events worth noting?"
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
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (Optional, comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., work, social, relaxed" {...field} />
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
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => { onOpenChange(false); form.reset(); }}>
                Cancel
              </Button>
              <Button type="submit">Log Mood</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
