"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dummy data - adjust dates and values as needed
const generateDummyData = (key: string, unit: string, numPoints = 30) => {
  return Array.from({ length: numPoints }, (_, i) => ({
    date: `May ${i + 1}`,
    [key]: Math.floor(Math.random() * (unit === 'bpm' ? 40 : 20) + (unit === 'bpm' ? 60 : (unit === 'kg' ? 60 : 110))),
  }));
};

const heartRateData = generateDummyData("Heart Rate", "bpm");
const bloodPressureDataSystolic = generateDummyData("Systolic", "mmHg");
const bloodPressureDataDiastolic = generateDummyData("Diastolic", "mmHg");
const weightData = generateDummyData("Weight", "kg");
const sleepData = Array.from({ length: 30 }, (_, i) => ({
    date: `May ${i + 1}`,
    Sleep: Math.floor(Math.random() * 3 + 6)
}));

// Combine BP data for a single chart if needed, or plot separately
const combinedBloodPressureData = bloodPressureDataSystolic.map((item, i) => ({
  ...item,
  Diastolic: bloodPressureDataDiastolic[i].Diastolic,
}));

export function HealthMetricsTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="heartRate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4">
            <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
            <TabsTrigger value="bloodPressure">Blood Pressure</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
          </TabsList>

          <TabsContent value="heartRate">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={heartRateData}>
                <defs>
                  <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit=" bpm" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Heart Rate" stroke="#ef4444" fillOpacity={1} fill="url(#colorHeartRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="bloodPressure">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={combinedBloodPressureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit=" mmHg" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Systolic" stroke="#3b82f6" strokeWidth={2} name="Systolic" />
                <Line type="monotone" dataKey="Diastolic" stroke="#8b5cf6" strokeWidth={2} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="weight">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weightData}>
                 <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit=" kg" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Weight" stroke="#22c55e" fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="sleep">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sleepData}>
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} unit=" hrs" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Sleep" stroke="#6366f1" fillOpacity={1} fill="url(#colorSleep)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
