
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DealsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DealsHeader: React.FC<DealsHeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <TabsList>
        <TabsTrigger value="pipeline">Visualização Pipeline</TabsTrigger>
        <TabsTrigger value="stats">Estatísticas</TabsTrigger>
      </TabsList>
      
      <div className="flex w-full sm:w-auto items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar negócios..."
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
          <span>Adicionar Negócio</span>
        </Button>
      </div>
    </div>
  );
};

export default DealsHeader;
