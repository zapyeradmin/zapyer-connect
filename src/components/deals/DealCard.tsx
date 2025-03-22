
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, MoreHorizontal, Users, Calendar } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

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

interface DealCardProps {
  deal: Deal;
  pipelineStages: Stage[];
}

const DealCard: React.FC<DealCardProps> = ({ deal, pipelineStages }) => {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return formatInTimeZone(
      new Date(dateString), 
      'America/Sao_Paulo', 
      'dd/MM/yyyy', 
      { locale: ptBR }
    );
  };

  const stage = pipelineStages.find(s => s.id === deal.stage);

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-md group">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-base">{deal.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{deal.company}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Editar Negócio</DropdownMenuItem>
            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
            <DropdownMenuItem>Mudar Estágio</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center my-1">
          <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
          <span className="font-medium">{formatValue(deal.value)}</span>
          <Badge variant="outline" className="ml-2 text-xs bg-opacity-10" style={{
            backgroundColor: stage ? `${stage.color}20` : undefined,
            color: stage ? stage.color.replace('bg-', 'text-') : undefined
          }}>
            {stage?.name}
          </Badge>
        </div>
        
        <div className="mt-3 text-sm text-muted-foreground">
          <div className="flex items-center mb-1">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span className="truncate">{deal.contact}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(deal.closeDate)}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between items-center text-xs mb-1">
            <span>Probabilidade</span>
            <span>{deal.probability}%</span>
          </div>
          <Progress value={deal.probability} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DealCard;
