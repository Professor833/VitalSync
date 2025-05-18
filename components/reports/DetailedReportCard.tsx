"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export interface ReportMetric {
  id: string;
  label: string;
  value: string;
  progress?: number; // Optional progress percentage (0-100)
  goalText?: string; // e.g., "75% of your 10hr goal"
  description?: string; // e.g., "Good quality sleep"
}

export interface DetailedReportCardProps {
  title: string;
  icon?: React.ElementType;
  metrics: ReportMetric[];
  chartData: any[]; // Data for the chart
  chartType: 'line' | 'bar';
  chartXKey: string; // Key for X-axis data (e.g., 'name' for week1, week2)
  chartYKeys: { key: string; color: string; name?: string }[]; // Keys for Y-axis data and their colors
  viewDetailsLink?: string;
}

const DetailedReportCard: React.FC<DetailedReportCardProps> = ({
  title,
  icon: Icon,
  metrics,
  chartData,
  chartType,
  chartXKey,
  chartYKeys,
  viewDetailsLink = '#',
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="h-6 w-6 text-primary" />}
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
        </div>
        <Link href={viewDetailsLink} className="text-sm text-primary hover:underline flex items-center">
          View Details <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-foreground">{metric.label}</span>
                <span className="text-sm font-semibold text-foreground">{metric.value}</span>
              </div>
              {metric.progress !== undefined && (
                <Progress value={metric.progress} aria-label={`${metric.label} progress`} className="h-2" />
              )}
              {(metric.goalText || metric.description) && (
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.goalText || metric.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            {chartType === 'line' ? (
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey={chartXKey} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--popover-foreground))' 
                  }}
                />
                {chartYKeys.map(item => (
                  <Line key={item.key} type="monotone" dataKey={item.key} stroke={item.color} strokeWidth={2} dot={{ r: 4, fill: item.color }} activeDot={{ r: 6 }} name={item.name} />
                ))}
              </LineChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey={chartXKey} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--popover-foreground))'
                   }}
                />
                {chartYKeys.map(item => (
                  <Bar key={item.key} dataKey={item.key} fill={item.color} name={item.name} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedReportCard;
