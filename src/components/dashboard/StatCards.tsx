
import React from 'react';
import { DollarSign, Users, Briefcase, Clock } from 'lucide-react';
import StatCard from './StatCard';

const StatCards: React.FC = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Receita Total" 
        value="R$ 128.430" 
        change="12,5%" 
        icon={<DollarSign className="h-5 w-5 text-green-500" />} 
      />
      <StatCard 
        title="Novos Contatos" 
        value="324" 
        change="8,2%" 
        icon={<Users className="h-5 w-5 text-green-500" />} 
      />
      <StatCard 
        title="Negócios Ganhos" 
        value="45" 
        change="5,7%" 
        icon={<Briefcase className="h-5 w-5 text-green-500" />} 
      />
      <StatCard 
        title="Tarefas Pendentes" 
        value="12" 
        change="2,3%" 
        icon={<Clock className="h-5 w-5 text-red-500" />}
        positive={false}
      />
    </div>
  );
};

export default StatCards;
