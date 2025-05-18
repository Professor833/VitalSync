"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { LogWorkoutForm, WorkoutFormData } from '@/components/forms/log-workout-form';
import { Button } from '@/components/ui/button';

interface LogWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWorkoutLogged?: (data: WorkoutFormData) => void; // Callback after successful logging
  initialData?: Partial<WorkoutFormData>; // For editing existing log, if needed later
}

export function LogWorkoutModal({
  isOpen,
  onClose,
  onWorkoutLogged,
  initialData,
}: LogWorkoutModalProps) {
  const handleSubmit = (data: WorkoutFormData) => {
    // Here you would typically handle the data submission, e.g., API call
    console.log('Workout data from modal:', data);
    if (onWorkoutLogged) {
      onWorkoutLogged(data);
    }
    // The form itself calls toast and onClose upon its own successful submission
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Log New Workout</DialogTitle>
          <DialogDescription>
            Fill in the details of your workout session below.
          </DialogDescription>
        </DialogHeader>
        <LogWorkoutForm 
          onSubmit={handleSubmit} 
          onClose={onClose} 
          initialData={initialData} 
        />
        {/* Footer can be removed if buttons are handled entirely within the form */}
        {/* <DialogFooter className="sm:justify-start">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
