"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"; // For potentially long lists of insights
import SleepInsightItem from "@/components/sleep/sleep-insight-item";
import { CheckCircle, AlertTriangle, Info, Zap, Brain, Feather, BedDouble } from 'lucide-react'; // Icons for insights

export interface SleepInsight {
  id: string;
  icon: React.ReactNode;
  iconBgClass: string;
  title: string;
  description: string;
  learnMoreUrl?: string;
}

// Sample full list of insights - this could come from a config or API later
export const allSleepInsightsData: SleepInsight[] = [
  {
    id: 'consistent-schedule',
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    iconBgClass: 'bg-green-100 dark:bg-green-900',
    title: "Consistent Sleep Schedule",
    description: "Your bedtime has been consistent within 30 minutes for the past week, which helps regulate your circadian rhythm.",
    learnMoreUrl: "https://www.sleepfoundation.org/sleep-hygiene/circadian-rhythm"
  },
  {
    id: 'deep-sleep-opportunity',
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    iconBgClass: 'bg-yellow-100 dark:bg-yellow-900',
    title: "Deep Sleep Opportunity",
    description: "Your deep sleep percentage (e.g., 18%) is slightly below the recommended range (20-25%). Consider limiting screen time before bed.",
    learnMoreUrl: "https://www.sleepfoundation.org/stages-of-sleep/deep-sleep"
  },
  {
    id: 'sleep-efficiency',
    icon: <Info className="h-5 w-5 text-blue-500" />,
    iconBgClass: 'bg-blue-100 dark:bg-blue-900',
    title: "Sleep Efficiency",
    description: "Your sleep efficiency is 93%, which is excellent. You're spending most of your time in bed actually sleeping.",
    learnMoreUrl: "https://www.sleepfoundation.org/sleep-hygiene/sleep-efficiency"
  },
  {
    id: 'rem-sleep-balance',
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    iconBgClass: 'bg-purple-100 dark:bg-purple-900',
    title: "REM Sleep Balance",
    description: "You're getting a healthy amount of REM sleep, crucial for cognitive functions like memory consolidation and emotional regulation.",
    learnMoreUrl: "https://www.sleepfoundation.org/stages-of-sleep/rem-sleep"
  },
  {
    id: 'light-sleep-duration',
    icon: <Feather className="h-5 w-5 text-sky-500" />,
    iconBgClass: 'bg-sky-100 dark:bg-sky-900',
    title: "Light Sleep Duration",
    description: "The majority of your sleep is light sleep, which is normal. It plays a key role in memory processing and physical restoration.",
    learnMoreUrl: "https://www.sleepfoundation.org/stages-of-sleep/light-sleep"
  },
  {
    id: 'awakenings',
    icon: <Zap className="h-5 w-5 text-orange-500" />,
    iconBgClass: 'bg-orange-100 dark:bg-orange-900',
    title: "Minimize Awakenings",
    description: "You experienced a few awakenings last night. Try to create a more peaceful sleep environment to minimize disruptions.",
    learnMoreUrl: "https://www.sleepfoundation.org/sleep-disorders/insomnia/reduce-nighttime-awakenings"
  },
];

interface ViewAllSleepInsightsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const ViewAllSleepInsightsModal: React.FC<ViewAllSleepInsightsModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>All Sleep Insights</DialogTitle>
          <DialogDescription>
            Explore detailed insights about your sleep patterns and habits.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-2 py-4">
            {allSleepInsightsData.map((insight) => (
              <SleepInsightItem
                key={insight.id}
                icon={insight.icon}
                iconBgClass={insight.iconBgClass}
                title={insight.title}
                description={insight.description}
                learnMoreUrl={insight.learnMoreUrl}
              />
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
