"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger, // No longer needed if modal is fully controlled externally
} from "@/components/ui/dialog";
import { LogSleepForm } from "@/components/forms/log-sleep-form";
import { SleepLogEntry } from '@/lib/types';

export interface LogSleepModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddSleepLog: (newLog: Omit<SleepLogEntry, 'id'>) => void;
}

export const LogSleepModal: React.FC<LogSleepModalProps> = ({ 
  isOpen, 
  onOpenChange, 
  onAddSleepLog 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Your Sleep</DialogTitle>
          <DialogDescription>
            Fill in the details of your sleep session below.
          </DialogDescription>
        </DialogHeader>
        <LogSleepForm 
          // The LogSleepForm will call onAddSleepLog and then its own onSubmitSuccess
          onAddSleepLog={onAddSleepLog} 
          // onSubmitSuccess from the form will handle closing the modal via onOpenChange
          onSubmitSuccess={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};
