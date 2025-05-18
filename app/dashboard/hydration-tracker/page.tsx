"use client"; // Required for useState and event handlers

import { useState } from 'react'; // Import useState
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet } from "lucide-react"; 
import { LogHydrationModal } from '@/components/modals/log-hydration-modal';
import HydrationGoalProgressChart from '@/components/charts/hydration-goal-progress-chart'; 
import HydrationTrendsChart from '@/components/charts/hydration-trends-chart'; 
import HydrationLogListItem, { HydrationLogEntry } from '@/components/hydration/hydration-log-list-item'; 
import { ViewAllHydrationLogsModal } from '@/components/modals/view-all-hydration-logs-modal'; 
import HydrationInsightItem, { HydrationInsight } from '@/components/hydration/hydration-insight-item'; 
import { ViewAllHydrationInsightsModal } from '@/components/modals/view-all-hydration-insights-modal'; 
import { HydrationSettingsForm } from '@/components/forms/hydration-settings-form'; // Import Settings Form

// Placeholder data for Today's Log - in a real app, this would come from state/API
const placeholderTodayLogs: HydrationLogEntry[] = [
  { id: 'log1', type: 'Water', amount: 250, time: '9:23 AM' },
  { id: 'log2', type: 'Green Tea', amount: 150, time: '11:15 AM' },
  { id: 'log3', type: 'Water', amount: 500, time: '1:45 PM' },
  { id: 'log4', type: 'Coffee', amount: 200, time: '3:30 PM' },
  { id: 'log5', type: 'Water', amount: 300, time: '5:10 PM' },
];

// Placeholder data for Hydration Insights
const placeholderInsights: HydrationInsight[] = [
  {
    id: 'h_insight_1',
    type: 'tip',
    text: 'Morning Hydration: Drinking water right after waking up helps kickstart your metabolism.',
    learnMoreLink: '#'
  },
  {
    id: 'h_insight_2',
    type: 'warning',
    text: 'Afternoon Gap: Try setting a reminder to drink water between 2-4 PM to avoid an energy slump.',
    learnMoreLink: '#'
  },
  {
    id: 'h_insight_3',
    type: 'improvement',
    text: 'Weekly Improvement: Your average daily water intake has increased by 12% compared to last week. Great progress!',
  },
  {
    id: 'h_insight_4',
    type: 'tip',
    text: 'Flavor Boost: Infuse water with fruits like lemon or cucumber to make it more appealing.',
  },
];

export default function HydrationTrackerPage() {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false); // State for modal visibility
  const [isViewAllLogsModalOpen, setIsViewAllLogsModalOpen] = useState(false); // State for View All Logs modal
  const [isViewAllInsightsModalOpen, setIsViewAllInsightsModalOpen] = useState(false); // State for View All Insights modal

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">Hydration Tracker</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* TODO: Implement Date Selector Dropdown (e.g., ShadCN Popover + Calendar) */}
          <Button variant="outline" className="w-full sm:w-auto">Today</Button> 
          <Button 
            variant="default" 
            className="w-full sm:w-auto"
            onClick={() => setIsLogModalOpen(true)} // Open modal on click
          >
            <Droplet className="mr-2 h-4 w-4" /> Add Water
          </Button>
        </div>
      </div>

      {/* Today's Hydration Overview */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Today&apos;s Hydration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Intake</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.8 L</div>
              <p className="text-xs text-muted-foreground">+20% of daily goal</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Daily Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.0 L</div>
              <p className="text-xs text-muted-foreground">Recommended for you</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2 L</div>
              <p className="text-xs text-muted-foreground">600 ml to go</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Weekly</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 L</div>
              <p className="text-xs text-muted-foreground">+0.2L vs last week</p>
            </CardContent>
          </Card>
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 h-full">
             {/* The image shows this as a larger, distinct card. Let's use the component directly. */}
            <HydrationGoalProgressChart currentIntake={1800} dailyGoal={3000} />
          </div>
        </div>
      </section>

      {/* Hydration Trends */}
      <section>
        <HydrationTrendsChart />
      </section>

      {/* Today's Log */}
      <section className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Today&apos;s Log</h2>
          <Button variant="link" className="pr-0" onClick={() => setIsViewAllLogsModalOpen(true)}>View All</Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            {placeholderTodayLogs.length > 0 ? (
              <div className="space-y-3">
                {placeholderTodayLogs.slice(0, 3).map((log) => ( // Display first 3 logs
                  <HydrationLogListItem key={log.id} entry={log} />
                ))}
                {placeholderTodayLogs.length > 3 && (
                  <p className="pt-2 text-center text-sm text-muted-foreground">
                    + {placeholderTodayLogs.length - 3} more entries...
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hydration logged yet today.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Hydration Insights */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Hydration Insights</h2>
          <Button variant="link" className="pr-0" onClick={() => setIsViewAllInsightsModalOpen(true)}>View Details</Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            {placeholderInsights.length > 0 ? (
              <div className="space-y-3">
                {placeholderInsights.slice(0, 3).map((insight) => ( // Display first 3 insights
                  <HydrationInsightItem key={insight.id} insight={insight} />
                ))}
                {placeholderInsights.length > 3 && (
                  <p className="pt-2 text-center text-sm text-muted-foreground">
                    + {placeholderInsights.length - 3} more insights...
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hydration insights available yet.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Hydration Settings */}
      <section className="lg:col-span-3">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Hydration Settings</h2>
        <Card>
          <CardContent className="pt-6">
            <HydrationSettingsForm />
          </CardContent>
        </Card>
      </section>

      {/* Render the modal */}
      <LogHydrationModal 
        isOpen={isLogModalOpen} 
        onClose={() => setIsLogModalOpen(false)} 
      />
      <ViewAllHydrationLogsModal 
        isOpen={isViewAllLogsModalOpen}
        onClose={() => setIsViewAllLogsModalOpen(false)}
        logs={placeholderTodayLogs} // Pass all logs to the modal
      />
      <ViewAllHydrationInsightsModal 
        isOpen={isViewAllInsightsModalOpen}
        onClose={() => setIsViewAllInsightsModalOpen(false)}
        insights={placeholderInsights} // Pass all insights to the modal
      />
    </div>
  );
}