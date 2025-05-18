import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface SettingsSection {
  id: string;
  title: string;
  icon?: React.ElementType;
}

interface SettingsNavProps {
  sections: SettingsSection[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const SettingsNav: React.FC<SettingsNavProps> = ({ sections, activeSection, onNavigate }) => {
  return (
    <Card className="p-4 sticky top-24">
      <nav>
        <ul className="space-y-1">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onNavigate(section.id)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium',
                    'transition-colors duration-150 ease-in-out',
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {IconComponent && <IconComponent className="h-5 w-5" />}
                  <span>{section.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </Card>
  );
};

export default SettingsNav;
