"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Target, Zap, Moon } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RecommendationItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  color?: string;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  color = 'text-primary',
}) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
      <div className={`p-2 bg-background rounded-full border shadow-sm`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div className="flex-1">
        <h4 className="text-md font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground mb-2">
          {description}
        </p>
        {actionText && actionLink && (
          <Link href={actionLink} passHref legacyBehavior>
            <Button variant="link" size="sm" className="p-0 h-auto text-sm font-medium">
              {actionText} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

const PersonalizedRecommendationsSection = () => {
  const recommendations = [
    {
      id: 'improve-sleep',
      icon: Moon,
      title: 'Enhance Sleep Quality',
      description: 'Your sleep consistency is good, but try to reduce screen time 1 hour before bed to potentially improve deep sleep duration.',
      actionText: 'Log Sleep Habits',
      actionLink: '/dashboard/sleep-tracker',
      color: 'text-indigo-500',
    },
    {
      id: 'increase-steps',
      icon: Zap,
      title: 'Boost Daily Activity',
      description: 'You are close to your daily step goal. Consider a short 15-minute walk after lunch to consistently hit 10,000 steps.',
      actionText: 'Track Activity',
      actionLink: '/dashboard/fitness-log',
      color: 'text-green-500',
    },
    {
      id: 'mindful-moments',
      icon: Target, 
      title: 'Incorporate Mindful Moments',
      description: 'While your stress levels are generally low, adding 5-10 minutes of mindfulness practice could further enhance your mental well-being.',
      actionText: 'Explore Mindfulness',
      actionLink: '/dashboard/mood-journal?tab=mindfulness',
      color: 'text-purple-500',
    },
  ];

  return (
    <Card className="mt-8 mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Personalized Recommendations</CardTitle>
        <CardDescription>
          Actionable advice to help you achieve your health goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <RecommendationItem
            key={rec.id}
            icon={rec.icon}
            title={rec.title}
            description={rec.description}
            actionText={rec.actionText}
            actionLink={rec.actionLink}
            color={rec.color}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendationsSection;
