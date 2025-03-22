
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  PlusCircle, 
  Search, 
  Calendar as CalendarIcon, 
  Clock, 
  Tag, 
  User, 
  ChevronDown, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Dados simulados de tarefas
const initialTasks = [
  {
    id: 1,
    title: 'Reunião com cliente ABC',
    description: 'Discutir proposta de serviços e preços',
    status: 'pendente',
    priority: 'alta',
    dueDate: new Date(2023, 10, 15, 14, 30),
    assignee: 'João Silva',
    tags: ['reunião', 'cliente', 'proposta'],
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Preparar apresentação comercial',
    description: 'Criar slides para apresentação do novo produto',
    status: 'em-progresso',
    priority: 'média',
    dueDate: new Date(2023, 10, 17, 9, 0),
    assignee: 'Maria Oliveira',
    tags: ['apresentação', 'marketing'],
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Enviar follow-up para clientes',
    description: 'Enviar e-mails de follow-up para clientes após a feira',
    status: 'pendente',
    priority: 'baixa',
    dueDate: new Date(2023, 10, 20, 17, 0),
    assignee: 'Carlos Santos',
    tags: ['email', 'follow-up'],
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Revisar contrato com fornecedor',
    description: 'Revisar termos e condições do contrato',
    status: 'pendente',
    priority: 'alta',
    dueDate: new Date(2023, 10, 16, 11, 0),
    assignee: 'Ana Costa',
    tags: ['contrato', 'jurídico'],
    isCompleted: false,
  },
  {
    id: 5,
    title: 'Atualizar base de dados de clientes',
    description: 'Corrigir informações e adicionar novos contatos',
    status: 'completa',
    priority: 'média',
    dueDate: new Date(2023, 10, 10, 15, 0),
    assignee: 'Pedro Alves',
    tags: ['banco de dados', 'clientes'],
    isCompleted: true,
  },
];

// Hoje e amanhã para ajustes de data
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

// Ajustar datas para serem relativas à data atual
const adjustedTasks = initialTasks.map(task => {
  const randomDays = Math.floor(Math.random() * 7) - 3; // Entre -3 e 3 dias
  const newDate = new Date();
  newDate.setDate(today.getDate() + randomDays);
  newDate.setHours(task.dueDate.getHours(), task.dueDate.getMinutes());
  
  return { ...task, dueDate: newDate };
});

// Função para formatar a prioridade
const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'alta':
      return <Badge variant="outline" className="bg-red-100 text-red-800">Alta</Badge>;
    case 'média':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Média</Badge>;
    case 'baixa':
      return <Badge variant="outline" className="bg-green-100 text-green-800">Baixa</Badge>;
    default:
      return <Badge variant="outline">Normal</Badge>;
  }
};

// Função para formatar o status
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pendente':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">Pendente</Badge>;
    case 'em-progresso':
      return <Badge variant="outline" className="bg-purple-100 text-purple-800">Em Progresso</Badge>;
    case 'completa':
      return <Badge variant="outline" className="bg-green-100 text-green-800">Completa</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

