"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from 'recharts';

const initialData = [
  { subject: 'Sleep', A: 80, B: 70, fullMark: 100 },
  { subject: 'Stress', A: 60, B: 75, fullMark: 100 },
  { subject: 'Nutrition', A: 75, B: 65, fullMark: 100 },
  { subject: 'Mood', A: 85, B: 80, fullMark: 100 },
  { subject: 'Fitness', A: 70, B: 60, fullMark: 100 },
  { subject: 'Hydration', A: 90, B: 85, fullMark: 100 },
];

const HealthMetricsOverviewChart = () => {
  const [activeView, setActiveView] = useState('Monthly');
  // In a real app, data would change based on activeView
  const data = initialData;

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <CardTitle className="text-xl font-semibold mb-2 sm:mb-0">Health Metrics Overview</CardTitle>
        <div className="flex space-x-1 p-0.5 bg-muted rounded-lg">
          {['Monthly', 'Quarterly', 'Yearly'].map((view) => (
            <Button
              key={view}
              variant={activeView === view ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView(view)}
              className={`px-3 py-1 h-auto text-sm rounded-md ${activeView === view ? 'shadow-sm' : 'hover:bg-accent'}`}
            >
              {view}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
              <Radar name="Current Month" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
              <Radar name="Previous Month" dataKey="B" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.4} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)', 
                  color: 'hsl(var(--popover-foreground))' 
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthMetricsOverviewChart;
