"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ActivityDataPoint {
  name: string; // Day of the week e.g., "Mon"
  workouts?: number;
  calories?: number;
  duration?: number; // in minutes
}

interface ActivityTrendsChartProps {
  data: ActivityDataPoint[];
  dataKey: "workouts" | "calories" | "duration"; // Which metric to display
  fillColor: string;
  barName: string;
}

export function ActivityTrendsChart({ data, dataKey, fillColor, barName }: ActivityTrendsChartProps) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">No activity data to display</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          tickLine={false} 
          axisLine={false} 
          fontSize={12} 
        />
        <YAxis 
          tickLine={false} 
          axisLine={false} 
          fontSize={12} 
          allowDecimals={false} 
          tickMargin={10} 
        />
        <Tooltip
          cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
          contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
          labelStyle={{ fontWeight: 'bold' }}
        />
        {/* <Legend 
          verticalAlign="top" 
          align="right" 
          wrapperStyle={{ paddingBottom: '10px' }}
        /> */}
        <Bar dataKey={dataKey} name={barName} fill={fillColor} radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}
