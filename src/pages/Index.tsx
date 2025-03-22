
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatCards from '@/components/dashboard/StatCards';
import RevenueChart from '@/components/dashboard/RevenueChart';
import ActivityTrends from '@/components/dashboard/ActivityTrends';
import RecentActivities from '@/components/dashboard/RecentActivities';

const Index: React.FC = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Painel Principal</h2>
        <p className="text-muted-foreground">
          Bem-vindo ao seu dashboard de CRM. Veja seus principais indicadores e atividades recentes.
        </p>
      </div>

      <StatCards />
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <RevenueChart />
        <ActivityTrends />
        <RecentActivities />
      </div>
    </div>
  );
};

export default Index;
