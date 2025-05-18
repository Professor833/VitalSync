"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Smile, PlusCircle, CalendarDays, BarChart, Lightbulb, ListChecks } from 'lucide-react'; // Icons

// Import specific components
import { MoodDistributionChart } from '@/components/charts/mood-distribution-chart';
import { MoodTrendsChart } from '@/components/charts/mood-trends-chart';
import MoodFactorListItem from '@/components/mood/mood-factor-list-item';
import MoodInsightCard from '@/components/mood/mood-insight-card';
import MoodCalendar from '@/components/mood/mood-calendar'; 
import { LogMoodModal } from '@/components/modals/log-mood-modal'; 

// Import dummy data (will be replaced with state/API data)
import {
  dummyMoodEntries,
  dummyMoodDistributionData,
  dummyMoodTrendsData,
  dummyMoodFactors, 
  dummyMoodInsights, 
  MoodLevel, 
  MoodEntry, 
} from './data';

// Helper component to delay rendering until client-side to avoid hydration mismatch
const ClientOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ children, fallback = null }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};

export default function MoodJournalPage() {
  // State for Log Mood Modal
  const [isLogMoodModalOpen, setIsLogMoodModalOpen] = useState(false);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(dummyMoodEntries);

  const handleMoodLogged = (newEntryData: Omit<MoodEntry, 'id'>) => {
    const newEntry: MoodEntry = {
      ...newEntryData,
      id: `mood-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setMoodEntries(prevEntries => [newEntry, ...prevEntries]);
    console.log('New mood logged:', newEntry);
  };

  const moodDistributionChartData = dummyMoodDistributionData.labels.map((label, index) => {
    const count = moodEntries.filter(entry => entry.moodLevel === label).length;
    return {
      name: label as MoodLevel,
      value: count > 0 ? count : 0, // Ensure value is at least 0 for chart
      color: dummyMoodDistributionData.datasets[0].backgroundColor[index],
    };
  });

  const moodTrendsChartDataSource = dummyMoodTrendsData.datasets[0].data.map((score, index) => ({
    date: dummyMoodTrendsData.labels[index],
    moodScore: score
  }));

  const today = new Date().toISOString().split('T')[0];
  const todaysEntry = moodEntries.find(entry => entry.date.startsWith(today));
  const todaysMood: MoodLevel = todaysEntry ? todaysEntry.moodLevel : 'Neutral'; // Restore todaysMood
  const todaysTime: string = todaysEntry ? todaysEntry.time : "-";

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page Header: Title and Log Mood Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Mood Journal <Smile className="inline-block h-7 w-7 text-primary ml-2" />
        </h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsLogMoodModalOpen(true)} className="flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            Log Mood
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Mood Summary Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Mood Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Stat Cards Area */}
            <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-sm font-medium">Today&apos;s Mood</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${todaysMood === 'Great' || todaysMood === 'Good' ? 'text-green-600' : todaysMood === 'Bad' || todaysMood === 'Awful' ? 'text-red-600' : 'text-sky-600'}`}>{todaysMood}</p>
                  <p className="text-xs text-muted-foreground">Logged at {todaysTime}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-sm font-medium">Weekly Average</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">Good</p> {/* Placeholder */}
                  <p className="text-xs text-muted-foreground">Improved from last week</p> {/* Placeholder */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-sm font-medium">Mood Entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{moodEntries.length}</p> {/* Dynamic count */}
                  <p className="text-xs text-muted-foreground">This month</p> {/* Placeholder for actual month logic */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-sm font-medium">Streak</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">7 days</p> {/* Placeholder */}
                  <p className="text-xs text-muted-foreground">Keep it up!</p> {/* Placeholder */}
                </CardContent>
              </Card>
            </div>

            {/* Mood Distribution Chart Area */}
            <div className="md:col-span-1 lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-center">Your mood distribution</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground text-center">for the past 30 days</CardDescription> {/* Placeholder text */}
                </CardHeader>
                <CardContent className="flex justify-center items-center h-[150px] sm:h-[120px] pb-4">
                  <MoodDistributionChart data={moodDistributionChartData} />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mood Trends Section */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Mood Trends</CardTitle>
              </div>
              <CardDescription>Your mood fluctuation over the selected period.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px] flex justify-center items-center rounded-md">
                <MoodTrendsChart data={moodTrendsChartDataSource} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Row for Mood Factors & Recent Journal Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mood Factors Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
                <ListChecks className="w-6 h-6 mr-2 text-primary" /> Mood Factors
              </h2>
              <Button variant="link" className="pr-0 text-sm">View All</Button>
            </div>
            <Card>
              <CardContent className="pt-6 space-y-3">
                {dummyMoodFactors.slice(0, 4).map(factor => (
                  <MoodFactorListItem key={factor.id} factor={factor} />
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Recent Journal Entries Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold">Recent Journal Entries</h2>
              <Button variant="link" className="pr-0 text-sm">View All</Button>
            </div>
            <Card>
              <CardContent className="pt-6 space-y-4">
                {moodEntries.length > 0 ? moodEntries.slice(0, 3).map(entry => (
                  <div key={entry.id} className="p-4 border bg-muted/20 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <p className={`font-semibold text-md ${entry.moodLevel === 'Great' || entry.moodLevel === 'Good' ? 'text-green-600' : entry.moodLevel === 'Bad' || entry.moodLevel === 'Awful' ? 'text-red-600' : 'text-sky-600'}`}>{entry.moodLevel}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {entry.time}
                      </p>
                    </div>
                    <p className="text-sm text-foreground/80 line-clamp-2 mb-2">{entry.notes || 'No specific notes.'}</p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-xs bg-primary/10 text-primary-foreground rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No journal entries yet. Log your mood to get started!</p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Mood Calendar Section */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                  <CardTitle className="text-xl sm:text-2xl font-semibold flex items-center">
                      <CalendarDays className="w-6 h-6 mr-2 text-primary" /> Mood Calendar
                  </CardTitle>
                  {/* Placeholder for month navigation */}
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <ClientOnly fallback={<div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading Calendar...</div>}>
                <MoodCalendar moodEntries={moodEntries} />
              </ClientOnly>
            </CardContent>
          </Card>
        </section>

        {/* Mood Insights Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-primary" /> Mood Insights
            </h2>
            <Button variant="link" className="pr-0 text-sm">View All</Button>
          </div>
          <div className="space-y-3">
            {dummyMoodInsights.length > 0 ? dummyMoodInsights.slice(0, 3).map(insight => (
              <MoodInsightCard key={insight.id} insight={insight} />
            )) : (
              <Card><CardContent className="pt-6 text-sm text-muted-foreground text-center">No insights available yet.</CardContent></Card>
            )}
          </div>
        </section>
      </div>

      {/* Log Mood Modal */}
      <LogMoodModal 
        isOpen={isLogMoodModalOpen} 
        onOpenChange={setIsLogMoodModalOpen} 
        onLogMood={handleMoodLogged} 
      />
    </div>
  );
}