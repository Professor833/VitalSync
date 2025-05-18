// Shared type definitions for the VitalSync application

export interface SleepLogEntry {
  id: string; // Unique identifier, e.g., a timestamp or UUID
  date: string; // Formatted date string, e.g., "May 18, 2024"
  sleepDate: Date; // The actual date object for sorting/calculation
  bedtime: string; // Formatted time string, e.g., "10:30 PM"
  wakeTime: string; // Formatted time string, e.g., "06:45 AM"
  totalSleep: string; // Formatted duration string, e.g., "8h 15m"
  quality?: 'Good' | 'Okay' | 'Poor' | string; // Optional: quality rating
  notes?: string; // Optional: user notes
  dreamAnalysis?: string; // Optional: Freudian-based dream analysis log
}

// You can add other shared types here as the application grows
// For example:
// export interface BloodPressureReading { ... }
// export interface WeightEntry { ... }
