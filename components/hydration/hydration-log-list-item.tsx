import { Droplet, Coffee, GlassWater, Wine } from 'lucide-react'; // Example icons

export interface HydrationLogEntry {
  id: string;
  type: string; // e.g., 'Water', 'Coffee', 'Tea', 'Juice', 'Soda', 'Other'
  amount: number; // in ml
  time: string; // e.g., "9:23 AM"
  icon?: React.ElementType;
}

interface HydrationLogListItemProps {
  entry: HydrationLogEntry;
}

const getIconForBeverage = (type: string) => {
  switch (type.toLowerCase()) {
    case 'water':
      return GlassWater;
    case 'coffee':
      return Coffee;
    case 'tea':
      // Using Droplet as a generic placeholder, consider a more specific tea icon if available
      return Droplet; 
    case 'juice':
      // Using Wine as a placeholder, consider a specific juice icon if available
      return Wine; 
    // Add more cases as needed for other beverage types like 'soda', 'milk', etc.
    default:
      return Droplet; // Default icon for 'other' or unspecified types
  }
};

export default function HydrationLogListItem({ entry }: HydrationLogListItemProps) {
  const IconComponent = entry.icon || getIconForBeverage(entry.type);

  return (
    <div className="flex justify-between items-center p-3 bg-muted/50 hover:bg-muted/75 rounded-md transition-colors">
      <div className="flex items-center gap-3">
        <IconComponent className="h-5 w-5 text-blue-500" /> {/* Standardized icon color/styling */}
        <div>
          <p className="font-medium capitalize">{entry.type}</p>
          <p className="text-sm text-muted-foreground">{entry.amount} ml</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{entry.time}</p>
    </div>
  );
}
