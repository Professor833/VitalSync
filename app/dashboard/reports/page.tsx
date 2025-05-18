import React from 'react';
import ReportHeader from '@/components/reports/ReportHeader'; 
import HealthScoreSection from '@/components/reports/HealthScoreSection'; 
import HealthMetricsOverviewChart from '@/components/reports/HealthMetricsOverviewChart'; 
import SleepReportCard from '@/components/reports/SleepReportCard'; 
import HydrationReportCard from '@/components/reports/HydrationReportCard'; 
import FitnessReportCard from '@/components/reports/FitnessReportCard'; 
import MoodReportCard from '@/components/reports/MoodReportCard'; 
import CorrelationsSection from '@/components/reports/CorrelationsSection'; 
import PersonalizedRecommendationsSection from '@/components/reports/PersonalizedRecommendationsSection'; 

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <ReportHeader />
      <HealthScoreSection />
      <HealthMetricsOverviewChart />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <SleepReportCard />
        <HydrationReportCard />
        <FitnessReportCard />
        <MoodReportCard />
      </div>

      <CorrelationsSection />
      <PersonalizedRecommendationsSection />
    </div>
  );
}
