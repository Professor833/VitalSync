"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, Smile, Bed, Zap, Lightbulb } from 'lucide-react'; // Example icons

interface CorrelationItemProps {
  icon: React.ElementType;
  text: string;
  color?: string; 
}

const CorrelationItem: React.FC<CorrelationItemProps> = ({ icon: Icon, text, color = 'text-primary' }) => {
  return (
    <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
      <div className={`p-2 bg-background rounded-full border shadow-sm`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <p className="text-sm text-foreground leading-relaxed">
        {text}
      </p>
    </div>
  );
};

const CorrelationsSection = () => {
  const correlations = [
    {
      id: 'sleep-mood',
      icon: Bed,
      text: 'When your average sleep duration increased by 1+ hour, your reported mood scores improved by an average of 15%.',
      color: 'text-blue-500',
    },
    {
      id: 'activity-stress',
      icon: Zap,
      text: 'Days with 30+ minutes of moderate activity correlated with a 20% reduction in reported stress levels.',
      color: 'text-green-500',
    },
    {
      id: 'hydration-energy',
      icon: Lightbulb,
      text: 'Consistently meeting your hydration goals was associated with a 10% increase in self-reported energy levels throughout the day.',
      color: 'text-sky-500',
    },
    {
      id: 'mood-productivity',
      icon: Smile,
      text: 'Higher mood scores in the morning often led to more tasks completed by the end of the day, suggesting a link to productivity.',
      color: 'text-yellow-500',
    },
  ];

  return (
    <Card className="mt-8 mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Observed Correlations</CardTitle>
        <CardDescription>
          Insights into how your habits and metrics influence each other.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {correlations.map((corr) => (
          <CorrelationItem key={corr.id} icon={corr.icon} text={corr.text} color={corr.color} />
        ))}
      </CardContent>
    </Card>
  );
};

export default CorrelationsSection;
