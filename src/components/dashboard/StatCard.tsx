
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  positive = true 
}) => (
  <Card className="transition-all duration-300 hover:shadow-md">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div className={`rounded-full p-2 ${positive ? 'bg-green-100' : 'bg-red-100'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <div className={`mr-2 text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
          <ArrowUpRight className="inline h-4 w-4" /> {change}
        </div>
        <div className="text-xs text-muted-foreground">compared to last month</div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
