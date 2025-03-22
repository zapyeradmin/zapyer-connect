
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, CheckSquare, Calendar } from 'lucide-react';

// Dados de exemplo
const recentActivities = [
  { id: 1, title: 'Novo contato adicionado', time: 'há 2 horas', type: 'contact' },
  { id: 2, title: 'Status do negócio alterado para Ganho', time: 'há 4 horas', type: 'deal' },
  { id: 3, title: 'Tarefa completada', time: 'há 6 horas', type: 'task' },
  { id: 4, title: 'Reunião agendada', time: 'há 1 dia', type: 'calendar' },
  { id: 5, title: 'Novo negócio criado', time: 'há 1 dia', type: 'deal' },
];

const RecentActivities: React.FC = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>Últimas atualizações do seu CRM</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 overflow-auto">
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex items-start space-x-4 rounded-md p-2 transition-colors hover:bg-muted/50">
                <div className="rounded-full p-2 bg-primary/10">
                  {activity.type === 'contact' && <Users className="h-4 w-4 text-primary" />}
                  {activity.type === 'deal' && <DollarSign className="h-4 w-4 text-primary" />}
                  {activity.type === 'task' && <CheckSquare className="h-4 w-4 text-primary" />}
                  {activity.type === 'calendar' && <Calendar className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
