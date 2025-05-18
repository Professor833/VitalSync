import { LucideIcon, Bed, Dumbbell, Coffee, Users, Lightbulb, Brain, MessageSquare } from 'lucide-react';

// Types for Mood Journal
export type MoodLevel = 'Great' | 'Good' | 'Neutral' | 'Bad' | 'Awful';

export interface MoodEntry {
  id: string;
  moodLevel: MoodLevel;
  notes?: string;
  date: string; // ISO string or formatted date string
  time: string; // Formatted time string
  tags?: string[];
  // Consider adding specific factors that influenced the mood, e.g., activities, sleep, weather
}

export interface MoodFactor {
  id: string;
  name: string;
  icon: LucideIcon; // Or string for icon name
  impactPercentage: number; // e.g., 80 for 80%
  impactType: 'positive' | 'negative' | 'neutral';
}

export interface MoodInsight {
  id: string;
  icon: LucideIcon; // Or string for icon name
  title: string;
  description: string;
  learnMoreLink?: string;
}

// Dummy Data
export const dummyMoodEntries: MoodEntry[] = [
  {
    id: 'mood1',
    moodLevel: 'Good',
    notes: 'Had a productive morning and completed my workout. Feeling energized and ready for the day ahead.',
    date: '2025-05-18T09:30:00.000Z', // Example: Today, 9:30 AM
    time: '9:30 AM',
    tags: ['Exercise', 'Productivity'],
  },
  {
    id: 'mood2',
    moodLevel: 'Neutral',
    notes: 'Long day at work with some challenges. Managed to stay focused but feeling a bit tired now.',
    date: '2025-05-17T20:45:00.000Z', // Example: Yesterday, 8:45 PM
    time: '8:45 PM',
    tags: ['Work Stress', 'Tired'],
  },
  {
    id: 'mood3',
    moodLevel: 'Great',
    notes: 'Had dinner with friends after a long time. Great conversations and laughs. Feeling connected and happy.',
    date: '2025-05-16T19:00:00.000Z', // Example: 2 days ago, 7:00 PM
    time: '7:00 PM',
    tags: ['Social', 'Friends', 'Happy'],
  },
];

export const dummyMoodFactors: MoodFactor[] = [
  {
    id: 'factor1',
    name: 'Sleep Quality',
    icon: Bed,
    impactPercentage: 85,
    impactType: 'positive',
  },
  {
    id: 'factor2',
    name: 'Exercise',
    icon: Dumbbell,
    impactPercentage: 75,
    impactType: 'positive',
  },
  {
    id: 'factor3',
    name: 'Stress',
    icon: Coffee, // Placeholder, could be something like 'Brain' or 'Zap'
    impactPercentage: 60,
    impactType: 'negative',
  },
  {
    id: 'factor4',
    name: 'Social Interaction',
    icon: Users,
    impactPercentage: 70,
    impactType: 'positive',
  },
];

export const dummyMoodInsights: MoodInsight[] = [
  {
    id: 'insight1',
    icon: Lightbulb, // Or Dumbbell if specific to exercise
    title: 'Exercise Improves Your Mood',
    description: 'We\'ve noticed that your mood is consistently better on days when you exercise. Consider making it a regular part of your routine.',
  },
  {
    id: 'insight2',
    icon: Brain, // Or Bed if specific to sleep
    title: 'Sleep Quality Matters',
    description: 'Your mood tends to be lower after nights with poor sleep. Try to maintain a consistent sleep schedule for better emotional well-being.',
  },
  {
    id: 'insight3',
    icon: MessageSquare, // Or Users if specific to social
    title: 'Social Connection',
    description: 'Social interactions have a positive impact on your mood. Consider scheduling regular time with friends or family.',
  },
];

// Example: For Mood Distribution Chart (Mood Summary)
export const dummyMoodDistributionData = {
  labels: ['Great', 'Good', 'Neutral', 'Bad', 'Awful'],
  datasets: [
    {
      label: 'Mood Distribution',
      data: [15, 25, 30, 20, 10], // Example percentages or counts
      backgroundColor: [
        '#10B981', // Great (green)
        '#60A5FA', // Good (blue)
        '#A1A1AA', // Neutral (gray)
        '#FACC15', // Bad (yellow)
        '#F87171', // Awful (red)
      ],
      borderColor: [
        '#059669',
        '#3B82F6',
        '#71717A',
        '#F59E0B',
        '#EF4444',
      ],
      borderWidth: 1,
    },
  ],
};

// Example: For Mood Trends Chart
export const dummyMoodTrendsData = {
  labels: ['May 1', 'May 2', 'May 3', 'May 4', 'May 5', 'May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
  datasets: [
    {
      label: 'Mood Score',
      data: [3, 4, 2, 3, 4, 5, 4, 3, 4, 3, 2, 4], // Example: 5=Great, 4=Good, 3=Neutral, 2=Bad, 1=Awful
      borderColor: 'hsl(var(--primary))',
      tension: 0.4, // Makes the line curved
    },
  ],
};