
import React from 'react';
import { format, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface WeekViewProps {
  daysInWeek: Date[];
  timeSlots: number[];
  getEventsForDay: (day: Date) => any[];
  sortEventsByTime: (events: any[]) => any[];
  handleEventClick: (event: any) => void;
  eventColors: Record<string, string>;
}

const WeekView: React.FC<WeekViewProps> = ({
  daysInWeek,
  timeSlots,
  getEventsForDay,
  sortEventsByTime,
  handleEventClick,
  eventColors,
}) => {
  return (
    <div className="grid grid-cols-8 h-[700px] overflow-auto">
      <div className="border-r">
        {timeSlots.map((hour) => (
          <div key={hour} className="h-20 border-b px-2 py-1 text-xs text-muted-foreground">
            {hour === 12 ? '12h' : hour < 12 ? `${hour}h` : `${hour - 12}h`}
          </div>
        ))}
      </div>
      
      {daysInWeek.map((day, dayIndex) => {
        const dayEvents = sortEventsByTime(getEventsForDay(day));
        
        return (
          <div 
            key={dayIndex} 
            className={`relative border-r ${isToday(day) ? 'bg-primary/5' : ''}`}
          >
            {timeSlots.map((hour) => (
              <div key={hour} className="h-20 border-b"></div>
            ))}
            
            {dayEvents.map((event) => {
              const eventStart = new Date(event.date);
              const eventStartHour = eventStart.getHours();
              const eventStartMinute = eventStart.getMinutes();
              
              const eventEnd = new Date(event.endTime);
              const eventEndHour = eventEnd.getHours();
              const eventEndMinute = eventEnd.getMinutes();
              
              const startTimeInMinutes = (eventStartHour - 8) * 60 + eventStartMinute;
              const durationInMinutes = 
                (eventEndHour * 60 + eventEndMinute) - 
                (eventStartHour * 60 + eventStartMinute);
              
              const top = (startTimeInMinutes / 60) * 5;
              const height = (durationInMinutes / 60) * 5;
              
              return (
                <div
                  key={event.id}
                  className={`absolute left-1 right-1 px-2 py-1 rounded-md shadow-sm text-xs overflow-hidden cursor-pointer transition-transform hover:scale-[1.01] ${eventColors[event.type]}`}
                  style={{
                    top: `${top}rem`,
                    height: `${height}rem`,
                  }}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="font-medium truncate">{event.title}</div>
                  <div className="truncate">{format(eventStart, "HH'h'mm", { locale: ptBR })} - {format(eventEnd, "HH'h'mm", { locale: ptBR })}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WeekView;
