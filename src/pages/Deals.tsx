
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DealsHeader from '@/components/deals/DealsHeader';
import PipelineView from '@/components/deals/PipelineView';
import StatsView from '@/components/deals/StatsView';
import { pipelineStages, deals } from '@/data/dealsData';

const Deals: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dealsByStage = pipelineStages.map(stage => ({
    ...stage,
    deals: filteredDeals.filter(deal => deal.stage === stage.id)
  }));

  const totalDeals = filteredDeals.length;
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const avgDealSize = totalDeals > 0 ? totalValue / totalDeals : 0;
  const wonDeals = filteredDeals.filter(deal => deal.stage === 'closed').length;
  
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 pb-10">
      <DashboardHeader
        title="Pipeline de Negócios"
        subtitle="Gerencie seus negócios e acompanhe seu pipeline de vendas."
      />

      <Tabs defaultValue="pipeline" className="w-full">
        <DealsHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <TabsContent value="pipeline" className="mt-0">
          <PipelineView 
            dealsByStage={dealsByStage} 
            pipelineStages={pipelineStages} 
          />
        </TabsContent>

        <TabsContent value="stats" className="mt-0">
          <StatsView
            totalValue={totalValue}
            totalDeals={totalDeals}
            avgDealSize={avgDealSize}
            wonDeals={wonDeals}
            formatValue={formatValue}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Deals;
