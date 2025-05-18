"use client"; // Required for recharts and potentially other client-side interactions

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Heart,
  Activity as ActivityIcon, // Renamed to avoid conflict with React's Activity
  TrendingUp,
  Scale,
  ClipboardList,
  Download,
  PlusCircle,
  FilePlus,
  BarChart,
  AlertTriangle, // For elevated status
  CheckCircle2, // For normal status
} from "lucide-react";

import { HealthMetricsTrendsChart } from "@/components/charts/health-metrics-trends-chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { BloodPressureForm, BloodPressureFormValues } from "@/components/forms/blood-pressure-form";
import { WeightForm, WeightFormValues } from "@/components/forms/weight-form";
import { CustomMetricForm, CustomMetricFormValues } from "@/components/forms/custom-metric-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // To close dialog programmatically or via a button
} from "@/components/ui/dialog";

const bloodPressureHistoryData = [
  {
    date: "Today, 8:30 AM",
    systolic: 120,
    diastolic: 80,
    status: "Normal",
  },
  {
    date: "Yesterday, 9:15 AM",
    systolic: 118,
    diastolic: 78,
    status: "Normal",
  },
  {
    date: "May 10, 8:45 AM",
    systolic: 125,
    diastolic: 82,
    status: "Normal",
  },
  {
    date: "May 9, 7:30 AM",
    systolic: 135,
    diastolic: 85,
    status: "Elevated",
  },
  {
    date: "May 8, 8:00 AM",
    systolic: 122,
    diastolic: 79,
    status: "Normal",
  },
];

const heartRateAnalysisData = [
  { time: "6 AM", value: 62 },
  { time: "9 AM", value: 68 },
  { time: "12 PM", value: 75 },
  { time: "3 PM", value: 72 },
  { time: "6 PM", value: 78 },
  { time: "9 PM", value: 70 },
];

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "Normal") {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 className="mr-1 h-3 w-3"/>Normal</span>;
  }
  if (status === "Elevated") {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><AlertTriangle className="mr-1 h-3 w-3"/>Elevated</span>;
  }
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
};

export default function HealthMetricsPage() {
  // State to control dialog open/close for each form
  const [isBloodPressureModalOpen, setIsBloodPressureModalOpen] = React.useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = React.useState(false);
  const [isCustomMetricModalOpen, setIsCustomMetricModalOpen] = React.useState(false);

  const handleBloodPressureSubmit = (data: BloodPressureFormValues) => {
    console.log("New Blood Pressure Reading:", data);
    // Here you would typically send data to a backend or update global state
    setIsBloodPressureModalOpen(false); // Close modal on submit
    // Potentially show a toast notification for success
  };

  const handleWeightSubmit = (data: WeightFormValues) => {
    console.log("New Weight Reading:", data);
    setIsWeightModalOpen(false);
  };

  const handleCustomMetricSubmit = (data: CustomMetricFormValues) => {
    console.log("New Custom Metric Reading:", data);
    setIsCustomMetricModalOpen(false);
  };

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-foreground">
            Health Metrics
          </h1>
          <p className="text-muted-foreground">
            Track and analyze your key health indicators.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="last30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last90days">Last 90 days</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 <span className="text-xs text-muted-foreground">bpm</span></div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑</span> Normal range (60-100 bpm)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
            <ActivityIcon className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120/80 <span className="text-xs text-muted-foreground">mmHg</span></div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">✓</span> Optimal range
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight</CardTitle>
            <Scale className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5 <span className="text-xs text-muted-foreground">kg</span></div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-500">↓</span> -0.5 kg from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BMI</CardTitle>
            <ClipboardList className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22.4</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">✓</span> Normal weight range
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Health Metrics Trends Chart */}
      <HealthMetricsTrendsChart />

      {/* Blood Pressure History & Heart Rate Analysis Row */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Blood Pressure History Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Blood Pressure History</CardTitle>
            <Button variant="link" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Systolic</TableHead>
                  <TableHead className="text-right">Diastolic</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bloodPressureHistoryData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.date}</TableCell>
                    <TableCell className="text-right">{entry.systolic}</TableCell>
                    <TableCell className="text-right">{entry.diastolic}</TableCell>
                    <TableCell className="text-center"><StatusBadge status={entry.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Heart Rate Analysis */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Heart Rate Analysis</CardTitle>
            <Button variant="link" size="sm">View Details</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Resting Heart Rate</p>
                <p className="font-semibold text-lg">62 <span className="text-xs">bpm</span></p>
                <p className="text-xs text-green-500">Excellent</p>
              </div>
              <div>
                <p className="text-muted-foreground">Average Heart Rate</p>
                <p className="font-semibold text-lg">72 <span className="text-xs">bpm</span></p>
                <p className="text-xs text-green-500">Normal</p>
              </div>
              <div>
                <p className="text-muted-foreground">Max Heart Rate</p>
                <p className="font-semibold text-lg">142 <span className="text-xs">bpm</span></p>
                <p className="text-xs text-muted-foreground">During exercise</p>
              </div>
              <div>
                <p className="text-muted-foreground">Heart Rate Variability</p>
                <p className="font-semibold text-lg">48 <span className="text-xs">ms</span></p>
                <p className="text-xs text-green-500">Good recovery</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={heartRateAnalysisData}>
                <defs>
                  <linearGradient id="colorHrAnalysis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip wrapperClassName="text-xs"/>
                <Area type="monotone" dataKey="value" stroke="#ef4444" fillOpacity={1} fill="url(#colorHrAnalysis)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Add New Measurement Section */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Measurement</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Blood Pressure Modal */}
          <Dialog open={isBloodPressureModalOpen} onOpenChange={setIsBloodPressureModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex flex-col items-center justify-center h-32 text-center p-4 hover:bg-accent">
                <ActivityIcon className="h-8 w-8 mb-2 text-blue-500" />
                <span className="font-semibold">Blood Pressure</span>
                <span className="text-xs text-muted-foreground">Add new reading</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Blood Pressure Reading</DialogTitle>
                <DialogDescription>
                  Enter your systolic and diastolic values, along with the date and time of measurement.
                </DialogDescription>
              </DialogHeader>
              <BloodPressureForm onSubmit={handleBloodPressureSubmit} />
            </DialogContent>
          </Dialog>

          {/* Weight Modal */}
          <Dialog open={isWeightModalOpen} onOpenChange={setIsWeightModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex flex-col items-center justify-center h-32 text-center p-4 hover:bg-accent">
                <Scale className="h-8 w-8 mb-2 text-green-500" />
                <span className="font-semibold">Weight</span>
                <span className="text-xs text-muted-foreground">Update your weight</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Weight Measurement</DialogTitle>
                <DialogDescription>
                  Enter your current weight, select the unit, and specify the date and time.
                </DialogDescription>
              </DialogHeader>
              <WeightForm onSubmit={handleWeightSubmit} />
            </DialogContent>
          </Dialog>

          {/* Custom Metric Modal */}
          <Dialog open={isCustomMetricModalOpen} onOpenChange={setIsCustomMetricModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex flex-col items-center justify-center h-32 text-center p-4 hover:bg-accent">
                <PlusCircle className="h-8 w-8 mb-2 text-purple-500" />
                <span className="font-semibold">Custom Metric</span>
                <span className="text-xs text-muted-foreground">Add other measurements</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>Add Custom Metric</DialogTitle>
                <DialogDescription>
                  Define your own metric, its value, unit (optional), and any relevant notes.
                </DialogDescription>
              </DialogHeader>
              <CustomMetricForm onSubmit={handleCustomMetricSubmit} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </main>
  );
}
