
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddEventDialog from './AddEventDialog';

interface CalendarHeaderProps {
  currentWeekStart: Date;
  currentWeekEnd: Date;
  navigateToPreviousWeek: () => void;
  navigateToNextWeek: () => void;
  navigateToToday: () => void;
  calendarView: string;
  setCalendarView: (view: string) => void;
  isAddEventOpen: boolean;
  setIsAddEventOpen: (isOpen: boolean) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentWeekStart,
  currentWeekEnd,
  navigateToPreviousWeek,
  navigateToNextWeek,
  navigateToToday,
  calendarView,
  setCalendarView,
  isAddEventOpen,
  setIsAddEventOpen,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={navigateToPreviousWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={navigateToToday}>
          Hoje
        </Button>
        <Button variant="outline" size="sm" onClick={navigateToNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="text-lg font-medium">
          {format(currentWeekStart, "d 'de' MMM", { locale: ptBR })} - {format(currentWeekEnd, "d 'de' MMM, yyyy", { locale: ptBR })}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Tabs 
          value={calendarView} 
          onValueChange={setCalendarView} 
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="day">Dia</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mês</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1 whitespace-nowrap">
              <Plus className="h-4 w-4" />
              <span>Adicionar Evento</span>
            </Button>
          </DialogTrigger>
          <AddEventDialog 
            isOpen={isAddEventOpen} 
            onClose={() => setIsAddEventOpen(false)} 
          />
        </Dialog>
      </div>
    </div>
  );
};

export default CalendarHeader;
