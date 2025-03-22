
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, CheckSquare, Calendar } from 'lucide-react';

// Sample data
const recentActivities = [
  { id: 1, title: 'New contact added', time: '2 hours ago', type: 'contact' },
  { id: 2, title: 'Deal status changed to Won', time: '4 hours ago', type: 'deal' },
  { id: 3, title: 'Task completed', time: '6 hours ago', type: 'task' },
  { id: 4, title: 'Meeting scheduled', time: '1 day ago', type: 'calendar' },
  { id: 5, title: 'New deal created', time: '1 day ago', type: 'deal' },
];

const RecentActivities: React.FC = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest updates from your CRM</CardDescription>
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
