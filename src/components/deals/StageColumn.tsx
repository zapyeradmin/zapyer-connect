
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import DealCard from './DealCard';

interface Deal {
  id: number;
  title: string;
  value: number;
  company: string;
  stage: string;
  probability: number;
  owner: string;
  contact: string;
  closeDate: string;
}

interface Stage {
  id: string;
  name: string;
  color: string;
}

interface StageColumnProps {
  stage: Stage;
  stageDeals: Deal[];
  pipelineStages: Stage[];
}

const StageColumn: React.FC<StageColumnProps> = ({ stage, stageDeals, pipelineStages }) => {
  const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
  
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-w-[300px] rounded-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`}></div>
          <h3 className="font-medium">{stage.name}</h3>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {stageDeals.length}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {formatValue(totalValue)}
        </div>
      </div>
      
      <div className="space-y-3">
        {stageDeals.map(deal => (
          <DealCard key={deal.id} deal={deal} pipelineStages={pipelineStages} />
        ))}
        
        <Button variant="ghost" className="w-full border border-dashed border-muted-foreground/20 py-6 text-muted-foreground hover:text-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Negócio
        </Button>
      </div>
    </div>
  );
};

export default StageColumn;
