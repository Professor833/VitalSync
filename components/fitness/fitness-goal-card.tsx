"use client";

import React from 'react';
import { FitnessGoal } from '@/app/dashboard/fitness-log/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react'; // Default icon, specific icons can come from data

interface FitnessGoalCardProps {
  goal: FitnessGoal;
}

export function FitnessGoalCard({ goal }: FitnessGoalCardProps) {
  const progressPercentage = goal.target > 0 ? (goal.currentProgress / goal.target) * 100 : 0;
  const GoalIcon = goal.icon || Target; // Use icon from data or default to Target

  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col h-full">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start gap-3">
          <GoalIcon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <CardTitle className="text-base font-semibold leading-snug">{goal.title}</CardTitle>
            {goal.description && (
              <CardDescription className="text-xs mt-1 leading-tight">{goal.description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-2 flex flex-col flex-grow justify-end">
        <div className="text-sm text-foreground mb-1.5">
          <span>{`${goal.currentProgress} / ${goal.target} ${goal.unit}`}</span>
        </div>
        <Progress value={progressPercentage} className="h-2 w-full mb-1.5" />
        {goal.deadline && (
          <span className={`text-xs ${goal.status === 'achieved' ? 'text-green-600 font-medium' : 'text-muted-foreground'}`}>
            {goal.status === 'achieved' && goal.deadline === 'Achieved!' ? 'Achieved!' : `Due: ${goal.deadline}`}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
