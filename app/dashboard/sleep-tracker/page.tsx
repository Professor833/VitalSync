"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Clock, Percent, BedDouble, Sunrise, Zap, Feather, Brain, Eye, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SleepGoalProgressChart from '@/components/charts/sleep-goal-progress-chart';
import SleepTrendsChart from '@/components/charts/sleep-trends-chart';
import { LogSleepModal } from '@/components/modals/log-sleep-modal';
import { SleepLogTable } from '@/components/sleep/sleep-log-table';
import SleepInsightItem from '@/components/sleep/sleep-insight-item';
import { ViewAllSleepInsightsModal, allSleepInsightsData, SleepInsight } from '@/components/modals/view-all-sleep-insights-modal';
import { SleepLogEntry } from '@/lib/types';
import { format, parseISO } from 'date-fns';

const SleepTrackerPage = () => {
  const [isLogSleepModalOpen, setIsLogSleepModalOpen] = useState(false);
  const [isViewAllInsightsModalOpen, setIsViewAllInsightsModalOpen] = useState(false);

  const initialSampleLogs: SleepLogEntry[] = [
    {
      id: '1',
      sleepDate: parseISO('2024-05-12T22:30:00'),
      date: format(parseISO('2024-05-12'), 'MMM dd, yyyy'),
      bedtime: '10:30 PM',
      wakeTime: '06:45 AM',
      totalSleep: '8h 15m',
      quality: 'Good',
      notes: 'Felt well-rested.',
      dreamAnalysis: 'Dreamt of flying over a city, felt very liberating. Maybe it signifies a desire for freedom or a new perspective.'
    },
    {
      id: '2',
      sleepDate: parseISO('2024-05-11T23:00:00'),
      date: format(parseISO('2024-05-11'), 'MMM dd, yyyy'),
      bedtime: '11:00 PM',
      wakeTime: '07:00 AM',
      totalSleep: '8h 0m',
      quality: 'Okay',
      notes: 'Woke up once.',
      dreamAnalysis: 'A recurring dream about being unprepared for an exam. Freud might say this relates to anxiety about a current challenge.'
    },
  ];

  const [sleepLogs, setSleepLogs] = useState<SleepLogEntry[]>(initialSampleLogs);

  const sleepSummaryData = {
    averageSleep: { value: "7.5", unit: "hrs", change: "+0.5 hrs", changeType: "positive" as const },
    sleepQuality: { value: "85", unit: "%", change: "+3%", changeType: "positive" as const },
    bedtime: { value: "11:20 PM", note: "Consistent pattern" },
    wakeTime: { value: "6:50 AM", note: "Consistent pattern" },
    currentSleepToday: 7.5,
    goalSleepToday: 8,
  };

  const sleepStagesData = [
    { name: "Awake", duration: "0h 30m", percentage: "6%", icon: <Zap className="h-5 w-5 text-red-500" />, color: "bg-red-500" },
    { name: "REM", duration: "1h 45m", percentage: "23%", icon: <Brain className="h-5 w-5 text-purple-500" />, color: "bg-purple-500" },
    { name: "Light", duration: "4h 15m", percentage: "57%", icon: <Feather className="h-5 w-5 text-blue-500" />, color: "bg-blue-500" },
    { name: "Deep", duration: "1h 0m", percentage: "14%", icon: <BedDouble className="h-5 w-5 text-indigo-500" />, color: "bg-indigo-500" }, 
  ];

  const initialInsights: SleepInsight[] = allSleepInsightsData.slice(0, 3);

  const handleAddSleepLog = (newLog: Omit<SleepLogEntry, 'id'>) => {
    const entryWithId: SleepLogEntry = {
      ...newLog,
      id: Date.now().toString(),
    };
    setSleepLogs(prevLogs => [entryWithId, ...prevLogs].sort((a, b) => b.sleepDate.getTime() - a.sleepDate.getTime()));
    console.log('New sleep log to add:', entryWithId);
  };

  const handleEditLog = (logId: string) => {
    console.log("Editing log:", logId);
  };

  const handleDeleteLog = (logId: string) => {
    console.log("Deleting log:", logId);
    setSleepLogs(prevLogs => prevLogs.filter(log => log.id !== logId));
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sleep Tracker
          </h1>
          <p className="mt-1 text-md text-muted-foreground">
            Monitor your sleep patterns and improve your rest quality.
          </p>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button onClick={() => setIsLogSleepModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Log Sleep
          </Button>
        </div>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Sleep Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Sleep</CardTitle>
                <BedDouble className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sleepSummaryData.averageSleep.value} <span className="text-xs text-muted-foreground">{sleepSummaryData.averageSleep.unit}</span></div>
                <p className={`text-xs ${sleepSummaryData.averageSleep.changeType === 'positive' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {sleepSummaryData.averageSleep.change} from last week
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sleepSummaryData.sleepQuality.value}{sleepSummaryData.sleepQuality.unit}</div>
                <p className={`text-xs ${sleepSummaryData.sleepQuality.changeType === 'positive' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {sleepSummaryData.sleepQuality.change} from last week
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bedtime</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sleepSummaryData.bedtime.value}</div>
                <p className="text-xs text-muted-foreground">{sleepSummaryData.bedtime.note}</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wake Time</CardTitle>
                <Sunrise className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sleepSummaryData.wakeTime.value}</div>
                <p className="text-xs text-muted-foreground">{sleepSummaryData.wakeTime.note}</p>
              </CardContent>
            </Card>

            <SleepGoalProgressChart 
              currentSleep={sleepSummaryData.currentSleepToday} 
              goalSleep={sleepSummaryData.goalSleepToday} 
              className="md:col-span-2 lg:col-span-1 h-full" 
            />
          </div>
        </section>

        <Card>
          <CardHeader>
            {/* The Tabs component within SleepTrendsChart will provide the title/tabs */}
          </CardHeader>
          <CardContent className="pt-0"> 
            <SleepTrendsChart />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1"> 
            <CardHeader>
              <CardTitle>Sleep Stages</CardTitle>
              <CardDescription>Last Night's Breakdown</CardDescription> 
            </CardHeader>
            <CardContent>
              {sleepStagesData.length > 0 ? (
                <ul className="space-y-3">
                  {sleepStagesData.map((stage) => (
                    <li key={stage.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`mr-3 p-1.5 rounded-full ${stage.color} bg-opacity-20`}>{stage.icon}</span>
                        <div>
                          <span className="font-medium text-sm text-foreground">{stage.name}</span>
                          <p className="text-xs text-muted-foreground">{stage.duration}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm text-foreground">{stage.percentage}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">No sleep stage data available for last night.</p>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2"> 
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sleep Insights</CardTitle>
              <Button variant="link" size="sm" className="text-primary" onClick={() => setIsViewAllInsightsModalOpen(true)}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {initialInsights.length > 0 ? (
                <div className="space-y-1">
                  {initialInsights.map((insight) => (
                    <SleepInsightItem
                      key={insight.id}
                      icon={insight.icon}
                      iconBgClass={insight.iconBgClass}
                      title={insight.title}
                      description={insight.description}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No sleep insights available yet. Keep logging your sleep!</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sleep Log</CardTitle>
            <Button variant="outline" size="sm">Export Data</Button>
          </CardHeader>
          <CardContent>
            <SleepLogTable logs={sleepLogs} onEditLog={handleEditLog} onDeleteLog={handleDeleteLog} />
          </CardContent>
        </Card>
      </div>

      <LogSleepModal 
        isOpen={isLogSleepModalOpen} 
        onOpenChange={setIsLogSleepModalOpen}
        onAddSleepLog={handleAddSleepLog}
      />
      <ViewAllSleepInsightsModal isOpen={isViewAllInsightsModalOpen} onOpenChange={setIsViewAllInsightsModalOpen} />
    </div>
  );
};

export default SleepTrackerPage;
