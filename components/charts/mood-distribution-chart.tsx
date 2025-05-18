"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MoodDistributionDataPoint {
  name: string; // e.g., 'Great', 'Good'
  value: number; // e.g., count or percentage
  color: string; // Hex color code
}

interface MoodDistributionChartProps {
  data: MoodDistributionDataPoint[];
}

export function MoodDistributionChart({ data }: MoodDistributionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        No mood data yet.
      </div>
    );
  }

  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <ResponsiveContainer width="100%" height={150}> 
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={60} 
          innerRadius={35} 
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          strokeWidth={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => {
            const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(0) : 0;
            return [`${value} entries (${percentage}%)`, name];
          }}
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
