
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Clock, Users, MapPin } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, isSameDay, isToday, parseISO } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample data
const events = [
  {
    id: 1,
    title: 'Client Meeting',
    date: '2023-11-15T10:00:00',
    endTime: '2023-11-15T11:30:00',
    type: 'meeting',
    location: 'Conference Room A',
    description: 'Discussion about new project requirements',
    attendees: ['Alex Johnson', 'Sarah Williams', 'Michael Brown'],
  },
  {
    id: 2,
    title: 'Product Demo',
    date: '2023-11-15T14:00:00',
    endTime: '2023-11-15T15:30:00',
    type: 'demo',
    location: 'Virtual Meeting',
    description: 'Demonstration of new software features to the client',
    attendees: ['Emily Davis', 'Jennifer Taylor'],
  },
  {
    id: 3,
    title: 'Team Standup',
    date: '2023-11-16T09:30:00',
    endTime: '2023-11-16T10:00:00',
    type: 'internal',
    location: 'Meeting Room B',
    description: 'Daily team standup meeting',
    attendees: ['All Team Members'],
  },
  {
    id: 4,
    title: 'Project Planning',
    date: '2023-11-17T13:00:00',
    endTime: '2023-11-17T15:00:00',
    type: 'planning',
    location: 'Meeting Room C',
    description: 'Quarterly project planning session',
    attendees: ['David Martinez', 'Linda Anderson', 'Robert Wilson'],
  },
  {
    id: 5,
    title: 'Sales Call',
    date: '2023-11-18T11:00:00',
    endTime: '2023-11-18T12:00:00',
    type: 'call',
    location: 'Phone',
    description: 'Call with potential client about new service offerings',
    attendees: ['Alex Johnson', 'Sarah Williams'],
  },
];

// Adjust dates to be relative to today
const adjustedEvents = events.map(event => {
  const today = new Date();
  const originalDate = parseISO(event.date);
  const dayDiff = 30; // Make events happen within the next month
  
  const newDate = new Date(today);
  newDate.setDate(today.getDate() + Math.floor(Math.random() * dayDiff));
  newDate.setHours(originalDate.getHours(), originalDate.getMinutes());
  
  const endDate = new Date(newDate);
  const endTimeOriginal = parseISO(event.endTime);
  const durationHours = endTimeOriginal.getHours() - originalDate.getHours();
  const durationMinutes = endTimeOriginal.getMinutes() - originalDate.getMinutes();
  
  endDate.setHours(endDate.getHours() + durationHours, endDate.getMinutes() + durationMinutes);
  
  return {
    ...event,
    date: newDate.toISOString(),
    endTime: endDate.toISOString(),
  };
});

// Add a few more events that happen today
const todayEvents = [
  {
    id: 6,
    title: 'Client Call',
    date: new Date().setHours(10, 0, 0, 0),
    endTime: new Date().setHours(11, 0, 0, 0),
    type: 'call',
    location: 'Phone',
    description: 'Follow-up call with client',
    attendees: ['Alex Johnson'],
  },
  {
    id: 7,
    title: 'Team Lunch',
    date: new Date().setHours(12, 30, 0, 0),
    endTime: new Date().setHours(13, 30, 0, 0),
    type: 'internal',
    location: 'Cafeteria',
    description: 'Team bonding lunch',
    attendees: ['All Team Members'],
  },
  {
    id: 8,
    title: 'Status Update',
    date: new Date().setHours(15, 0, 0, 0),
    endTime: new Date().setHours(16, 0, 0, 0),
    type: 'meeting',
    location: 'Conference Room B',
    description: 'Weekly status update meeting',
    attendees: ['Project Stakeholders'],
  },
].map(event => ({
  ...event,
  date: new Date(event.date).toISOString(),
  endTime: new Date(event.endTime).toISOString(),
}));

const allEvents = [...adjustedEvents, ...todayEvents];

const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

