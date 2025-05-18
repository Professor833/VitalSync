"use client";

import React from 'react';
import Link from 'next/link';

interface SleepInsightItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  learnMoreUrl?: string;
  iconBgClass?: string; // Optional background color for the icon container
}

export const SleepInsightItem: React.FC<SleepInsightItemProps> = ({ icon, title, description, learnMoreUrl, iconBgClass }) => {
  return (
    <div className="flex items-start space-x-4 py-3">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconBgClass || 'bg-gray-100 dark:bg-gray-700'}`}>
        {icon}
      </div>
      <div className="flex-grow">
        <h4 className="text-md font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        {learnMoreUrl && (
          <Link href={learnMoreUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-1 inline-block">
            Learn More
          </Link>
        )}
      </div>
    </div>
  );
};

export default SleepInsightItem;
