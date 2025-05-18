import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import HydrationInsightItem, { HydrationInsight } from "@/components/hydration/hydration-insight-item";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ViewAllHydrationInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  insights: HydrationInsight[];
}

// Placeholder data - replace with actual data fetching/generation
const placeholderInsights: HydrationInsight[] = [
  {
    id: 'h_insight_1',
    type: 'tip',
    text: 'Morning Hydration: Drinking water right after waking up helps kickstart your metabolism and rehydrate your body after a night\'s sleep.',
    learnMoreLink: '#'
  },
  {
    id: 'h_insight_2',
    type: 'warning',
    text: 'Afternoon Gap: Many people experience a dip in hydration between 2-4 PM. Try setting a reminder to drink water during this time to maintain energy levels.',
    learnMoreLink: '#'
  },
  {
    id: 'h_insight_3',
    type: 'improvement',
    text: 'Weekly Improvement: Your average daily water intake has increased by 12% compared to last week. Great progress!',
    learnMoreLink: '#'
  },
  {
    id: 'h_insight_4',
    type: 'tip',
    text: 'Hydration Tip: Try infusing your water with fruits or herbs like lemon, cucumber, or mint to make it more enjoyable and increase your intake.',
    learnMoreLink: '#'
  },
   {
    id: 'h_insight_5',
    type: 'warning',
    text: 'Pre-Workout: Remember to hydrate before your workout. Dehydration can significantly impact performance.',
  },
];

export function ViewAllHydrationInsightsModal({
  isOpen,
  onClose,
  insights = placeholderInsights, // Default to placeholder
}: ViewAllHydrationInsightsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>All Hydration Insights</DialogTitle>
          <DialogDescription>
            Helpful tips and observations about your hydration habits.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-3">
          {insights.length > 0 ? (
            <div className="space-y-3 py-2">
              {insights.map((insight) => (
                <HydrationInsightItem key={insight.id} insight={insight} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">
              No hydration insights available at the moment.
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
