"use client";

import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

interface HydrationGoalProgressChartProps {
  currentIntake: number; // in ml
  dailyGoal: number; // in ml
}

export default function HydrationGoalProgressChart({
  currentIntake,
  dailyGoal,
}: HydrationGoalProgressChartProps) {
  const percentage = dailyGoal > 0 ? Math.min(Math.round((currentIntake / dailyGoal) * 100), 100) : 0;
  const data = [
    {
      name: 'Goal Progress',
      uv: percentage, // Value for the bar
      fill: '#3b82f6', // Active color (blue)
    },
    // Optional: add a background or unfilled portion if needed by design
    // Recharts RadialBarChart typically fills from 0 to the value on a single bar.
    // For a background, you might add another RadialBar with a lighter color and full value.
  ];

  return (
    <Card className="h-full flex flex-col items-center justify-center p-4">
      <CardContent className="p-0 w-full h-full flex flex-col items-center justify-center">
        <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="70%" // Adjust for thickness of the bar
              outerRadius="100%"
              barSize={20} // Adjust for thickness of the bar
              data={data}
              startAngle={90}
              endAngle={-270} // Full circle
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background
                dataKey="uv"
                angleAxisId={0}
                cornerRadius={10} // Rounded ends for the bar
                // The 'background' prop adds a light gray track under the active bar
                // style={{ fill: '#e5e7eb' }} // For background if not using RadialBar background prop
              />
              {/* Text in the middle */}
              
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-bold text-primary">{percentage}%</span>
            <span className="text-xs text-muted-foreground">of daily goal</span>
          </div>
        </div>
        {/* TODO: Add + / - buttons if needed based on the image (they look like quantity adjusters) */}
        {/* For now, assuming these are separate from the chart component itself */}
      </CardContent>
    </Card>
  );
}
