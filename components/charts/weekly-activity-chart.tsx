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
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const weeklyStepsData = [
  { name: "Mon", steps: 7500 },
  { name: "Tue", steps: 8200 },
  { name: "Wed", steps: 6800 },
  { name: "Thu", steps: 9100 },
  { name: "Fri", steps: 7800 },
  { name: "Sat", steps: 10500 },
  { name: "Sun", steps: 8800 },
];

const weeklySleepData = [
  { name: "Mon", sleep: 7.0 },
  { name: "Tue", sleep: 6.5 },
  { name: "Wed", sleep: 7.5 },
  { name: "Thu", sleep: 6.0 },
  { name: "Fri", sleep: 7.2 },
  { name: "Sat", sleep: 8.0 },
  { name: "Sun", sleep: 7.1 },
];

const weeklyWaterData = [
  { name: "Mon", water: 1.8 },
  { name: "Tue", water: 2.0 },
  { name: "Wed", water: 1.5 },
  { name: "Thu", water: 2.2 },
  { name: "Fri", water: 1.9 },
  { name: "Sat", water: 2.5 },
  { name: "Sun", water: 2.1 },
];

export function WeeklyActivityChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Track your steps, sleep, and water intake.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="steps" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
          </TabsList>
          <TabsContent value="steps">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyStepsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="steps" stroke="#4A90E2" strokeWidth={2} name="Steps" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="sleep">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySleepData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit=" hrs" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sleep" stroke="#8884d8" strokeWidth={2} name="Sleep (hours)" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="water">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyWaterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit=" L" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="water" stroke="#82ca9d" strokeWidth={2} name="Water (Liters)" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
