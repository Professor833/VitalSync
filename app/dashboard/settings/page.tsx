"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import SettingsNav, { SettingsSection } from '@/components/settings/settings-nav';
import AccountSettingsSection from '@/components/settings/account-settings-section';
import NotificationSettingsSection from '@/components/settings/notification-settings-section';
import AppearanceSettingsSection from '@/components/settings/appearance-settings-section';
import HealthGoalsSettingsSection from '@/components/settings/health-goals-settings-section';
import PrivacyDataSettingsSection from '@/components/settings/privacy-data-settings-section';
import IntegrationsSettingsSection from '@/components/settings/integrations-settings-section';
import { UserCircle, Bell, Palette, Heart, ShieldCheck, Puzzle, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const settingsSectionsConfig: SettingsSection[] = [
  { id: 'account', title: 'Account', icon: UserCircle },
  { id: 'notifications', title: 'Notifications', icon: Bell },
  { id: 'appearance', title: 'Appearance', icon: Palette },
  { id: 'health-goals', title: 'Health Goals', icon: Heart },
  { id: 'privacy-data', title: 'Privacy & Data', icon: ShieldCheck },
  { id: 'integrations', title: 'Integrations', icon: Puzzle },
];

const sectionComponents: Record<string, React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>> = {
  'account': AccountSettingsSection,
  'notifications': NotificationSettingsSection,
  'appearance': AppearanceSettingsSection,
  'health-goals': HealthGoalsSettingsSection,
  'privacy-data': PrivacyDataSettingsSection,
  'integrations': IntegrationsSettingsSection,
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>(settingsSectionsConfig[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        setActiveSection(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -80% 0px', // Trigger when section is roughly in the middle of the viewport
      threshold: 0.4, // How much of the element should be visible
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [observerCallback]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Customize your VitalSync experience.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Export My Data
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete My Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-20 h-full">
          <SettingsNav
            sections={settingsSectionsConfig}
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
        </div>

        <main className="lg:col-span-3 space-y-8">
          {settingsSectionsConfig.map(section => {
            const Component = sectionComponents[section.id];
            return (
              <Component
                key={section.id}
                ref={(el: HTMLDivElement | null) => { sectionRefs.current[section.id] = el; }}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
