"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

// TODO: Replace with actual data fetching and processing
const dailyData = [
  { name: 'Mon', intake: 1500 },
  { name: 'Tue', intake: 2200 },
  { name: 'Wed', intake: 1800 },
  { name: 'Thu', intake: 2500 },
  { name: 'Fri', intake: 2000 },
  { name: 'Sat', intake: 2800 },
  { name: 'Sun', intake: 1900 },
];

const weeklyData = [
  { name: 'Week 1', intake: 14000 },
  { name: 'Week 2', intake: 15500 },
  { name: 'Week 3', intake: 13000 },
  { name: 'Week 4', intake: 16000 },
];

const monthlyData = [
  { name: 'Jan', intake: 60000 },
  { name: 'Feb', intake: 55000 },
  { name: 'Mar', intake: 62000 },
  { name: 'Apr', intake: 58000 },
  // Add more months as needed
];

const chartDataMap = {
  daily: dailyData,
  weekly: weeklyData,
  monthly: monthlyData,
};

interface ChartDataItem {
  name: string;
  intake: number;
}

interface HydrationBarChartProps {
  data: ChartDataItem[];
}

const HydrationBarChart = ({ data }: HydrationBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}L`} />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', borderColor: '#cccccc' }}
          cursor={{ fill: 'transparent' }}
        />
        <Legend iconType="circle" />
        <Bar dataKey="intake" fill="#3b82f6" name="Water Intake (ml)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default function HydrationTrendsChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Hydration Trends</CardTitle>
        {/* Tabs will be here, controlled from parent or local state */}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:w-[240px] ml-auto mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <HydrationBarChart data={chartDataMap.daily} />
          </TabsContent>
          <TabsContent value="weekly">
            <HydrationBarChart data={chartDataMap.weekly} />
          </TabsContent>
          <TabsContent value="monthly">
            <HydrationBarChart data={chartDataMap.monthly} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
