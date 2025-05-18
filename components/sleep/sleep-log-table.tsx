"use client";

import React from 'react';
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns'; // Import formatDistanceToNow
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SleepLogEntry } from "@/lib/types"; // Import the new type

// Sample data structure - replace with actual data prop later
// const sampleSleepLogs = [
//   {
//     id: "1",
//     date: "May 12, 2024",
//     bedtime: "10:30 PM",
//     wakeTime: "06:45 AM",
//     totalSleep: "8h 15m",
//     quality: "Good", // Could be a score or enum
//     notes: "Felt well-rested.",
//     dreamAnalysis: "Had a dream about flying."
//   },
//   {
//     id: "2",
//     date: "May 11, 2024",
//     bedtime: "11:00 PM",
//     wakeTime: "07:00 AM",
//     totalSleep: "8h 0m",
//     quality: "Okay",
//     notes: "Woke up once.",
//     dreamAnalysis: "Had a dream about being chased."
//   },
//   {
//     id: "3",
//     date: "May 10, 2024",
//     bedtime: "09:45 PM",
//     wakeTime: "05:30 AM",
//     totalSleep: "7h 45m",
//     quality: "Poor",
//     notes: "Restless night.",
//     dreamAnalysis: "Had a dream about falling."
//   },
// ];

interface SleepLogTableProps {
  logs: SleepLogEntry[]; // Use the imported type
  className?: string;
  onEditLog?: (logId: string) => void; // Optional: Callback for editing
  onDeleteLog?: (logId: string) => void; // Optional: Callback for deleting
}

export function SleepLogTable({ logs, className, onEditLog, onDeleteLog }: SleepLogTableProps) {
  // const logs = sampleSleepLogs; // Use sample data for now

  const getQualityBadgeVariant = (quality?: string) => {
    if (!quality) return 'secondary';
    switch (quality.toLowerCase()) {
      case 'good': return 'success'; // Assuming you have a 'success' variant or will add one
      case 'okay': return 'warning'; // Assuming 'warning' variant
      case 'poor': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Table className={className}>
      <TableCaption>A list of your recent sleep logs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Bedtime</TableHead>
          <TableHead>Wake Time</TableHead>
          <TableHead>Total Sleep</TableHead>
          <TableHead className="w-[100px] md:w-[120px]">Quality</TableHead>
          <TableHead className="w-[150px] md:w-[200px]">Notes</TableHead>
          <TableHead className="w-[150px] md:w-[200px]">Dream Analysis</TableHead>
          <TableHead className="text-right w-[80px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span className="text-sm">{log.date}</span>
                <span className="text-xs text-muted-foreground">
                  {log.sleepDate ? formatDistanceToNow(log.sleepDate, { addSuffix: true }) : ''}
                </span>
              </div>
            </TableCell>
            <TableCell>{log.bedtime}</TableCell>
            <TableCell>{log.wakeTime}</TableCell>
            <TableCell>{log.totalSleep}</TableCell>
            <TableCell>
              {log.quality ? (
                <Badge variant={getQualityBadgeVariant(log.quality) as any}>{log.quality}</Badge>
              ) : (
                <span className="text-muted-foreground text-xs">N/A</span>
              )}
            </TableCell>
            <TableCell className="max-w-[150px] md:max-w-[200px] truncate" title={log.notes || ''}>{log.notes || '-'}</TableCell>
            <TableCell className="max-w-[150px] md:max-w-[200px] truncate" title={log.dreamAnalysis || ''}>
              {log.dreamAnalysis ? 
                (log.dreamAnalysis.length > 50 ? log.dreamAnalysis.substring(0, 50) + '...' : log.dreamAnalysis) 
                : '-'}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEditLog ? onEditLog(log.id) : console.log(`Editing log ${log.id}`)} disabled={!onEditLog}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log(`Viewing details for ${log.id}`)}>Details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600 hover:!text-red-600 focus:!text-red-600"
                    onClick={() => onDeleteLog ? onDeleteLog(log.id) : console.warn(`Delete action not implemented for ${log.id}`)}
                    disabled={!onDeleteLog}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
        {logs.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
              No sleep logs yet. Try adding one!
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default SleepLogTable;
