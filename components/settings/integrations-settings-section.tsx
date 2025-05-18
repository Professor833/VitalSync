import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Smartphone, Users, Apple as AppleIcon, PlusCircle } from 'lucide-react'; // Using Apple as a generic app icon

interface ConnectedItemProps {
  id: string;
  name: string;
  connectedDate: string;
  icon: React.ElementType;
  onDisconnect: (id: string) => void;
}

const ConnectedItem: React.FC<ConnectedItemProps> = ({ id, name, connectedDate, icon: Icon, onDisconnect }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
      <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6 text-muted-foreground" />
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">Connected on {connectedDate}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={() => onDisconnect(id)}>
        Disconnect
      </Button>
    </div>
  );
};

// Mock data - replace with actual data from state/API
const mockConnectedDevices: Omit<ConnectedItemProps, 'onDisconnect'>[] = [
  { id: 'fitbit', name: 'Fitbit Sense', connectedDate: 'May 12, 2023', icon: Smartphone },
  { id: 'applehealth', name: 'Apple Health', connectedDate: 'April 3, 2023', icon: Smartphone },
];

const mockConnectedApps: Omit<ConnectedItemProps, 'onDisconnect'>[] = [
  { id: 'strava', name: 'Strava', connectedDate: 'May 15, 2023', icon: Users },
  { id: 'myfitnesspal', name: 'MyFitnessPal', connectedDate: 'April 20, 2023', icon: AppleIcon },
];

const IntegrationsSettingsSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const handleDisconnect = (id: string) => {
    console.log(`Disconnecting ${id}`); // Placeholder action
  };

  return (
    <Card ref={ref} id="integrations" className="scroll-mt-24">
      <CardHeader>
        <CardTitle>Integrations Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connected Devices */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Connected Devices</h3>
          <div className="space-y-2">
            {mockConnectedDevices.map((device) => (
              <ConnectedItem key={device.id} {...device} onDisconnect={handleDisconnect} />
            ))}
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Connect New Device
          </Button>
        </div>

        <Separator />

        {/* Connected Apps */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Connected Apps</h3>
          <div className="space-y-2">
            {mockConnectedApps.map((app) => (
              <ConnectedItem key={app.id} {...app} onDisconnect={handleDisconnect} />
            ))}
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> Connect New App
          </Button>
        </div>

        <Separator />

        {/* Data Sync Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Data Sync Settings</h3>
          <div className="flex items-start space-x-3">
            <Checkbox id="automatic-sync" defaultChecked />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="automatic-sync" className="font-medium">
                Automatic Sync
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically sync data between VitalSync and connected apps/devices.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox id="background-sync" defaultChecked />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="background-sync" className="font-medium">
                Background Sync
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow VitalSync to sync data in the background even when the app is closed.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox id="wifi-only-sync" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="wifi-only-sync" className="font-medium">
                Sync on Wi-Fi Only
              </Label>
              <p className="text-sm text-muted-foreground">
                Only sync data when connected to Wi-Fi to save mobile data.
              </p>
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

IntegrationsSettingsSection.displayName = 'IntegrationsSettingsSection';
export default IntegrationsSettingsSection;