const eventColors: Record<string, string> = {
  meeting: 'bg-blue-100 text-blue-800',
  demo: 'bg-purple-100 text-purple-800',
  internal: 'bg-green-100 text-green-800',
  planning: 'bg-yellow-100 text-yellow-800',
  call: 'bg-red-100 text-red-800',
};

const AddEventDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogDescription>
          Create a new event or meeting in your calendar.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title</Label>
          <Input id="title" placeholder="Enter event title" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input id="date" type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Event Type</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="demo">Demo</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input id="startTime" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input id="endTime" type="time" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Enter location" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" placeholder="Add event description" className="h-20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="attendees">Attendees</Label>
          <Input id="attendees" placeholder="Add attendees (comma separated)" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save Event</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const EventDetailDialog: React.FC<{ event: any; isOpen: boolean; onClose: () => void }> = ({
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
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span>
            {format(startDate, 'MMMM d, yyyy')} · {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.location}</span>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{event.description}</p>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Attendees</h4>
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
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button>Edit Event</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const CalendarView: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState('week'); // 'day', 'week', 'month'
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  
  // Week view helper functions
  const currentWeekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday as week start
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
  
  // Find events for each day
  const getEventsForDay = (day: Date) => {
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, day);
    });
  };
  
  // Sort events by time for a given day
  const sortEventsByTime = (events: any[]) => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
        <p className="text-muted-foreground">
          Schedule meetings and manage your events.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={navigateToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={navigateToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={navigateToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="text-lg font-medium">
            {format(currentWeekStart, 'MMM d')} - {format(currentWeekEnd, 'MMM d, yyyy')}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Tabs 
            value={calendarView} 
            onValueChange={setCalendarView} 
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 whitespace-nowrap">
                <Plus className="h-4 w-4" />
                <span>Add Event</span>
              </Button>
            </DialogTrigger>
            <AddEventDialog 
              isOpen={isAddEventOpen} 
              onClose={() => setIsAddEventOpen(false)} 
            />
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="animate-fade-in">
          <CardContent className="p-0">
            <TabsContent value="day" className="m-0">
              <div className="text-center text-muted-foreground py-8">
                Day view is under development. Please use Week view for now.
              </div>
            </TabsContent>
            
            <TabsContent value="week" className="m-0">
              <div className="grid grid-cols-8 border-b">
                <div className="p-4 border-r"></div>
                {daysInWeek.map((day, i) => (
                  <div 
                    key={i} 
                    className={`p-4 text-center font-medium ${isToday(day) ? 'bg-primary/5' : ''}`}
                  >
                    <div>{format(day, 'EEE')}</div>
                    <div className={`text-xl ${isToday(day) ? 'bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                      {format(day, 'd')}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-8 h-[700px] overflow-auto">
                <div className="border-r">
                  {timeSlots.map((hour) => (
                    <div key={hour} className="h-20 border-b px-2 py-1 text-xs text-muted-foreground">
                      {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
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
                            <div className="truncate">{format(eventStart, 'h:mm a')} - {format(eventEnd, 'h:mm a')}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="month" className="m-0">
              <div className="text-center text-muted-foreground py-8">
                Month view is under development. Please use Week view for now.
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortEventsByTime(allEvents).slice(0, 5).map((event) => {
                const eventDate = new Date(event.date);
                const eventEnd = new Date(event.endTime);
                
                return (
                  <div key={event.id} className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-md transition-colors cursor-pointer" onClick={() => handleEventClick(event)}>
                    <div className="flex flex-col items-center justify-center rounded-md border p-2 text-center">
                      <span className="text-sm font-medium">{format(eventDate, 'MMM')}</span>
                      <span className="text-2xl font-bold">{format(eventDate, 'd')}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge variant="outline" className={`${eventColors[event.type]} mt-1`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Event</DropdownMenuItem>
                            <DropdownMenuItem>Delete Event</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{format(eventDate, 'h:mm a')} - {format(eventEnd, 'h:mm a')}</span>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Mini Calendar</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex justify-center">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border shadow-sm"
              disabled={{ before: new Date(2020, 0, 1) }}
            />
          </CardContent>
        </Card>
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
