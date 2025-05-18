"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MoodLevel } from '@/app/dashboard/mood-journal/data'; // Assuming MoodLevel is exported

interface MoodTrendDataPoint {
  date: string; // e.g., "May 1", "May 2"
  moodScore: number; // e.g., 5 for Great, 1 for Awful
  moodLevel?: MoodLevel; // Optional: to display in tooltip
}

interface MoodTrendsChartProps {
  data: MoodTrendDataPoint[];
  // Optional: mapping from mood level string to score if not done in parent
  moodLevelToScore?: (level: MoodLevel) => number;
}

const moodLevels: MoodLevel[] = ['Awful', 'Bad', 'Neutral', 'Good', 'Great'];
const moodScoreMap: Record<MoodLevel, number> = {
  'Awful': 1,
  'Bad': 2,
  'Neutral': 3,
  'Good': 4,
  'Great': 5,
};

export function MoodTrendsChart({ data }: MoodTrendsChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Not enough mood data to display trends.
      </div>
    );
  }

  // Map mood level strings to corresponding mood level text for Y-axis ticks
  const yAxisTickFormatter = (value: number) => {
    const level = moodLevels[value - 1]; // Assuming scores are 1-5
    return level || '';
  };

  const tooltipFormatter = (value: number, name: string, props: any) => {
    const moodLevel = moodLevels[value - 1] || 'Unknown';
    return [moodLevel, 'Mood']; // e.g., ["Good", "Mood"]
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="date" 
          tickLine={false} 
          axisLine={false} 
          fontSize={12} 
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis 
          tickFormatter={yAxisTickFormatter} 
          domain={[1, 5]} // Assuming mood scores 1 to 5
          ticks={[1, 2, 3, 4, 5]} // Explicitly set ticks for mood levels
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          fontSize={12}
          stroke="hsl(var(--muted-foreground))"
        />
        <Tooltip 
          formatter={tooltipFormatter}
          cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
            boxShadow: '0 4px 12px hsla(var(--foreground), 0.1)'
          }}
          labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold'}}
          itemStyle={{ color: 'hsl(var(--foreground))'}}
        />
        <Legend 
            verticalAlign="top" 
            align="right" 
            iconSize={10}
            wrapperStyle={{ fontSize: '12px', paddingBottom: '10px' }}
            formatter={(value, entry, index) => <span className="text-muted-foreground">{value}</span>}
        />
        <Line 
          type="monotone" 
          dataKey="moodScore" 
          name="Mood Score"
          stroke="hsl(var(--primary))" 
          strokeWidth={2} 
          dot={{
            r: 4,
            fill: 'hsl(var(--primary))',
            stroke: 'hsl(var(--background))',
            strokeWidth: 2,
          }}
          activeDot={{
            r: 6,
            fill: 'hsl(var(--primary))',
            stroke: 'hsl(var(--background))',
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
