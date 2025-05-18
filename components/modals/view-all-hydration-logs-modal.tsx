import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import HydrationLogListItem, { HydrationLogEntry } from "@/components/hydration/hydration-log-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ViewAllHydrationLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: HydrationLogEntry[]; // Assuming we pass the full list of logs
}

// Placeholder data for styling - replace with actual data fetching
const placeholderLogs: HydrationLogEntry[] = [
  { id: '1', type: 'Water', amount: 500, time: '7:30 AM' },
  { id: '2', type: 'Coffee', amount: 250, time: '8:15 AM' },
  { id: '3', type: 'Water', amount: 300, time: '10:00 AM' },
  { id: '4', type: 'Tea', amount: 200, time: '11:45 AM' },
  { id: '5', type: 'Water', amount: 500, time: '1:30 PM' },
  { id: '6', type: 'Juice', amount: 350, time: '3:00 PM' },
  { id: '7', type: 'Water', amount: 400, time: '5:00 PM' },
  { id: '8', type: 'Water', amount: 250, time: '7:15 PM' },
];

export function ViewAllHydrationLogsModal({
  isOpen,
  onClose,
  logs = placeholderLogs, // Default to placeholder if no logs passed
}: ViewAllHydrationLogsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>All Hydration Logs</DialogTitle>
          <DialogDescription>
            A complete list of your hydration intake for the selected day.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-3">
          {logs.length > 0 ? (
            <div className="space-y-3 py-2">
              {logs.map((log) => (
                <HydrationLogListItem key={log.id} entry={log} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">
              No hydration logs recorded for this day yet.
            </p>
          )}
        </ScrollArea>
        <DialogClose asChild>
          <Button type="button" variant="outline" className="mt-4 w-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
