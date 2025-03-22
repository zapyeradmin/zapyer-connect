
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MoreHorizontal, Clock, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NextEventsProps {
  events: any[];
  sortEventsByTime: (events: any[]) => any[];
  handleEventClick: (event: any) => void;
  eventColors: Record<string, string>;
  eventTypeLabels: Record<string, string>;
}

const NextEvents: React.FC<NextEventsProps> = ({
  events,
  sortEventsByTime,
  handleEventClick,
  eventColors,
  eventTypeLabels,
}) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Próximos Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortEventsByTime(events).slice(0, 5).map((event) => {
            const eventDate = new Date(event.date);
            const eventEnd = new Date(event.endTime);
            
            return (
              <div key={event.id} className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-md transition-colors cursor-pointer" onClick={() => handleEventClick(event)}>
                <div className="flex flex-col items-center justify-center rounded-md border p-2 text-center">
                  <span className="text-sm font-medium">{format(eventDate, 'MMM', { locale: ptBR })}</span>
                  <span className="text-2xl font-bold">{format(eventDate, 'd')}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant="outline" className={`${eventColors[event.type]} mt-1`}>
                        {eventTypeLabels[event.type] || event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar Evento</DropdownMenuItem>
                        <DropdownMenuItem>Excluir Evento</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{format(eventDate, "HH'h'mm", { locale: ptBR })} - {format(eventEnd, "HH'h'mm", { locale: ptBR })}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default NextEvents;
