import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Droplets,
  Footprints,
  ListChecks,
  Moon,
  PenTool,
  RefreshCcw,
  Smile,
  TrendingUp,
  UserCheck,
  Zap, // Generic activity icon
  GlassWater, // For hydration update
  BookOpen, // For mood journal
  Bed, // For sleep tracked
} from "lucide-react";

import { WeeklyActivityChart } from "@/components/charts/weekly-activity-chart";
import { HealthMetricsChart } from "@/components/charts/health-metrics-chart";

export default function DashboardPage() {
  const recentActivities = [
    {
      icon: <Zap className="h-5 w-5 text-green-500" />,
      title: "Morning Run",
      details: "5.2 km in 32 minutes",
      time: "Today, 7:30 AM",
    },
    {
      icon: <GlassWater className="h-5 w-5 text-blue-500" />,
      title: "Hydration Update",
      details: "Drank 500ml of water",
      time: "Today, 10:15 AM",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      title: "Mood Journal Entry",
      details: "Feeling good after meditation",
      time: "Yesterday, 6:45 PM",
    },
    {
      icon: <Bed className="h-5 w-5 text-indigo-500" />,
      title: "Sleep Tracked",
      details: "8.2 hours with 92% quality",
      time: "Yesterday, 8:30 AM",
    },
  ];

  const reminders = [
    { id: "r1", label: "Drink 500ml water", time: "12:00 PM", checked: false },
    { id: "r2", label: "Evening meditation", time: "6:30 PM", checked: false },
    { id: "r3", label: "Morning stretching", time: "7:00 AM", checked: true },
    { id: "r4", label: "Log today's meals", time: "8:00 PM", checked: false },
  ];

  const weeklyGoals = [
    { title: "Exercise: 4/5 days", value: 80, color: "bg-green-500" },
    { title: "Meditation: 3/7 days", value: 43, color: "bg-purple-500" },
    { title: "Water: 15/21 L", value: 71, color: "bg-blue-500" },
  ];

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your health overview for today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="last7days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overall Health Score & Stats Row */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Overall Health Score Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Overall Health Score</CardTitle>
            <CardDescription>
              Based on your recent activity and metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="relative h-32 w-32">
              {/* Simplified circular score - real circular progress needs SVG/Recharts RadialBarChart */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full border-8 border-primary bg-primary/10">
                <span className="text-4xl font-bold text-primary">80</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-green-500 flex items-center justify-center">
                <TrendingUp className="mr-1 h-5 w-5" /> +5% from last week
              </p>
              <p className="text-sm text-muted-foreground">
                Keep up the good work!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards - Sleep, Hydration, Steps, Mood */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sleep</CardTitle>
              <Moon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5 <span className="text-sm font-normal text-muted-foreground">hours</span></div>
              <p className="text-xs text-muted-foreground">75% of your 10hr goal</p>
              <Progress value={75} aria-label="75% sleep goal" className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hydration</CardTitle>
              <Droplets className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.8 <span className="text-sm font-normal text-muted-foreground">liters</span></div>
              <p className="text-xs text-muted-foreground">60% of your 3L goal</p>
              <Progress value={60} aria-label="60% hydration goal" className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Steps</CardTitle>
              <Footprints className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,432 <span className="text-sm font-normal text-muted-foreground">steps</span></div>
              <p className="text-xs text-muted-foreground">84% of your 10K goal</p>
              <Progress value={84} aria-label="84% steps goal" className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mood</CardTitle>
              <Smile className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Good</div>
              <p className="text-xs text-muted-foreground">Overall positive</p>
              <div className="flex gap-1 mt-2">
                 {/* Simplified mood icons */}
                <span className="h-5 w-5 rounded-full bg-red-500" title="Sad"></span>
                <span className="h-5 w-5 rounded-full bg-orange-400" title="Okay"></span>
                <span className="h-5 w-5 rounded-full bg-yellow-400 ring-2 ring-offset-2 ring-yellow-500" title="Good"></span>
                <span className="h-5 w-5 rounded-full bg-green-400" title="Great"></span>
                <span className="h-5 w-5 rounded-full bg-blue-400" title="Awesome"></span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3">
         <WeeklyActivityChart />
        </div>
        <div className="lg:col-span-2">
          <HealthMetricsChart />
        </div>
      </div>

      {/* Recent Activities & Reminders/Goals Row */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-5">
        {/* Recent Activities Card */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activities</CardTitle>
            <Button variant="link" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-start space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                  <span className="flex-shrink-0 mt-1">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                  </div>
                  <time className="text-xs text-muted-foreground self-start">{activity.time}</time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Reminders & Goals Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reminders & Goals</CardTitle>
            <Button variant="link" size="sm">Add New</Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Today's Reminders</h3>
              <ul className="space-y-3">
                {reminders.map((reminder) => (
                  <li key={reminder.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={reminder.id} defaultChecked={reminder.checked} />
                      <label htmlFor={reminder.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {reminder.label}
                      </label>
                    </div>
                    <time className="text-xs text-muted-foreground">{reminder.time}</time>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Weekly Goals</h3>
              <ul className="space-y-3">
                {weeklyGoals.map((goal, index) => (
                  <li key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{goal.title}</span>
                      <span className="text-sm font-semibold">{goal.value}%</span>
                    </div>
                    <Progress value={goal.value} aria-label={goal.title} className={`h-2 ${goal.color || 'bg-primary'}`} />
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
