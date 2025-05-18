import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogHydrationForm } from "@/components/forms/log-hydration-form";

interface LogHydrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onLogSubmitted?: (data: any) => void; // Callback for when log is successfully submitted
}

export function LogHydrationModal({ isOpen, onClose }: LogHydrationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Hydration</DialogTitle>
          <DialogDescription>
            Track your fluid intake to stay hydrated and healthy.
          </DialogDescription>
        </DialogHeader>
        <LogHydrationForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
