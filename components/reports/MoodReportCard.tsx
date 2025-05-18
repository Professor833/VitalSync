"use client";

import React from 'react';
import DetailedReportCard, { ReportMetric } from './DetailedReportCard';
import { Smile } from 'lucide-react'; // Icon for Mood Report

const moodMetrics: ReportMetric[] = [
  {
    id: 'avgMoodScore',
    label: 'Average Mood Score',
    value: '7.8 / 10',
    progress: 78,
    description: 'Generally positive mood',
  },
  {
    id: 'stressLevels',
    label: 'Reported Stress Levels',
    value: 'Low',
    progress: 25, // Assuming lower is better, so 100 - 25 = 75% positive progress
    description: 'Low stress reported on average',
  },
  {
    id: 'positiveDays',
    label: 'Positive Mood Days',
    value: '22 / 30 days',
    progress: 73, // (22/30) * 100
    description: 'Majority of days with positive mood',
  },
];

const moodChartData = [
  { name: 'Week 1', mood: 7, stress: 3 },
  { name: 'Week 2', mood: 8, stress: 2 },
  { name: 'Week 3', mood: 7.5, stress: 3 },
  { name: 'Week 4', mood: 8.2, stress: 2 },
];

const MoodReportCard = () => {
  return (
    <DetailedReportCard
      title="Mood Report"
      icon={Smile}
      metrics={moodMetrics}
      chartData={moodChartData}
      chartType="line"
      chartXKey="name"
      chartYKeys={[
        { key: 'mood', color: 'hsl(var(--yellow-500, var(--primary)))', name: 'Avg Mood' },
        // { key: 'stress', color: 'hsl(var(--red-500, #ef4444))', name: 'Stress Level' } // Optional second line
      ]}
      viewDetailsLink="/dashboard/mood-journal" // Example link
    />
  );
};

export default MoodReportCard;
