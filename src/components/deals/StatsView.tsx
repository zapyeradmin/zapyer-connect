
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, Tag } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className={`rounded-full p-2 ${color}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

interface StatsViewProps {
  totalValue: number;
  totalDeals: number;
  avgDealSize: number;
  wonDeals: number;
  formatValue: (value: number) => string;
}

const StatsView: React.FC<StatsViewProps> = ({ 
  totalValue, 
  totalDeals, 
  avgDealSize, 
  wonDeals,
  formatValue 
}) => {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Pipeline Value" 
          value={formatValue(totalValue)}
          subtitle="Across all deals" 
          icon={<DollarSign className="h-5 w-5 text-green-500" />} 
          color="bg-green-100"
        />
        <StatsCard 
          title="Open Deals" 
          value={totalDeals.toString()}
          subtitle="In your pipeline" 
          icon={<Tag className="h-5 w-5 text-blue-500" />} 
          color="bg-blue-100"
        />
        <StatsCard 
          title="Average Deal Size" 
          value={formatValue(avgDealSize)}
          subtitle="Per transaction" 
          icon={<DollarSign className="h-5 w-5 text-purple-500" />} 
          color="bg-purple-100"
        />
        <StatsCard 
          title="Won Deals" 
          value={wonDeals.toString()}
          subtitle="Successfully closed" 
          icon={<Tag className="h-5 w-5 text-green-500" />} 
          color="bg-green-100"
        />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Deal Table View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              This view is under development. Check back soon for the complete analytics view.
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StatsView;