// Componente para criar ou editar tarefa
const TaskFormDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  editTask?: any;
}> = ({ isOpen, onClose, onSave, editTask }) => {
  const [task, setTask] = useState(
    editTask || {
      title: '',
      description: '',
      status: 'pendente',
      priority: 'média',
      dueDate: new Date(),
      assignee: '',
      tags: [],
      isCompleted: false,
    }
  );

  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !task.tags.includes(tagInput.trim())) {
      setTask({ ...task, tags: [...task.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTask({ ...task, tags: task.tags.filter((tag: string) => tag !== tagToRemove) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(task);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[550px]">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{editTask ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
          <DialogDescription>
            {editTask 
              ? 'Edite os detalhes da tarefa existente.' 
              : 'Preencha os detalhes para criar uma nova tarefa.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              value={task.title} 
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Título da tarefa" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              value={task.description} 
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Descreva a tarefa" 
              className="min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={task.status} 
                onValueChange={(value) => setTask({ ...task, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em-progresso">Em Progresso</SelectItem>
                  <SelectItem value="completa">Completa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select 
                value={task.priority} 
                onValueChange={(value) => setTask({ ...task, priority: value })}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="média">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Vencimento</Label>
              <Input 
                id="dueDate" 
                type="datetime-local" 
                value={task.dueDate ? new Date(task.dueDate).toISOString().slice(0, -8) : ''}
                onChange={(e) => setTask({ ...task, dueDate: new Date(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignee">Responsável</Label>
              <Select 
                value={task.assignee} 
                onValueChange={(value) => setTask({ ...task, assignee: value })}
              >
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="João Silva">João Silva</SelectItem>
                  <SelectItem value="Maria Oliveira">Maria Oliveira</SelectItem>
                  <SelectItem value="Carlos Santos">Carlos Santos</SelectItem>
                  <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                  <SelectItem value="Pedro Alves">Pedro Alves</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input 
                id="tags" 
                value={tagInput} 
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Adicionar tag" 
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag}>Adicionar</Button>
            </div>
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {task.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <button 
                      type="button" 
                      className="ml-1 text-xs hover:text-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ✕
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{editTask ? 'Salvar Alterações' : 'Criar Tarefa'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState(adjustedTasks);
  const [filter, setFilter] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const { toast } = useToast();

  const handleToggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: !task.isCompleted, status: !task.isCompleted ? 'completa' : 'pendente' } 
        : task
    ));
  };

  const handleAddTask = (newTask: any) => {
    const taskToAdd = {
      ...newTask,
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    };
    setTasks([...tasks, taskToAdd]);
    toast({
      title: "Tarefa criada",
      description: "A nova tarefa foi criada com sucesso.",
    });
  };

  const handleEditTask = (taskId: number) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setShowAddTaskDialog(true);
    }
  };

  const handleUpdateTask = (updatedTask: any) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
    toast({
      title: "Tarefa atualizada",
      description: "A tarefa foi atualizada com sucesso.",
    });
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Tarefa removida",
      description: "A tarefa foi removida com sucesso.",
    });
  };

  // Filtragem de tarefas
  const filteredTasks = tasks.filter(task => {
    // Filtro por status
    if (filter === 'pendentes' && task.isCompleted) return false;
    if (filter === 'completas' && !task.isCompleted) return false;
    if (filter === 'alta-prioridade' && task.priority !== 'alta') return false;
    if (filter === 'hoje') {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      );
    }

    // Filtro por termo de busca
    if (searchTerm) {
      return (
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return true;
  });

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Tarefas</h2>
        <p className="text-muted-foreground">
          Gerencie suas tarefas e acompanhe o progresso das atividades.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar tarefas..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select defaultValue="todas" onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filtrar" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as tarefas</SelectItem>
              <SelectItem value="pendentes">Pendentes</SelectItem>
              <SelectItem value="completas">Completas</SelectItem>
              <SelectItem value="alta-prioridade">Alta prioridade</SelectItem>
              <SelectItem value="hoje">Para hoje</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
            <DialogTrigger asChild>
              <Button className="whitespace-nowrap">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Tarefa
              </Button>
            </DialogTrigger>
            <TaskFormDialog 
              isOpen={showAddTaskDialog} 
              onClose={() => {
                setShowAddTaskDialog(false);
                setEditingTask(null);
              }}
              onSave={editingTask ? handleUpdateTask : handleAddTask}
              editTask={editingTask}
            />
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList>
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lista" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div key={task.id} className="flex items-start p-4 gap-3 hover:bg-muted/50 transition-colors">
                      <Checkbox 
                        checked={task.isCompleted} 
                        onCheckedChange={() => handleToggleTask(task.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-medium ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </h4>
                            
                            <p className="text-sm text-muted-foreground mt-1">
                              {task.description}
                            </p>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditTask(task.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            <span>
                              {format(new Date(task.dueDate), "dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR })}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-xs text-muted-foreground">
                            <User className="mr-1 h-3 w-3" />
                            <span>{task.assignee}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(task.status)}
                          {getPriorityBadge(task.priority)}
                          
                          {task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 ml-1">
                              {task.tags.map((tag: string) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAddTaskDialog(true)} 
                      className="mt-4"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Criar Tarefa
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            
            {filteredTasks.length > 0 && (
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <div className="text-sm text-muted-foreground">
                  Exibindo {filteredTasks.length} de {tasks.length} tarefas
                </div>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="calendario">
          <Card>
            <CardHeader>
              <CardTitle>Visualização de Calendário</CardTitle>
              <CardDescription>
                Visualize suas tarefas em formato de calendário.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">
                  Visualização de calendário em desenvolvimento. Por favor, use a visualização em lista.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TasksPage;
