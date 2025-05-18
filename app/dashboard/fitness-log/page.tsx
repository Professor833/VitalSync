"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Dumbbell, PlusCircle } from "lucide-react"; // Or another suitable icon for Log Workout
import React, { useState } from "react";
import { LogWorkoutModal } from "@/components/modals/log-workout-modal"; // Added import
import { RecentWorkoutListItem } from "@/components/fitness/recent-workout-list-item"; // Added import
import { WorkoutTypesChart } from "@/components/charts/workout-types-chart"; // Added import
import { ActivityTrendsChart } from "@/components/charts/activity-trends-chart"; // Added import
import { FitnessGoalCard } from "@/components/fitness/fitness-goal-card"; // Added import
import { ExerciseListItem } from "@/components/fitness/exercise-list-item"; // Added import

// TODO: Import necessary components like charts, modals, etc. as they are created.
// Import dummy data for now
import {
  dummyRecentWorkouts,
  dummyFitnessGoals,
  dummyExercises,
  dummyActivityData,
  dummyWorkoutTypesData
} from "./data";

export default function FitnessLogPage() {
  // TODO: Add state for modals (e.g., Log Workout, View All Workouts)
  const [isLogWorkoutModalOpen, setIsLogWorkoutModalOpen] = useState(false);

  // Placeholder handler for when a workout is logged through the modal
  const handleWorkoutLogged = (data: any) => {
    console.log("Workout logged on page:", data);
    // Here you might want to refresh a list of workouts or show a new toast
  };

  // Prepare data for WorkoutTypesChart
  const workoutChartData = dummyWorkoutTypesData.labels.map((label, index) => ({
    name: label,
    value: dummyWorkoutTypesData.datasets[0].data[index],
    color: dummyWorkoutTypesData.datasets[0].backgroundColor[index]
  }));

  // Prepare data for ActivityTrendsChart
  const activityChartData = dummyActivityData.labels.map((label, index) => ({
    name: label,
    workouts: dummyActivityData.datasets[0].data[index]
    // calories: dummyActivityData.datasets[1]?.data[index], // If we add more datasets
    // duration: dummyActivityData.datasets[2]?.data[index],
  }));

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center">
            <Dumbbell className="mr-3 h-7 w-7 text-primary" />
            Fitness Log
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your workouts and monitor your fitness progress.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* TODO: Implement Week Selector Dropdown */}
          <Button variant="outline">This Week</Button>
          <Button onClick={() => setIsLogWorkoutModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Log Workout
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fitness Summary (Section 1) - lg:col-span-3 */}
        <section className="lg:col-span-3">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Fitness Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Placeholder Cards - Will be replaced with WorkoutSummaryCard components */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Workouts This Week</CardDescription>
                <CardTitle className="text-3xl">4</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  +1 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Minutes</CardDescription>
                <CardTitle className="text-3xl">185</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  +20 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Calories Burned</CardDescription>
                <CardTitle className="text-3xl">1,250</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Estimate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Weekly Goal</CardDescription>
                <CardTitle className="text-3xl">80%</CardTitle>
              </CardHeader>
              <CardContent>
                {/* TODO: Add FitnessGoalProgressChart here */}
                <p className="text-center text-sm text-muted-foreground">
                  [Progress Bar Placeholder]
                </p>
                <p className="text-center text-xs mt-1">
                  Progress: 3 of 5 workouts
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Activity Trends (Section 2) - lg:col-span-2 */}
        <section className="lg:col-span-2">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Activity Trends
          </h2>
          <Card>
            <CardContent className="pt-6">
              {/* TODO: Implement ActivityTrendsChart here */}
              {/* TODO: Add Tabs for Workouts, Calories, Duration */}
              <ActivityTrendsChart
                data={activityChartData}
                dataKey="workouts"
                fillColor="hsl(var(--primary))"
                barName="Workouts"
              />
            </CardContent>
          </Card>
        </section>

        {/* Workout Types (Section 4) - lg:col-span-1 */}
        <section className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Workout Types</h2>
            <Button variant="link" className="pr-0">
              View Details
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <WorkoutTypesChart data={workoutChartData} />
            </CardContent>
          </Card>
        </section>

        {/* Recent Workouts (Section 3) - lg:col-span-3 */}
        <section className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Recent Workouts
            </h2>
            <Button variant="link" className="pr-0">
              View All
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              {/* TODO: Implement RecentWorkoutList here */}
              <div className="space-y-4">
                {dummyRecentWorkouts.length > 0
                  ? dummyRecentWorkouts.map(workout =>
                      <RecentWorkoutListItem
                        key={workout.id}
                        workout={workout}
                      />
                    )
                  : <p className="text-sm text-muted-foreground text-center py-4">
                      No recent workouts logged. Start by adding one!
                    </p>}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Fitness Goals (Section 5) - lg:col-span-3 */}
        <section className="lg:col-span-3">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Fitness Goals
          </h2>
          {/* TODO: Implement FitnessGoalList here */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dummyFitnessGoals.length > 0
              ? dummyFitnessGoals.map(goal =>
                  <FitnessGoalCard key={goal.id} goal={goal} />
                )
              : <p className="text-sm text-muted-foreground text-center md:col-span-2 lg:col-span-3 py-4">
                  No fitness goals set. Create one to get started!
                </p>}
          </div>
        </section>

        {/* Exercise Library (Section 6) - lg:col-span-3 */}
        <section className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Exercise Library
            </h2>
            {/* TODO: Implement Search Input */}
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          {/* TODO: Implement ExerciseList here */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dummyExercises.slice(0, 4).map((
              exercise // Displaying first 4 for brevity
            ) => <ExerciseListItem key={exercise.id} exercise={exercise} />)}
            {dummyExercises.length === 0 &&
              <p className="text-sm text-muted-foreground text-center md:col-span-2 lg:col-span-3 xl:col-span-4 py-4">
                Exercise library is empty.
              </p>}
          </div>
        </section>
      </div>

      <LogWorkoutModal
        isOpen={isLogWorkoutModalOpen}
        onClose={() => setIsLogWorkoutModalOpen(false)}
        onWorkoutLogged={handleWorkoutLogged}
      />
    </div>
  );
}
