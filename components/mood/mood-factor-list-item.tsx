import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MoodFactor } from "@/app/dashboard/mood-journal/data";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodFactorListItemProps {
  factor: MoodFactor;
}

const MoodFactorListItem: React.FC<MoodFactorListItemProps> = ({ factor }) => {
  const IconComponent = factor.icon;
  const isPositive = factor.impactType === "positive";
  const impactColor = isPositive ? "text-green-500" : "text-red-500";
  const progressIndicatorClass = isPositive ? "bg-green-500" : "bg-red-500";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={cn(
              "p-2 rounded-full mr-3",
              isPositive
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            )}
          >
            <IconComponent className={cn("h-5 w-5", impactColor)} />
          </div>
          <div>
            <p className="text-sm font-medium">
              {factor.name}
            </p>
            <p className={cn("text-xs", impactColor)}>
              {factor.impactPercentage}%
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {isPositive
            ? <ArrowUpRight className={cn("h-5 w-5 mb-1", impactColor)} />
            : <ArrowDownRight className={cn("h-5 w-5 mb-1", impactColor)} />}
          <p className={cn("text-xs font-medium", impactColor)}>
            {isPositive ? "Positive Impact" : "Negative Impact"}
          </p>
        </div>
      </CardContent>
      <Progress
        value={factor.impactPercentage}
        className={cn(
          "h-1 w-full rounded-b-md",
          isPositive ? "bg-green-200/50" : "bg-red-200/50"
        )}
        indicatorColorClass={progressIndicatorClass}
      />
    </Card>
  );
};

export default MoodFactorListItem;
