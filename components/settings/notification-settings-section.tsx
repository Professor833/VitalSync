import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface NotificationCheckboxProps {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}

const NotificationCheckbox: React.FC<NotificationCheckboxProps> = ({ id, label, description, defaultChecked }) => {
  return (
    <div className="flex items-start space-x-3">
      <Checkbox id={id} defaultChecked={defaultChecked} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

// Mock data - replace with actual user preferences
const mockNotificationSettings = {
  email: {
    weeklyReport: true,
    goalAchievements: true,
    healthTips: false,
    newsUpdates: false,
  },
  push: {
    dailyReminders: true,
    goalProgress: true,
    healthInsights: true,
  },
  schedule: {
    startTime: '22:00',
    endTime: '07:00',
  },
};

const NotificationSettingsSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Card ref={ref} id="notifications" className="scroll-mt-24">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Email Notifications</h3>
          <NotificationCheckbox
            id="email-weekly-report"
            label="Weekly Health Report"
            description="Receive a summary of your weekly health metrics and progress."
            defaultChecked={mockNotificationSettings.email.weeklyReport}
          />
          <NotificationCheckbox
            id="email-goal-achievements"
            label="Goal Achievements"
            description="Get notified when you reach your health and fitness goals."
            defaultChecked={mockNotificationSettings.email.goalAchievements}
          />
          <NotificationCheckbox
            id="email-health-tips"
            label="Health Tips & Insights"
            description="Receive personalized health tips and insights based on your data."
            defaultChecked={mockNotificationSettings.email.healthTips}
          />
          <NotificationCheckbox
            id="email-news-updates"
            label="News & Updates"
            description="Stay informed about new features and updates to VitalSync."
            defaultChecked={mockNotificationSettings.email.newsUpdates}
          />
        </div>

        <Separator />

        {/* Push Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Push Notifications</h3>
          <NotificationCheckbox
            id="push-daily-reminders"
            label="Daily Reminders"
            description="Receive reminders for water intake, exercise, and other daily activities."
            defaultChecked={mockNotificationSettings.push.dailyReminders}
          />
          <NotificationCheckbox
            id="push-goal-progress"
            label="Goal Progress"
            description="Get updates on your progress towards your health goals."
            defaultChecked={mockNotificationSettings.push.goalProgress}
          />
          <NotificationCheckbox
            id="push-health-insights"
            label="Health Insights"
            description="Receive real-time insights based on your health data."
            defaultChecked={mockNotificationSettings.push.healthInsights}
          />
        </div>

        <Separator />

        {/* Notification Schedule */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notification Schedule</h3>
          <p className="text-sm text-muted-foreground">
            Set quiet hours when you don't want to receive notifications
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input id="start-time" type="time" defaultValue={mockNotificationSettings.schedule.startTime} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input id="end-time" type="time" defaultValue={mockNotificationSettings.schedule.endTime} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2 pt-6">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
});

NotificationSettingsSection.displayName = 'NotificationSettingsSection';
export default NotificationSettingsSection;
