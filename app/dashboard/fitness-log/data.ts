export type WorkoutType = "Cardio" | "Strength" | "Flexibility" | "Core" | "Other";

export interface RecentWorkout {
  id: string;
  type: string; // e.g., "Morning Run", "Strength Training"
  icon?: React.ElementType; // For a specific icon like Running, WeightLifting
  duration: string; // e.g., "30 min", "1 hr 15 min"
  caloriesBurned: number;
  intensity?: 'Low' | 'Medium' | 'High';
  notes?: string;
  tags?: { name: string; color?: string }[]; // e.g., 'Outdoor', 'Strength', 'HIIT'
  date: string; // e.g., "Today", "Yesterday", "2 days ago"
}

export type GoalStatus = 'on-track' | 'achieved' | 'at-risk' | 'off-track';

export interface FitnessGoal {
  id: string;
  title: string;
  description?: string;
  currentProgress: number;
  target: number;
  unit: string; // e.g., 'workouts', 'km', 'minutes', 'kg'
  status: GoalStatus;
  deadline?: string; // e.g., '2024-12-31'
  icon?: React.ElementType; // e.g., Target, Dumbbell from lucide-react
}

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  type: WorkoutType[]; // e.g., ['Strength', 'Core']
  muscleGroups?: string[]; // e.g., ['Chest', 'Triceps']
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl?: string; // Link to an instructional video
  icon?: React.ElementType; // Optional: Specific icon for the exercise
  caloriesPerSet?: number; // For strength exercises
  caloriesPerMinute?: number; // For cardio/duration-based exercises
  equipment?: string; // e.g., 'Dumbbells', 'None', 'Resistance Bands'
}

export const dummyRecentWorkouts: RecentWorkout[] = [
  {
    id: "1",
    type: "Morning Run",
    duration: "32 min",
    caloriesBurned: 320,
    date: "Today",
    tags: [{ name: "Cardio", color: "bg-blue-500"}, { name: "Outdoor", color: "bg-green-500"}]
  },
  {
    id: "2",
    type: "Strength Training",
    duration: "45 min",
    caloriesBurned: 280,
    date: "Yesterday",
    tags: [{ name: "Strength", color: "bg-yellow-500"}, { name: "Gym", color: "bg-purple-500"}]
  },
  {
    id: "3",
    type: "Yoga Session",
    duration: "30 min",
    caloriesBurned: 150,
    date: "2 days ago",
    tags: [{ name: "Flexibility", color: "bg-pink-500"}, { name: "Home", color: "bg-indigo-500"}]
  },
  {
    id: "4",
    type: "Evening Walk",
    duration: "40 min",
    caloriesBurned: 180,
    date: "3 days ago",
    tags: [{ name: "Cardio", color: "bg-blue-500"}, { name: "Outdoor", color: "bg-green-500"}]
  }
];

export const dummyFitnessGoals: FitnessGoal[] = [
  {
    id: 'goal1',
    title: 'Weekly Workouts',
    description: 'Complete 5 workouts this week.',
    currentProgress: 3,
    target: 5,
    unit: 'workouts',
    status: 'on-track',
    deadline: 'This Sunday',
    // icon: Target, // Example: import { Target } from 'lucide-react';
  },
  {
    id: 'goal2',
    title: 'Run 20km This Month',
    description: 'Accumulate 20 kilometers of running.',
    currentProgress: 8.5,
    target: 20,
    unit: 'km',
    status: 'at-risk',
    deadline: 'End of Month',
    // icon: Run, 
  },
  {
    id: 'goal3',
    title: 'Morning Yoga Routine',
    description: 'Practice yoga for 15 mins, 3 times a week.',
    currentProgress: 1,
    target: 3,
    unit: 'sessions',
    status: 'off-track',
    deadline: 'This Saturday',
  },
  {
    id: 'goal4',
    title: 'Increase Bench Press',
    description: 'Reach a new personal best on bench press.',
    currentProgress: 75,
    target: 80,
    unit: 'kg',
    status: 'achieved',
    deadline: 'Achieved!',
    // icon: Weight, 
  },
];

export const dummyExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Push-ups',
    description: 'A classic bodyweight exercise targeting the chest, shoulders, and triceps.',
    type: ['Strength', 'Core'],
    muscleGroups: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    difficulty: 'Intermediate',
    // icon: User, // Example icon
    caloriesPerSet: 10, // Placeholder value
    equipment: 'None',
  },
  {
    id: 'ex2',
    name: 'Squats',
    description: 'A compound exercise that works multiple muscle groups in the lower body.',
    type: ['Strength'],
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Core'],
    difficulty: 'Intermediate',
    caloriesPerSet: 15,
    equipment: 'Barbell (optional)',
  },
  {
    id: 'ex3',
    name: 'Plank',
    description: 'An isometric core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.',
    type: ['Core', 'Strength'],
    muscleGroups: ['Core', 'Abs', 'Back'],
    difficulty: 'Beginner',
    caloriesPerMinute: 5,
    equipment: 'None',
  },
  {
    id: 'ex4',
    name: 'Jumping Jacks',
    description: 'A full-body cardiovascular exercise that is great for warming up.',
    type: ['Cardio'],
    muscleGroups: ['Full Body'],
    difficulty: 'Beginner',
    caloriesPerMinute: 10,
    equipment: 'None',
  },
  {
    id: 'ex5',
    name: 'Bicycle Crunches',
    description: 'An effective abdominal exercise that targets the obliques and rectus abdominis.',
    type: ['Core'],
    muscleGroups: ['Abs', 'Obliques'],
    difficulty: 'Intermediate',
    caloriesPerSet: 8,
    equipment: 'None',
  },
  {
    id: 'ex6',
    name: 'Lunges',
    description: 'A lower body exercise that targets the quads, glutes, and hamstrings. Can be done with or without weights.',
    type: ['Strength'],
    muscleGroups: ['Quads', 'Glutes', 'Hamstrings'],
    difficulty: 'Beginner',
    caloriesPerSet: 12,
    equipment: 'Dumbbells (optional)',
  },
  {
    id: 'ex7',
    name: 'Burpees',
    description: 'A full-body, high-intensity exercise that combines a squat, push-up, and jump.',
    type: ['Cardio', 'Strength', 'Core'],
    muscleGroups: ['Full Body', 'Chest', 'Legs', 'Core'],
    difficulty: 'Advanced',
    caloriesPerMinute: 15,
    equipment: 'None',
  },
  {
    id: 'ex8',
    name: 'Mountain Climbers',
    description: 'A dynamic, full-body exercise that builds cardio endurance, core strength, and agility.',
    type: ['Cardio', 'Core'],
    muscleGroups: ['Core', 'Shoulders', 'Legs'],
    difficulty: 'Intermediate',
    caloriesPerMinute: 12,
    equipment: 'None',
  }
];

export const dummyActivityData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Workouts",
      data: [1, 0, 1, 1, 0, 1, 0], // Number of workouts
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    // Add datasets for Calories and Duration if needed for tabs
  ],
};

export const dummyWorkoutTypesData = {
  labels: ['Cardio', 'Strength', 'Flexibility', 'Core', 'Other'],
  datasets: [
    {
      label: 'Workout Types',
      data: [45, 30, 15, 5, 5], // Percentages
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(75, 192, 192, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
