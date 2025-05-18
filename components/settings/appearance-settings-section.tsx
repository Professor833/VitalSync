import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Sun, Moon, Laptop, Palette as PaletteIcon, LayoutGrid, ListFilter, Check, TextIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const colorSchemes = [
  { name: 'Indigo', value: 'indigo', className: 'bg-indigo-500' },
  { name: 'Blue', value: 'blue', className: 'bg-blue-500' },
  { name: 'Green', value: 'green', className: 'bg-green-500' },
  { name: 'Purple', value: 'purple', className: 'bg-purple-500' },
];

const dashboardLayouts = [
  { name: 'Grid Layout', value: 'grid', description: 'Card-based dashboard layout', icon: LayoutGrid },
  { name: 'List Layout', value: 'list', description: 'Vertical list dashboard layout', icon: ListFilter },
];

// Mock user preferences - in a real app, these would come from a global store or API
const initialAppearanceSettings = {
  colorScheme: 'indigo',
  dashboardLayout: 'grid',
  textSize: 100, // Percentage
};

const AppearanceSettingsSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [selectedColorScheme, setSelectedColorScheme] = useState(initialAppearanceSettings.colorScheme);
  const [selectedLayout, setSelectedLayout] = useState(initialAppearanceSettings.dashboardLayout);
  const [textSize, setTextSize] = useState([initialAppearanceSettings.textSize]);

  // useEffect only runs on the client, so now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleResetToDefault = () => {
    // For theme, 'system' is often the default with next-themes
    setTheme('system'); 
    setSelectedColorScheme(initialAppearanceSettings.colorScheme);
    setSelectedLayout(initialAppearanceSettings.dashboardLayout);
    setTextSize([initialAppearanceSettings.textSize]);
  };
  
  const handleSaveChanges = () => {
    // Placeholder: In a real app, dispatch an action to save these settings
    console.log('Saving appearance settings:', { theme, selectedColorScheme, selectedLayout, textSize: textSize[0] });
  };

  if (!mounted) {
    // Avoid hydration mismatch by not rendering theme-dependent UI on server
    return null; 
  }

  return (
    <Card ref={ref} id="appearance" className="scroll-mt-24">
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Theme Section */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Theme</Label>
          <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[ 
              { value: 'light', label: 'Light', description: 'Light background with dark text', icon: Sun },
              { value: 'dark', label: 'Dark', description: 'Dark background with light text', icon: Moon },
              { value: 'system', label: 'System', description: 'Follow system preferences', icon: Laptop },
            ].map((item) => (
              <Label
                key={item.value}
                htmlFor={`theme-${item.value}`}
                className={cn(
                  'flex flex-col items-start p-4 rounded-lg border cursor-pointer transition-colors',
                  theme === item.value ? 'border-primary ring-2 ring-primary' : 'border-muted'
                )}
              >
                <RadioGroupItem value={item.value} id={`theme-${item.value}`} className="sr-only" />
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {theme === item.value && <Check className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Color Scheme Section */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Color Scheme</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colorSchemes.map((scheme) => (
              <Button
                key={scheme.value}
                variant={selectedColorScheme === scheme.value ? 'default' : 'outline'}
                onClick={() => setSelectedColorScheme(scheme.value)}
                className="h-auto p-4 flex flex-col items-center justify-center space-y-2 transition-all duration-150 ease-in-out"
              >
                <div className={cn('w-8 h-8 rounded-full', scheme.className)}></div>
                <span className="text-sm font-medium">{scheme.name}</span>
                 {selectedColorScheme === scheme.value && <Check className="h-4 w-4 absolute top-2 right-2 text-primary-foreground" />}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Dashboard Layout Section */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Dashboard Layout</Label>
          <RadioGroup value={selectedLayout} onValueChange={setSelectedLayout} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dashboardLayouts.map((layout) => (
              <Label
                key={layout.value}
                htmlFor={`layout-${layout.value}`}
                className={cn(
                  'flex items-start p-4 rounded-lg border cursor-pointer transition-colors',
                  selectedLayout === layout.value ? 'border-primary ring-2 ring-primary' : 'border-muted'
                )}
              >
                <RadioGroupItem value={layout.value} id={`layout-${layout.value}`} className="sr-only" />
                <layout.icon className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-grow">
                  <span className="font-medium">{layout.name}</span>
                  <p className="text-sm text-muted-foreground">{layout.description}</p>
                </div>
                {selectedLayout === layout.value && <Check className="h-5 w-5 text-primary ml-auto flex-shrink-0" />}
              </Label>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Text Size Section */}
        <div className="space-y-4">
          <Label htmlFor="text-size" className="text-base font-semibold">Text Size</Label>
          <div className="flex items-center space-x-4">
            <TextIcon className="h-6 w-6 text-muted-foreground" /> {/* Small A */} 
            <Slider
              id="text-size"
              min={80}
              max={120}
              step={10}
              value={textSize}
              onValueChange={setTextSize}
              className="flex-grow"
            />
            <TextIcon className="h-8 w-8 text-muted-foreground" /> {/* Large A */} 
          </div>
           <p className="text-sm text-muted-foreground text-center">Current size: {textSize[0]}%</p>
        </div>

      </CardContent>
      <CardFooter className="justify-end space-x-2 pt-8">
        <Button variant="outline" onClick={handleResetToDefault}>Reset to Default</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
});

AppearanceSettingsSection.displayName = 'AppearanceSettingsSection';
export default AppearanceSettingsSection;
