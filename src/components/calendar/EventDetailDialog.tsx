
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

// Tipos de evento traduzidos
const eventTypeLabels: Record<string, string> = {
  meeting: 'Reunião',
  demo: 'Demonstração',
  internal: 'Interno',
  planning: 'Planejamento',
  call: 'Ligação',
};

const eventColors: Record<string, string> = {
  meeting: 'bg-blue-100 text-blue-800',
  demo: 'bg-purple-100 text-purple-800',
  internal: 'bg-green-100 text-green-800',
  planning: 'bg-yellow-100 text-yellow-800',
  call: 'bg-red-100 text-red-800',
};

interface EventDetailDialogProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailDialog: React.FC<EventDetailDialogProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!event) return null;
  
  const startDate = new Date(event.date);
  const endDate = new Date(event.endTime);
  
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
        <DialogDescription>
          <Badge variant="outline" className={eventColors[event.type]}>
            {eventTypeLabels[event.type] || event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span>
            {format(startDate, "d 'de' MMMM, yyyy", { locale: ptBR })} · {format(startDate, "HH'h'mm", { locale: ptBR })} - {format(endDate, "HH'h'mm", { locale: ptBR })}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.location}</span>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Descrição</h4>
          <p className="text-sm text-muted-foreground">{event.description}</p>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Participantes</h4>
          <div className="flex flex-wrap gap-2">
            {event.attendees.map((attendee: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 rounded-full bg-muted px-3 py-1 text-sm">
                <Avatar className="h-5 w-5">
                  <AvatarFallback>{attendee.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{attendee}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Fechar</Button>
        <Button>Editar Evento</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default EventDetailDialog;
