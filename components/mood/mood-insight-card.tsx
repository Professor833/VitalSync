import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodInsight } from "@/app/dashboard/mood-journal/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MoodInsightCardProps {
  insight: MoodInsight;
}

const MoodInsightCard: React.FC<MoodInsightCardProps> = ({ insight }) => {
  const IconComponent = insight.icon;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <span className="p-2 bg-primary/10 rounded-full">
            <IconComponent className="h-5 w-5 text-primary" />
          </span>
          <CardTitle className="text-base font-semibold leading-tight">
            {insight.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          {insight.description}
        </p>
      </CardContent>
      {insight.learnMoreLink &&
        <div className="p-4 pt-0 mt-auto">
          <Button variant="link" asChild className="p-0 h-auto text-sm">
            <Link href={insight.learnMoreLink}>Learn More</Link>
          </Button>
        </div>}
    </Card>
  );
};

export default MoodInsightCard;
