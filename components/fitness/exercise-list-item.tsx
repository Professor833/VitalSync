"use client";

import React from 'react';
import { Exercise, WorkoutType } from '@/app/dashboard/fitness-log/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Zap, Info, ChevronRight } from 'lucide-react'; // Example icons

interface ExerciseListItemProps {
  exercise: Exercise;
  onSelect?: (exercise: Exercise) => void; // Optional: for adding to a workout plan
}

const getWorkoutTypeColor = (type: WorkoutType | string): string => {
  switch (type) {
    case 'Cardio': return 'bg-blue-100 text-blue-700';
    case 'Strength': return 'bg-red-100 text-red-700';
    case 'Flexibility': return 'bg-green-100 text-green-700';
    case 'Core': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export function ExerciseListItem({ exercise, onSelect }: ExerciseListItemProps) {
  const ExerciseIcon = exercise.icon || Dumbbell;

  return (
    <Card 
      className={`hover:shadow-lg transition-shadow ${onSelect ? 'cursor-pointer' : ''}`}
      onClick={() => onSelect?.(exercise)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ExerciseIcon className="h-7 w-7 text-primary" />
            <CardTitle className="text-md font-semibold">{exercise.name}</CardTitle>
          </div>
          {onSelect && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground pb-3">
        {exercise.description && <p className="mb-2 text-xs leading-snug">{exercise.description}</p>}
        <div className="flex items-center gap-2 mb-1">
          <Zap className="h-4 w-4 text-orange-500" /> 
          <span>Avg. Calories: {exercise.caloriesPerSet || exercise.caloriesPerMinute || 'N/A'}</span>
        </div>
        {exercise.muscleGroups && exercise.muscleGroups.length > 0 && (
          <div className="mb-1">
            <span className="font-medium text-xs">Muscles:</span> {exercise.muscleGroups.join(', ')}
          </div>
        )}
        {exercise.equipment && <p className="text-xs"><span className="font-medium">Equipment:</span> {exercise.equipment}</p>}
      </CardContent>
      {exercise.type && exercise.type.length > 0 && (
        <CardFooter className="pt-0 pb-3">
          <div className="flex flex-wrap gap-1.5">
            {exercise.type.map((t, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className={`text-xs border-none px-2 py-0.5 rounded-full ${getWorkoutTypeColor(t)}`}
              >
                {t}
              </Badge>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
