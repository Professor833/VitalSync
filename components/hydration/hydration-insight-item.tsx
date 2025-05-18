import { Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react'; // Example icons

export interface HydrationInsight {
  id: string;
  type: 'tip' | 'warning' | 'improvement';
  text: string;
  icon?: React.ElementType;
  learnMoreLink?: string; // Optional link for more details
}

interface HydrationInsightItemProps {
  insight: HydrationInsight;
}

const getIconForInsightType = (type: HydrationInsight['type']) => {
  switch (type) {
    case 'tip':
      return Lightbulb;
    case 'warning':
      return AlertTriangle;
    case 'improvement':
      return CheckCircle2;
    default:
      return Lightbulb;
  }
};

const getIconColorForInsightType = (type: HydrationInsight['type']) => {
  switch (type) {
    case 'tip':
      return 'text-blue-500';
    case 'warning':
      return 'text-yellow-500';
    case 'improvement':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
}

export default function HydrationInsightItem({ insight }: HydrationInsightItemProps) {
  const IconComponent = insight.icon || getIconForInsightType(insight.type);
  const iconColor = getIconColorForInsightType(insight.type);

  return (
    <div className="flex items-start gap-3 p-3 bg-muted/50 hover:bg-muted/75 rounded-md transition-colors">
      <IconComponent className={`h-5 w-5 mt-0.5 ${iconColor}`} />
      <div>
        <p className="text-sm text-foreground">{insight.text}</p>
        {insight.learnMoreLink && (
          <a 
            href={insight.learnMoreLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            Learn more
          </a>
        )}
      </div>
    </div>
  );
}
