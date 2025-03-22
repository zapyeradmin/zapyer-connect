
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  format,
  addWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from 'date-fns';
import { Dialog } from '@/components/ui/dialog';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Componentes importados após a refatoração
import CalendarHeader from '@/components/calendar/CalendarHeader';
import DayHeader from '@/components/calendar/DayHeader';
import WeekView from '@/components/calendar/WeekView';
import NextEvents from '@/components/calendar/NextEvents';
import MiniCalendar from '@/components/calendar/MiniCalendar';
import EventDetailDialog from '@/components/calendar/EventDetailDialog';
import { allEvents, timeSlots, eventColors, eventTypeLabels } from '@/components/calendar/CalendarData';

const CalendarView: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState('week'); // 'day', 'week', 'month'
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const { toast } = useToast();
  
  // Funções auxiliares da visualização semanal
  const currentWeekStart = startOfWeek(date, { weekStartsOn: 1 }); // Segunda-feira como início da semana
  const currentWeekEnd = endOfWeek(date, { weekStartsOn: 1 });
  const daysInWeek = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });
  
  const navigateToPreviousWeek = () => {
    setDate(addWeeks(date, -1));
  };
  
  const navigateToNextWeek = () => {
    setDate(addWeeks(date, 1));
  };
  
  const navigateToToday = () => {
    setDate(new Date());
  };
  
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsEventDetailOpen(true);
  };
  
  // Encontrar eventos para cada dia
  const getEventsForDay = (day: Date) => {
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, day);
    });
  };
  
  // Ordenar eventos por hora para um determinado dia
  const sortEventsByTime = (events: any[]) => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Calendário</h2>
        <p className="text-muted-foreground">
          Agende reuniões e gerencie seus eventos.
        </p>
      </div>
      
      <CalendarHeader 
        currentWeekStart={currentWeekStart}
        currentWeekEnd={currentWeekEnd}
        navigateToPreviousWeek={navigateToPreviousWeek}
        navigateToNextWeek={navigateToNextWeek}
        navigateToToday={navigateToToday}
        calendarView={calendarView}
        setCalendarView={setCalendarView}
        isAddEventOpen={isAddEventOpen}
        setIsAddEventOpen={setIsAddEventOpen}
      />
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="animate-fade-in">
          <CardContent className="p-0">
            <Tabs value={calendarView}>
              <TabsContent value="day" className="m-0">
                <div className="text-center text-muted-foreground py-8">
                  Visualização diária em desenvolvimento. Por favor, use a visualização semanal por enquanto.
                </div>
              </TabsContent>
              
              <TabsContent value="week" className="m-0">
                <DayHeader daysInWeek={daysInWeek} />
                
                <WeekView 
                  daysInWeek={daysInWeek}
                  timeSlots={timeSlots}
                  getEventsForDay={getEventsForDay}
                  sortEventsByTime={sortEventsByTime}
                  handleEventClick={handleEventClick}
                  eventColors={eventColors}
                />
              </TabsContent>
              
              <TabsContent value="month" className="m-0">
                <div className="text-center text-muted-foreground py-8">
                  Visualização mensal em desenvolvimento. Por favor, use a visualização semanal por enquanto.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <NextEvents 
          events={allEvents}
          sortEventsByTime={sortEventsByTime}
          handleEventClick={handleEventClick}
          eventColors={eventColors}
          eventTypeLabels={eventTypeLabels}
        />
        
        <MiniCalendar date={date} setDate={setDate} />
      </div>
      
      <Dialog open={isEventDetailOpen} onOpenChange={setIsEventDetailOpen}>
        {selectedEvent && (
          <EventDetailDialog 
            event={selectedEvent} 
            isOpen={isEventDetailOpen} 
            onClose={() => setIsEventDetailOpen(false)} 
          />
        )}
      </Dialog>
    </div>
  );
};

export default CalendarView;
