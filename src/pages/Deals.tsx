
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DollarSign,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Users,
  Calendar,
  Tag,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data
const pipelineStages = [
  { id: 'lead', name: 'Lead', color: 'bg-blue-500' },
  { id: 'qualified', name: 'Qualified', color: 'bg-purple-500' },
  { id: 'proposal', name: 'Proposal', color: 'bg-yellow-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-500' },
  { id: 'closed', name: 'Closed Won', color: 'bg-green-500' },
];

const deals = [
  {
    id: 1,
    title: 'Enterprise Software Package',
    value: 24500,
    company: 'TechNova Inc.',
    stage: 'proposal',
    probability: 70,
    owner: 'Alex Johnson',
    contact: 'Sarah Miller',
    closeDate: '2023-12-15',
  },
  {
    id: 2,
    title: 'Annual Support Contract',
    value: 12000,
    company: 'Global Solutions',
    stage: 'negotiation',
    probability: 85,
    owner: 'Emily Davis',
    contact: 'Robert Wilson',
    closeDate: '2023-11-30',
  },
  {
    id: 3,
    title: 'New Server Infrastructure',
    value: 65000,
    company: 'Innovative Corp',
    stage: 'qualified',
    probability: 45,
    owner: 'Michael Brown',
    contact: 'John Smith',
    closeDate: '2024-01-20',
  },
  {
    id: 4,
    title: 'Software Subscription Renewal',
    value: 8500,
    company: 'Elite Enterprises',
    stage: 'closed',
    probability: 100,
    owner: 'Alex Johnson',
    contact: 'Jennifer Taylor',
    closeDate: '2023-10-25',
  },
  {
    id: 5,
    title: 'Security Solution Upgrade',
    value: 32000,
    company: 'Prime Partners',
    stage: 'lead',
    probability: 25,
    owner: 'Sarah Williams',
    contact: 'David Martinez',
    closeDate: '2024-02-10',
  },
  {
    id: 6,
    title: 'Cloud Migration Project',
    value: 78000,
    company: 'Vision Ventures',
    stage: 'proposal',
    probability: 60,
    owner: 'Michael Brown',
    contact: 'Linda Anderson',
    closeDate: '2023-12-05',
  },
];

const DealCard: React.FC<{ deal: any }> = ({ deal }) => {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
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
            <DropdownMenuItem>Edit Deal</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Change Stage</DropdownMenuItem>
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
            <span>{new Date(deal.closeDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between items-center text-xs mb-1">
            <span>Probability</span>
            <span>{deal.probability}%</span>
          </div>
          <Progress value={deal.probability} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  );
};

const StageColumn: React.FC<{ stage: any; stageDeals: any[] }> = ({ stage, stageDeals }) => {
  const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
  
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
          <DealCard key={deal.id} deal={deal} />
        ))}
        
        <Button variant="ghost" className="w-full border border-dashed border-muted-foreground/20 py-6 text-muted-foreground hover:text-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>
    </div>
  );
};

const StatsCard: React.FC<{ title: string; value: string; subtitle: string; icon: React.ReactNode; color: string }> = ({
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Deals Pipeline</h2>
        <p className="text-muted-foreground">
          Manage your deals and track your sales pipeline.
        </p>
      </div>

      <Tabs defaultValue="pipeline" className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <div className="flex w-full sm:w-auto items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search deals..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="gap-1 whitespace-nowrap">
              <Plus className="h-4 w-4" />
              <span>Add Deal</span>
            </Button>
          </div>
        </div>

        <TabsContent value="pipeline" className="mt-0">
          <div className="bg-muted/30 rounded-lg p-6 overflow-auto hide-scrollbar">
            <div className="flex space-x-6">
              {dealsByStage.map(stage => (
                <StageColumn 
                  key={stage.id} 
                  stage={stage} 
                  stageDeals={stage.deals} 
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-0">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Deals;
