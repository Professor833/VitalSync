"use client";

import React from 'react';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SleepGoalProgressChartProps {
  currentSleep: number;
  goalSleep: number;
  className?: string;
}

const SleepGoalProgressChart: React.FC<SleepGoalProgressChartProps> = ({ 
  currentSleep,
  goalSleep,
  className 
}) => {
  const percentage = Math.min(Math.round((currentSleep / goalSleep) * 100), 100);
  const data = [
    {
      name: 'Sleep',
      uv: currentSleep,
      pv: goalSleep,
      fill: 'hsl(var(--primary))', // Use primary color from theme
      percentage: percentage,
    },
  ];

  return (
    <Card className={className}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm font-medium text-center">Total Sleep</CardTitle>
      </CardHeader>
      <CardContent className="pb-0 flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            barSize={12}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, goalSleep]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="uv"
              angleAxisId={0}
              // fill will be taken from data item
              cornerRadius={10}
            />
            {/* Text in the center */}
            <text 
              x="50%" 
              y="45%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="text-3xl font-bold fill-foreground"
            >
              {currentSleep.toFixed(1)}
            </text>
            <text 
              x="50%" 
              y="58%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="text-sm fill-muted-foreground"
            >
              Hours
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
        <p className="text-xs text-center text-muted-foreground mt-[-20px] pb-4">
          Your sleep goal is {goalSleep} hours per night.
        </p>
      </CardContent>
    </Card>
  );
};

export default SleepGoalProgressChart;
