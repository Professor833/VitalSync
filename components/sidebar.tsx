import React from 'react';
import Link from 'next/link';
import { HeartPulse, Bed, Droplet, Dumbbell } from 'lucide-react'; // Added for Health Metrics, Sleep Tracker, Hydration Tracker, and Fitness Log

const Sidebar = () => {
  return (
    <aside className="w-64 bg-card text-card-foreground p-6 space-y-8 hidden md:flex md:flex-col">
      <div className="text-center">
        {/* You can replace this with a logo component or an img tag */}
        <Link href="/dashboard" className="text-3xl font-bold text-primary">
          VitalSync
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center space-x-3 py-2.5 px-4 rounded-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground text-muted-foreground hover:text-primary">
              {/* <Home className="h-5 w-5" /> */}
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/health-metrics" className="flex items-center space-x-3 py-2.5 px-4 rounded-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
              <HeartPulse className="h-5 w-5" />
              <span>Health Metrics</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/sleep-tracker" className="flex items-center space-x-3 py-2.5 px-4 rounded-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
              <Bed className="h-5 w-5" />
              <span>Sleep Tracker</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/hydration-tracker" className="flex items-center space-x-3 py-2.5 px-4 rounded-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
              <Droplet className="h-5 w-5" />
              <span>Hydration Tracker</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/fitness-log" className="flex items-center space-x-3 py-2.5 px-4 rounded-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
              <Dumbbell className="h-5 w-5" />
              <span>Fitness Log</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="flex items-center space-x-3 py-2.5 px-4 rounded-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
              {/* <User className="h-5 w-5" /> */}
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="flex items-center space-x-3 py-2.5 px-4 rounded-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground text-muted-foreground">
              {/* <Settings className="h-5 w-5" /> */}
              <span>Settings</span>
            </Link>
          </li>
          {/* Add more nav items here, e.g., for specific health metrics */}
        </ul>
      </nav>
      <div className="mt-auto text-center">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} VitalSync</p>
      </div>
    </aside>
  );
};

export default Sidebar;
