"use client";

import React from 'react';
import { RecentWorkout } from '@/app/dashboard/fitness-log/data';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card'; // Using Card for structure, can be simplified
import {
  Activity,
  Zap, // For calories burned
  CalendarDays,
  Tag,
  Dumbbell, // Default icon
  Footprints, // Replaced Run
  Bike, // Specific for Cycling
  Flame, // Alternative for calories
  // Weight // Removed Weight, will use Dumbbell for strength
} from 'lucide-react';

interface RecentWorkoutListItemProps {
  workout: RecentWorkout;
}

// Helper to get an icon based on workout type (simplified)
const getWorkoutIcon = (workoutType: string) => {
  const lowerType = workoutType.toLowerCase();
  if (lowerType.includes('run') || lowerType.includes('walk')) return <Footprints className="h-8 w-8 text-blue-500" />;
  if (lowerType.includes('strength') || lowerType.includes('gym')) return <Dumbbell className="h-8 w-8 text-yellow-500" />;
  if (lowerType.includes('yoga') || lowerType.includes('stretch')) return <Dumbbell className="h-8 w-8 text-pink-500" />;
  if (lowerType.includes('cycle') || lowerType.includes('bike')) return <Bike className="h-8 w-8 text-green-500" />;
  return <Dumbbell className="h-8 w-8 text-gray-500" />;
};

export function RecentWorkoutListItem({ workout }: RecentWorkoutListItemProps) {
  return (
    <Card className="p-4 flex items-center space-x-4 hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0">
        {workout.icon ? <workout.icon className="h-10 w-10 text-primary" /> : getWorkoutIcon(workout.type)}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg mb-1">{workout.type}</h3>
          <p className="text-xs text-muted-foreground whitespace-nowrap"><CalendarDays className="inline-block mr-1 h-3 w-3" />{workout.date}</p>
        </div>
        <div className="text-sm text-muted-foreground flex items-center space-x-3 mb-2">
          <span><Activity className="inline-block mr-1 h-4 w-4" />{workout.duration}</span>
          <span><Flame className="inline-block mr-1 h-4 w-4" />{workout.caloriesBurned} Cal</span>
        </div>
        {workout.tags && workout.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {workout.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                // Applying Tailwind classes directly for tag colors from data.ts
                className={`text-xs ${tag.color || 'bg-gray-100 text-gray-800'} border-none px-2 py-0.5 rounded-full font-medium`}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
      {/* Optionally add an edit/delete button or a 'View Details' link here */}
      {/* <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button> */}
    </Card>
  );
}
