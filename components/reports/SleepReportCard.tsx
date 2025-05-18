"use client";

import React from 'react';
import DetailedReportCard, { ReportMetric } from './DetailedReportCard';
import { Bed } from 'lucide-react'; // Icon for Sleep Report

const sleepMetrics: ReportMetric[] = [
  {
    id: 'avgSleepDuration',
    label: 'Average Sleep Duration',
    value: '7.5 hrs',
    progress: 75,
    goalText: '75% of your 10hr goal',
  },
  {
    id: 'sleepQuality',
    label: 'Sleep Quality',
    value: '85%',
    progress: 85,
    description: 'Good quality sleep',
  },
  {
    id: 'sleepConsistency',
    label: 'Sleep Consistency',
    value: '70%',
    progress: 70,
    description: 'Bedtime varies by ~45 minutes',
  },
];

const sleepChartData = [
  { name: 'Week 1', sleep: 7, goal: 8 },
  { name: 'Week 2', sleep: 7.5, goal: 8 },
  { name: 'Week 3', sleep: 8, goal: 8 },
  { name: 'Week 4', sleep: 7.2, goal: 8 },
];

const SleepReportCard = () => {
  return (
    <DetailedReportCard
      title="Sleep Report"
      icon={Bed}
      metrics={sleepMetrics}
      chartData={sleepChartData}
      chartType="line"
      chartXKey="name"
      chartYKeys={[{ key: 'sleep', color: 'hsl(var(--primary))', name: 'Avg Sleep' }]}
      viewDetailsLink="/dashboard/sleep-tracker" // Example link
    />
  );
};

export default SleepReportCard;
