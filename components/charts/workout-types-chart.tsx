"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface WorkoutTypeDataPoint {
  name: string;
  value: number;
  color: string;
}

interface WorkoutTypesChartProps {
  data: WorkoutTypeDataPoint[];
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent * 100 < 5) return null; // Don't render label if too small

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export function WorkoutTypesChart({ data }: WorkoutTypesChartProps) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">No data to display</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          // label={renderCustomizedLabel} // Using default labels or legend
          outerRadius={100}
          innerRadius={60} // This makes it a donut chart
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number, name: string, props) => [`${value}%`, name]}
        />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center" 
          wrapperStyle={{ paddingTop: '20px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
