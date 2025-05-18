"use client";

import * as React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // For "View Details"

const healthMetricsDataCurrentWeek = [
  { subject: "Sleep", A: 80, fullMark: 100 },
  { subject: "Hydration", A: 70, fullMark: 100 },
  { subject: "Exercise", A: 65, fullMark: 100 },
  { subject: "Nutrition", A: 75, fullMark: 100 },
  { subject: "Mood", A: 85, fullMark: 100 },
  { subject: "Stress", A: 60, fullMark: 100 }, // Assuming lower is better for Stress, this might need a reverse scale logic or different interpretation
];

const healthMetricsDataPreviousWeek = [
  { subject: "Sleep", A: 75, fullMark: 100 },
  { subject: "Hydration", A: 65, fullMark: 100 },
  { subject: "Exercise", A: 70, fullMark: 100 },
  { subject: "Nutrition", A: 70, fullMark: 100 },
  { subject: "Mood", A: 80, fullMark: 100 },
  { subject: "Stress", A: 65, fullMark: 100 }, 
];

export function HealthMetricsChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Health Metrics</CardTitle>
          <CardDescription>Overview of your key health indicators.</CardDescription>
        </div>
        <Button variant="link" size="sm" className="text-sm">View Details</Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={healthMetricsDataCurrentWeek}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Current Week"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            {/* Data for previous week can be added here if design requires overlay */}
            {/* For simplicity, current week only is shown as per the dominant visual */}
            {/* To show previous week as well, you would add another <Radar> component with dataKey from a combined dataset */}
            {/* Example: <Radar name="Previous Week" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
