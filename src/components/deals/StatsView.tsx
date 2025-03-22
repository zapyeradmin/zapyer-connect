
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
          title="Valor Total do Pipeline" 
          value={formatValue(totalValue)}
          subtitle="Em todos os negócios" 
          icon={<DollarSign className="h-5 w-5 text-green-500" />} 
          color="bg-green-100"
        />
        <StatsCard 
          title="Negócios Abertos" 
          value={totalDeals.toString()}
          subtitle="No seu pipeline" 
          icon={<Tag className="h-5 w-5 text-blue-500" />} 
          color="bg-blue-100"
        />
        <StatsCard 
          title="Tamanho Médio do Negócio" 
          value={formatValue(avgDealSize)}
          subtitle="Por transação" 
          icon={<DollarSign className="h-5 w-5 text-purple-500" />} 
          color="bg-purple-100"
        />
        <StatsCard 
          title="Negócios Ganhos" 
          value={wonDeals.toString()}
          subtitle="Fechados com sucesso" 
          icon={<Tag className="h-5 w-5 text-green-500" />} 
          color="bg-green-100"
        />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Visualização de Tabela de Negócios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              Esta visualização está em desenvolvimento. Volte em breve para a visualização completa de análises.
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StatsView;
