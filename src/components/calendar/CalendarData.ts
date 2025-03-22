
import { parseISO } from 'date-fns';

// Tipos de evento traduzidos
export const eventTypeLabels: Record<string, string> = {
  meeting: 'Reunião',
  demo: 'Demonstração',
  internal: 'Interno',
  planning: 'Planejamento',
  call: 'Ligação',
};

export const eventColors: Record<string, string> = {
  meeting: 'bg-blue-100 text-blue-800',
  demo: 'bg-purple-100 text-purple-800',
  internal: 'bg-green-100 text-green-800',
  planning: 'bg-yellow-100 text-yellow-800',
  call: 'bg-red-100 text-red-800',
};

// Dados de exemplo
const events = [
  {
    id: 1,
    title: 'Reunião com Cliente',
    date: '2023-11-15T10:00:00',
    endTime: '2023-11-15T11:30:00',
    type: 'meeting',
    location: 'Sala de Conferência A',
    description: 'Discussão sobre requisitos do novo projeto',
    attendees: ['Alex Silva', 'Sarah Costa', 'Miguel Santos'],
  },
  {
    id: 2,
    title: 'Demo de Produto',
    date: '2023-11-15T14:00:00',
    endTime: '2023-11-15T15:30:00',
    type: 'demo',
    location: 'Reunião Virtual',
    description: 'Demonstração dos novos recursos do software para o cliente',
    attendees: ['Emília Dias', 'Jennifer Taylor'],
  },
  {
    id: 3,
    title: 'Reunião de Equipe',
    date: '2023-11-16T09:30:00',
    endTime: '2023-11-16T10:00:00',
    type: 'internal',
    location: 'Sala de Reuniões B',
    description: 'Reunião diária da equipe',
    attendees: ['Todos os Membros da Equipe'],
  },
  {
    id: 4,
    title: 'Planejamento de Projeto',
    date: '2023-11-17T13:00:00',
    endTime: '2023-11-17T15:00:00',
    type: 'planning',
    location: 'Sala de Reuniões C',
    description: 'Sessão trimestral de planejamento de projeto',
    attendees: ['David Martinez', 'Linda Oliveira', 'Roberto Wilson'],
  },
  {
    id: 5,
    title: 'Ligação de Vendas',
    date: '2023-11-18T11:00:00',
    endTime: '2023-11-18T12:00:00',
    type: 'call',
    location: 'Telefone',
    description: 'Ligação com cliente potencial sobre novos serviços',
    attendees: ['Alex Silva', 'Sarah Costa'],
  },
];

// Ajustar datas para serem relativas à data atual
export const adjustedEvents = events.map(event => {
  const today = new Date();
  const originalDate = parseISO(event.date);
  const dayDiff = 30; // Eventos ocorrem dentro do próximo mês
  
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

// Adicionar alguns eventos para hoje
const todayEvents = [
  {
    id: 6,
    title: 'Ligação com Cliente',
    date: new Date().setHours(10, 0, 0, 0),
    endTime: new Date().setHours(11, 0, 0, 0),
    type: 'call',
    location: 'Telefone',
    description: 'Ligação de acompanhamento com cliente',
    attendees: ['Alex Silva'],
  },
  {
    id: 7,
    title: 'Almoço em Equipe',
    date: new Date().setHours(12, 30, 0, 0),
    endTime: new Date().setHours(13, 30, 0, 0),
    type: 'internal',
    location: 'Cafeteria',
    description: 'Almoço de integração da equipe',
    attendees: ['Todos os Membros da Equipe'],
  },
  {
    id: 8,
    title: 'Atualização de Status',
    date: new Date().setHours(15, 0, 0, 0),
    endTime: new Date().setHours(16, 0, 0, 0),
    type: 'meeting',
    location: 'Sala de Conferência B',
    description: 'Reunião semanal de atualização de status',
    attendees: ['Partes Interessadas do Projeto'],
  },
].map(event => ({
  ...event,
  date: new Date(event.date).toISOString(),
  endTime: new Date(event.endTime).toISOString(),
}));

export const allEvents = [...adjustedEvents, ...todayEvents];

export const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8h às 19h
