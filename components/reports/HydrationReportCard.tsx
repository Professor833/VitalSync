"use client";

import React from 'react';
import DetailedReportCard, { ReportMetric } from './DetailedReportCard';
import { Droplet } from 'lucide-react'; // Icon for Hydration Report

const hydrationMetrics: ReportMetric[] = [
  {
    id: 'avgDailyIntake',
    label: 'Average Daily Intake',
    value: '2.4 L',
    progress: 80,
    goalText: '80% of your 3L goal',
  },
  {
    id: 'consistency',
    label: 'Consistency',
    value: '90%',
    progress: 90,
    description: 'Excellent consistency',
  },
  {
    id: 'morningHydration',
    label: 'Morning Hydration',
    value: '65%',
    progress: 65,
    description: 'Room for improvement',
  },
];

const hydrationChartData = [
  { name: 'Week 1', intake: 2.2, goal: 3 },
  { name: 'Week 2', intake: 2.5, goal: 3 },
  { name: 'Week 3', intake: 2.3, goal: 3 },
  { name: 'Week 4', intake: 2.6, goal: 3 },
];

const HydrationReportCard = () => {
  return (
    <DetailedReportCard
      title="Hydration Report"
      icon={Droplet}
      metrics={hydrationMetrics}
      chartData={hydrationChartData}
      chartType="line"
      chartXKey="name"
      chartYKeys={[{ key: 'intake', color: 'hsl(var(--sky-500, var(--primary)))', name: 'Avg Intake' }]}
      viewDetailsLink="/dashboard/hydration-tracker" // Example link
    />
  );
};

export default HydrationReportCard;
