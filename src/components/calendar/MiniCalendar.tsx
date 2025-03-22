
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { ptBR } from 'date-fns/locale';

interface MiniCalendarProps {
  date: Date;
  setDate: (date: Date) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ date, setDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mini Calendário</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex justify-center">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border shadow-sm pointer-events-auto"
          locale={ptBR}
          disabled={{ before: new Date(2020, 0, 1) }}
        />
      </CardContent>
    </Card>
  );
};

export default MiniCalendar;
