"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Placeholder, will use Recharts for circular
import { TrendingUp, ArrowDownNarrowWide, Activity, Brain, Coffee } from 'lucide-react'; // Example icons
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Tooltip
} from 'recharts';

interface ScoreCardProps {
  title: string;
  score: number;
  change?: number;
  icon: React.ElementType;
  color: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, change, icon: Icon, color }) => {
  const changeText = change ? (change > 0 ? `+${change}` : `${change}`) + '% from last month' : 'N/A from last month';
  const changeColor = change ? (change > 0 ? 'text-green-500' : 'text-red-500') : 'text-muted-foreground';

  return (
    <Card className="flex-1 min-w-[200px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{score}/100</div>
        <p className={`text-xs ${changeColor}`}>{changeText}</p>
      </CardContent>
    </Card>
  );
};

const HealthScoreSection = () => {
  const overallHealthScore = 82;
  const radialData = [
    {
      name: 'Health Score',
      uv: overallHealthScore,
      fill: 'hsl(var(--primary))', // Use primary color from theme
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side with score cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ScoreCard title="Overall Score" score={overallHealthScore} change={3} icon={Activity} color="blue" />
          <ScoreCard title="Physical Health" score={78} change={5} icon={TrendingUp} color="green" />
          <ScoreCard title="Mental Well-being" score={85} change={2} icon={Brain} color="purple" />
          <ScoreCard title="Lifestyle" score={80} change={-1} icon={Coffee} color="orange" />
        </div>

        {/* Right side with circular progress */}
        <Card className="lg:col-span-1 flex flex-col items-center justify-center p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-foreground">Health Score</h3>
          </div>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="90%"
                data={radialData}
                startAngle={90}
                endAngle={-270}
                barSize={20}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background
                  dataKey="uv"
                  angleAxisId={0}
                  cornerRadius={10}
                />
                {/* <Tooltip /> remove tooltip for cleaner look for now */}
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-4xl font-bold fill-foreground"
                >
                  {overallHealthScore}
                </text>
                <text 
                  x="50%" 
                  y="65%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-sm fill-muted-foreground"
                >
                  out of 100
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-muted-foreground mt-4">
            Your health score is in the &quot;Good&quot; range.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default HealthScoreSection;
