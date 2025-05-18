"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-foreground">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 rounded-md border">
            <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive updates and alerts via email.
              </span>
            </Label>
            <Switch id="emailNotifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 rounded-md border">
            <Label htmlFor="pushNotifications" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get real-time alerts on your devices.
              </span>
            </Label>
            <Switch id="pushNotifications" />
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 rounded-md border">
            <Label htmlFor="weeklySummary" className="flex flex-col space-y-1">
              <span>Weekly Summary Email</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get a summary of your activity every week.
              </span>
            </Label>
            <Switch id="weeklySummary" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Notification Preferences</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose how VitalSync looks on your device.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Appearance Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
