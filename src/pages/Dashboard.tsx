
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { ArrowUpRight, DollarSign, Users, Briefcase, CheckSquare, Clock } from 'lucide-react';

// Sample data
const revenueData = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 19000 },
  { name: 'Mar', value: 15000 },
  { name: 'Apr', value: 22000 },
  { name: 'May', value: 28000 },
  { name: 'Jun', value: 32000 },
];

const dealsData = [
  { name: 'Won', value: 45, color: '#4F46E5' },
  { name: 'Lost', value: 15, color: '#F43F5E' },
  { name: 'Pending', value: 40, color: '#FBBF24' },
];

const activitiesData = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 14 },
  { name: 'Thu', value: 22 },
  { name: 'Fri', value: 17 },
  { name: 'Sat', value: 8 },
  { name: 'Sun', value: 5 },
];

const recentActivities = [
  { id: 1, title: 'New contact added', time: '2 hours ago', type: 'contact' },
  { id: 2, title: 'Deal status changed to Won', time: '4 hours ago', type: 'deal' },
  { id: 3, title: 'Task completed', time: '6 hours ago', type: 'task' },
  { id: 4, title: 'Meeting scheduled', time: '1 day ago', type: 'calendar' },
  { id: 5, title: 'New deal created', time: '1 day ago', type: 'deal' },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}> = ({ title, value, change, icon, positive = true }) => (
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

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
        <p className="text-muted-foreground">
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value="$128,430" 
          change="12.5%" 
          icon={<DollarSign className="h-5 w-5 text-green-500" />} 
        />
        <StatCard 
          title="New Contacts" 
          value="324" 
          change="8.2%" 
          icon={<Users className="h-5 w-5 text-green-500" />} 
        />
        <StatCard 
          title="Deals Won" 
          value="45" 
          change="5.7%" 
          icon={<Briefcase className="h-5 w-5 text-green-500" />} 
        />
        <StatCard 
          title="Tasks Due" 
          value="12" 
          change="2.3%" 
          icon={<Clock className="h-5 w-5 text-red-500" />}
          positive={false}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="col-span-4 transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.97)'
                    }} 
                    formatter={(value) => [`$${value}`, 'Revenue']} 
                  />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Deals Status</CardTitle>
            <CardDescription>Distribution of deals by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dealsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {dealsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.97)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Activity Trends</CardTitle>
            <CardDescription>Daily activities over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activitiesData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.97)'
                    }} 
                    formatter={(value) => [value, 'Activities']} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
};

export default Dashboard;
