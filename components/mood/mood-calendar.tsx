import React, { useState } from 'react';
import { MoodEntry, MoodLevel } from '../../app/dashboard/mood-journal/data';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Smile, Meh, Frown, Angry, LucideIcon } from 'lucide-react';
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

interface MoodCalendarProps {
  moodEntries: MoodEntry[];
}

interface MoodIconInfo {
  Icon: LucideIcon;
  colorClass: string;
  label: MoodLevel;
}

// Icon mapping based on the image's legend
const moodIconMap: Record<MoodLevel, MoodIconInfo> = {
  Great:  { Icon: Smile, colorClass: 'text-green-500', label: 'Great' },
  Good:   { Icon: Smile, colorClass: 'text-yellow-500', label: 'Good' },
  Neutral:{ Icon: Meh,   colorClass: 'text-yellow-500', label: 'Neutral' }, // Matching image legend (yellow Meh)
  Bad:    { Icon: Frown, colorClass: 'text-red-500', label: 'Bad' },
  Awful:  { Icon: Angry, colorClass: 'text-red-700', label: 'Awful' }, // Awful not in legend, but a valid level
};
const legendLevelsForDisplay: MoodLevel[] = ['Great', 'Good', 'Neutral', 'Bad'];

const MoodCalendar: React.FC<MoodCalendarProps> = ({ moodEntries }) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Represents a date within the currently displayed week

  const handlePreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  // Assuming Sunday is the start of the week (locale-dependent, date-fns default is Sunday for weekStartsOn:0)
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); 
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const displayMonthYear = format(currentDate, 'MMMM yyyy');

  return (
    <div className="w-full">
      {/* Header Navigation - Matching image style for Previous/Month/Next pills */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center border border-input bg-transparent rounded-md h-9">
          <Button variant="ghost" size="sm" onClick={handlePreviousWeek} className="rounded-r-none h-full px-3 text-xs sm:text-sm">
            Previous
          </Button>
          <span className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary border-l border-r h-full flex items-center">
            {displayMonthYear}
          </span>
          <Button variant="ghost" size="sm" onClick={handleNextWeek} className="rounded-l-none h-full px-3 text-xs sm:text-sm">
            Next
          </Button>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {daysInWeek.map((day) => {
          const dayKey = format(day, 'yyyy-MM-dd');
          const moodEntryForDay = moodEntries.find(entry => isSameDay(new Date(entry.date), day));
          const moodInfo = moodEntryForDay ? moodIconMap[moodEntryForDay.moodLevel] : null;
          const isToday = isSameDay(day, new Date());

          return (
            <div 
              key={dayKey} 
              className={`flex flex-col items-center p-1.5 sm:p-2 border rounded-lg min-h-[75px] sm:min-h-[85px] justify-between transition-colors
                          ${isToday ? 'border-primary bg-primary/5' : 'bg-card hover:bg-muted/50'}`}
            >
              <span className={`text-xs font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>{format(day, 'E')}</span> {/* Sun, Mon */}
              <span className={`font-semibold text-sm sm:text-md ${isToday ? 'text-primary' : 'text-foreground'}`}>
                {format(day, 'd')}
              </span>
              <div className="h-6 w-6 flex items-center justify-center">
                {moodInfo && <moodInfo.Icon className={`${moodInfo.colorClass} h-5 w-5 sm:h-6 sm:w-6`} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 gap-y-1 mt-4 text-xs">
        {legendLevelsForDisplay.map(level => {
          const { Icon, colorClass, label } = moodIconMap[level];
          return (
            <div key={label} className="flex items-center gap-1">
              <Icon className={`${colorClass} h-3.5 w-3.5`} />
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodCalendar;
