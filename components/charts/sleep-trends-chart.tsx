"use client";

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data - replace with actual data prop later
const weeklySleepDurationData = [
  { date: "May 6", hours: 7.0 },
  { date: "May 7", hours: 6.5 },
  { date: "May 8", hours: 7.5 },
  { date: "May 9", hours: 7.0 },
  { date: "May 10", hours: 8.0 },
  { date: "May 11", hours: 7.2 },
  { date: "May 12", hours: 8.5 },
];

interface SleepTrendsChartProps {
  // data: any[]; // Will be more specific later
  className?: string;
}

const SleepTrendsChart: React.FC<SleepTrendsChartProps> = ({ className }) => {
  return (
    <Tabs defaultValue="duration" className={className}>
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="duration">Duration</TabsTrigger>
        <TabsTrigger value="quality">Quality</TabsTrigger>
        <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
      </TabsList>
      <TabsContent value="duration">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklySleepDurationData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis unit="h" tickLine={false} axisLine={false} fontSize={12} domain={[0, 'dataMax + 1']} />
            <Tooltip
              cursor={{ fill: 'hsl(var(--accent))' }} 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
            />
            <Bar dataKey="hours" name="Sleep Duration" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="quality">
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          <p>Sleep Quality chart coming soon.</p>
        </div>
      </TabsContent>
      <TabsContent value="efficiency">
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          <p>Sleep Efficiency chart coming soon.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SleepTrendsChart;
