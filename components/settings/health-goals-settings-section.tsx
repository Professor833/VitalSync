import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock initial data - in a real app, this would come from user data/API
const initialHealthGoals = {
  dailyWaterIntake: '3',
  dailySteps: '10000',
  dailySleep: '8',
  dailyCaloriesBurned: '500',
  weeklyWorkouts: '5',
  weeklyActiveMinutes: '150',
  weeklyMeditationSessions: '3',
  longTermTargetWeight: '68',
  longTermTargetDate: new Date('2023-12-31'),
};

const HealthGoalsSettingsSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [waterIntake, setWaterIntake] = useState(initialHealthGoals.dailyWaterIntake);
  const [steps, setSteps] = useState(initialHealthGoals.dailySteps);
  const [sleep, setSleep] = useState(initialHealthGoals.dailySleep);
  const [caloriesBurned, setCaloriesBurned] = useState(initialHealthGoals.dailyCaloriesBurned);
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(initialHealthGoals.weeklyWorkouts);
  const [activeMinutes, setActiveMinutes] = useState(initialHealthGoals.weeklyActiveMinutes);
  const [meditationSessions, setMeditationSessions] = useState(initialHealthGoals.weeklyMeditationSessions);
  const [targetWeight, setTargetWeight] = useState(initialHealthGoals.longTermTargetWeight);
  const [targetDate, setTargetDate] = useState<Date | undefined>(initialHealthGoals.longTermTargetDate);

  const handleSaveChanges = () => {
    console.log('Saving Health Goals:', {
      waterIntake,
      steps,
      sleep,
      caloriesBurned,
      workoutsPerWeek,
      activeMinutes,
      meditationSessions,
      targetWeight,
      targetDate,
    });
    // Add actual save logic here (e.g., API call)
  };

  const handleCancel = () => {
    setWaterIntake(initialHealthGoals.dailyWaterIntake);
    setSteps(initialHealthGoals.dailySteps);
    setSleep(initialHealthGoals.dailySleep);
    setCaloriesBurned(initialHealthGoals.dailyCaloriesBurned);
    setWorkoutsPerWeek(initialHealthGoals.weeklyWorkouts);
    setActiveMinutes(initialHealthGoals.weeklyActiveMinutes);
    setMeditationSessions(initialHealthGoals.weeklyMeditationSessions);
    setTargetWeight(initialHealthGoals.longTermTargetWeight);
    setTargetDate(initialHealthGoals.longTermTargetDate);
  };

  return (
    <Card ref={ref} id="health-goals" className="scroll-mt-24">
      <CardHeader>
        <CardTitle>Health Goals Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Daily Goals */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Daily Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="waterIntake">Water Intake (Liters)</Label>
              <div className="flex items-center space-x-2">
                <Input id="waterIntake" type="number" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} placeholder="e.g., 3" className="flex-grow" />
                <span className="text-muted-foreground">L</span>
              </div>
            </div>
            <div>
              <Label htmlFor="steps">Steps</Label>
              <div className="flex items-center space-x-2">
                <Input id="steps" type="number" value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="e.g., 10000" className="flex-grow" />
                <span className="text-muted-foreground">steps</span>
              </div>
            </div>
            <div>
              <Label htmlFor="sleep">Sleep (Hours)</Label>
              <div className="flex items-center space-x-2">
                <Input id="sleep" type="number" value={sleep} onChange={(e) => setSleep(e.target.value)} placeholder="e.g., 8" className="flex-grow" />
                <span className="text-muted-foreground">hrs</span>
              </div>
            </div>
            <div>
              <Label htmlFor="caloriesBurned">Calories Burned</Label>
              <div className="flex items-center space-x-2">
                <Input id="caloriesBurned" type="number" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} placeholder="e.g., 500" className="flex-grow" />
                <span className="text-muted-foreground">kcal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Weekly Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workoutsPerWeek">Workouts per Week</Label>
              <Select value={workoutsPerWeek} onValueChange={setWorkoutsPerWeek}>
                <SelectTrigger id="workoutsPerWeek">
                  <SelectValue placeholder="Select workouts" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => String(i)).map(i_str => (
                    <SelectItem key={i_str} value={i_str}>{i_str} workout{Number(i_str) !== 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="activeMinutes">Active Minutes</Label>
              <div className="flex items-center space-x-2">
                <Input id="activeMinutes" type="number" value={activeMinutes} onChange={(e) => setActiveMinutes(e.target.value)} placeholder="e.g., 150" className="flex-grow" />
                <span className="text-muted-foreground">min</span>
              </div>
            </div>
            <div>
              <Label htmlFor="meditationSessions">Meditation Sessions</Label>
              <Select value={meditationSessions} onValueChange={setMeditationSessions}>
                <SelectTrigger id="meditationSessions">
                  <SelectValue placeholder="Select sessions" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => String(i)).map(i_str => (
                    <SelectItem key={i_str} value={i_str}>{i_str} session{Number(i_str) !== 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Long-term Goals */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Long-term Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="targetWeight">Target Weight</Label>
              <div className="flex items-center space-x-2">
                <Input id="targetWeight" type="number" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} placeholder="e.g., 68" className="flex-grow" />
                <span className="text-muted-foreground">kg</span>
              </div>
            </div>
            <div>
              <Label htmlFor="targetDate">Target Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !targetDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {targetDate ? format(targetDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={setTargetDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2 pt-8">
        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
});

HealthGoalsSettingsSection.displayName = 'HealthGoalsSettingsSection';
export default HealthGoalsSettingsSection;
