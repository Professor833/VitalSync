import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Trash2 } from 'lucide-react';

// Mock initial data - in a real app, this would come from user data/API
const initialPrivacySettings = {
  allowDataCollection: true,
  shareAnonymousData: true,
  thirdPartyDataSharing: false,
  profileVisibility: true,
  activitySharing: true,
  locationTracking: false,
};

interface PrivacyCheckboxItemProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const PrivacyCheckboxItem: React.FC<PrivacyCheckboxItemProps> = ({ id, label, description, checked, onCheckedChange }) => (
  <div className="flex items-start space-x-3">
    <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} className="mt-1" />
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

const PrivacyDataSettingsSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [allowDataCollection, setAllowDataCollection] = useState(initialPrivacySettings.allowDataCollection);
  const [shareAnonymousData, setShareAnonymousData] = useState(initialPrivacySettings.shareAnonymousData);
  const [thirdPartyDataSharing, setThirdPartyDataSharing] = useState(initialPrivacySettings.thirdPartyDataSharing);
  const [profileVisibility, setProfileVisibility] = useState(initialPrivacySettings.profileVisibility);
  const [activitySharing, setActivitySharing] = useState(initialPrivacySettings.activitySharing);
  const [locationTracking, setLocationTracking] = useState(initialPrivacySettings.locationTracking);

  const handleSaveChanges = () => {
    console.log('Saving Privacy & Data Settings:', {
      allowDataCollection,
      shareAnonymousData,
      thirdPartyDataSharing,
      profileVisibility,
      activitySharing,
      locationTracking,
    });
    // Add actual save logic here (e.g., API call)
  };

  const handleCancel = () => {
    setAllowDataCollection(initialPrivacySettings.allowDataCollection);
    setShareAnonymousData(initialPrivacySettings.shareAnonymousData);
    setThirdPartyDataSharing(initialPrivacySettings.thirdPartyDataSharing);
    setProfileVisibility(initialPrivacySettings.profileVisibility);
    setActivitySharing(initialPrivacySettings.activitySharing);
    setLocationTracking(initialPrivacySettings.locationTracking);
  };
  
  const handleExportData = () => {
    console.log('Exporting user data...');
    // Placeholder for actual data export logic
  };

  const handleDeleteData = () => {
    console.warn('Deleting user data...');
    // Placeholder for actual data deletion logic - should include a confirmation dialog
  };

  return (
    <Card ref={ref} id="privacy-data" className="scroll-mt-24">
      <CardHeader>
        <CardTitle>Privacy & Data Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Data Privacy */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Data Privacy</h3>
          <div className="space-y-4">
            <PrivacyCheckboxItem
              id="allowDataCollection"
              label="Allow Data Collection"
              description="Allow VitalSync to collect and analyze your health data to provide personalized insights and recommendations."
              checked={allowDataCollection}
              onCheckedChange={setAllowDataCollection}
            />
            <PrivacyCheckboxItem
              id="shareAnonymousData"
              label="Share Anonymous Data"
              description="Contribute anonymized data to help improve VitalSync's algorithms and health insights."
              checked={shareAnonymousData}
              onCheckedChange={setShareAnonymousData}
            />
            <PrivacyCheckboxItem
              id="thirdPartyDataSharing"
              label="Third-Party Data Sharing"
              description="Allow VitalSync to share your data with trusted third-party partners for enhanced services."
              checked={thirdPartyDataSharing}
              onCheckedChange={setThirdPartyDataSharing}
            />
          </div>
        </div>

        <Separator />

        {/* Account Privacy */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Account Privacy</h3>
          <div className="space-y-4">
            <PrivacyCheckboxItem
              id="profileVisibility"
              label="Profile Visibility"
              description="Make your profile visible to other VitalSync users."
              checked={profileVisibility}
              onCheckedChange={setProfileVisibility}
            />
            <PrivacyCheckboxItem
              id="activitySharing"
              label="Activity Sharing"
              description="Share your activities and achievements with friends and followers."
              checked={activitySharing}
              onCheckedChange={setActivitySharing}
            />
            <PrivacyCheckboxItem
              id="locationTracking"
              label="Location Tracking"
              description="Allow VitalSync to track your location for workout mapping and activity tracking."
              checked={locationTracking}
              onCheckedChange={setLocationTracking}
            />
          </div>
        </div>
        
        <Separator />

        {/* Data Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Data Management</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            <Button variant="outline" onClick={handleExportData} className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export My Data
            </Button>
            <Button variant="destructive" onClick={handleDeleteData} className="w-full sm:w-auto">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete My Data
            </Button>
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

PrivacyDataSettingsSection.displayName = 'PrivacyDataSettingsSection';
export default PrivacyDataSettingsSection;
