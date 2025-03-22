
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import RevenueChart from '@/components/dashboard/RevenueChart';
import DealsChart from '@/components/dashboard/DealsChart';
import ActivityTrends from '@/components/dashboard/ActivityTrends';
import RecentActivities from '@/components/dashboard/RecentActivities';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 pb-10">
      <DashboardHeader 
        title="Welcome back, Admin" 
        subtitle="Here's what's happening with your business today." 
      />

      <StatCards />

      <div className="grid gap-6 lg:grid-cols-7">
        <RevenueChart />
        <DealsChart />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ActivityTrends />
        <RecentActivities />
      </div>
    </div>
  );
};

export default Dashboard;
