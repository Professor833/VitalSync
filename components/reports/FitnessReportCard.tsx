"use client";

import React from 'react';
import DetailedReportCard, { ReportMetric } from './DetailedReportCard';
import { Activity } from 'lucide-react'; // Icon for Fitness Report

const fitnessMetrics: ReportMetric[] = [
  {
    id: 'activeMinutes',
    label: 'Weekly Active Minutes',
    value: '180 mins',
    progress: 72, // (180/250) * 100
    goalText: '72% of your 250 min goal',
  },
  {
    id: 'stepsTaken',
    label: 'Average Daily Steps',
    value: '8,500 steps',
    progress: 85, // (8500/10000) * 100
    description: 'Good activity level',
  },
  {
    id: 'workoutFrequency',
    label: 'Workout Frequency',
    value: '4 times/week',
    progress: 80, // (4/5) * 100
    goalText: 'Goal: 5 times/week',
  },
];

const fitnessChartData = [
  { name: 'Mon', steps: 8000, goal: 10000 },
  { name: 'Tue', steps: 12000, goal: 10000 },
  { name: 'Wed', steps: 7500, goal: 10000 },
  { name: 'Thu', steps: 9000, goal: 10000 },
  { name: 'Fri', steps: 11000, goal: 10000 },
  { name: 'Sat', steps: 6000, goal: 10000 },
  { name: 'Sun', steps: 7000, goal: 10000 },
];

const FitnessReportCard = () => {
  return (
    <DetailedReportCard
      title="Fitness Report"
      icon={Activity}
      metrics={fitnessMetrics}
      chartData={fitnessChartData}
      chartType="bar" // Using bar chart for daily steps
      chartXKey="name"
      chartYKeys={[{ key: 'steps', color: 'hsl(var(--orange-500, var(--primary)))', name: 'Daily Steps' }]}
      viewDetailsLink="/dashboard/fitness-log" // Example link
    />
  );
};

export default FitnessReportCard;
