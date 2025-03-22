
import React from 'react';
import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DayHeaderProps {
  daysInWeek: Date[];
}

const DayHeader: React.FC<DayHeaderProps> = ({ daysInWeek }) => {
  return (
    <div className="grid grid-cols-8 border-b">
      <div className="p-4 border-r flex items-center justify-center">
        <img src="/zapyer-logo.png" alt="Zapyer Logo" className="h-8 w-auto" />
      </div>
      {daysInWeek.map((day, i) => (
        <div 
          key={i} 
          className={`p-4 text-center font-medium ${isToday(day) ? 'bg-primary/5' : ''}`}
        >
          <div>{format(day, 'EEE', { locale: ptBR })}</div>
          <div className={`text-xl ${isToday(day) ? 'bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
            {format(day, 'd')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayHeader;
