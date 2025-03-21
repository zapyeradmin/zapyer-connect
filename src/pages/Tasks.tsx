
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  CheckSquare,
  Clock,
  User,
  ChevronDown,
  Tag,
  X,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { format, addDays } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data
const tasks = [
  {
    id: 1,
    title: 'Prepare client presentation',
    description: 'Create slides for the upcoming client presentation',
    status: 'in-progress',
    priority: 'high',
    dueDate: addDays(new Date(), 2).toISOString(),
    assignee: 'Alex Johnson',
    tags: ['presentation', 'client'],
    completed: false,
  },
  {
    id: 2,
    title: 'Follow up with leads',
    description: 'Email potential clients from last week\'s conference',
    status: 'to-do',
    priority: 'medium',
    dueDate: addDays(new Date(), 1).toISOString(),
    assignee: 'Sarah Williams',
    tags: ['leads', 'sales'],
    completed: false,
  },
  {
    id: 3,
    title: 'Update CRM database',
    description: 'Add new contacts and update existing records',
    status: 'completed',
    priority: 'low',
    dueDate: addDays(new Date(), -1).toISOString(),
    assignee: 'Michael Brown',
    tags: ['crm', 'admin'],
    completed: true,
  },
  {
    id: 4,
    title: 'Prepare monthly report',
    description: 'Compile sales data and create monthly performance report',
    status: 'in-progress',
    priority: 'high',
    dueDate: addDays(new Date(), 3).toISOString(),
    assignee: 'Emily Davis',
    tags: ['report', 'monthly'],
    completed: false,
  },
  {
    id: 5,
    title: 'Schedule team meeting',
    description: 'Coordinate a time for the team to discuss project updates',
    status: 'to-do',
    priority: 'medium',
    dueDate: addDays(new Date(), 4).toISOString(),
    assignee: 'Robert Wilson',
    tags: ['meeting', 'team'],
    completed: false,
  },
  {
    id: 6,
    title: 'Review contract details',
    description: 'Go through contract terms before client meeting',
    status: 'to-do',
    priority: 'high',
    dueDate: addDays(new Date(), 2).toISOString(),
    assignee: 'Jennifer Taylor',
    tags: ['legal', 'contract'],
    completed: false,
  },
  {
    id: 7,
    title: 'Send invoice to client',
    description: 'Generate and send invoice for completed project',
    status: 'completed',
    priority: 'medium',
    dueDate: addDays(new Date(), -2).toISOString(),
    assignee: 'David Martinez',
    tags: ['invoice', 'finance'],
    completed: true,
  },
  {
    id: 8,
    title: 'Create social media content',
    description: 'Design and schedule posts for next week',
    status: 'in-progress',
    priority: 'low',
    dueDate: addDays(new Date(), 5).toISOString(),
    assignee: 'Linda Anderson',
    tags: ['marketing', 'social'],
    completed: false,
  },
];

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

const statusColors: Record<string, string> = {
  'to-do': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  'completed': 'bg-green-100 text-green-800',
};

const AddTaskDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Add New Task</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Task Title</Label>
          <Input id="title" placeholder="Enter task title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input 
            id="description" 
            placeholder="Enter task description" 
            className="min-h-[80px]" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to-do">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Select>
              <SelectTrigger id="assignee">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alex">Alex Johnson</SelectItem>
                <SelectItem value="sarah">Sarah Williams</SelectItem>
                <SelectItem value="michael">Michael Brown</SelectItem>
                <SelectItem value="emily">Emily Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input id="tags" placeholder="Enter tags" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Create Task</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const TaskDetailDialog: React.FC<{ task: any; isOpen: boolean; onClose: () => void }> = ({
  task,
  isOpen,
  onClose,
}) => {
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <div className="flex-1">{task.title}</div>
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={statusColors[task.status]}>
            {task.status === 'to-do' 
              ? 'To Do' 
              : task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
          </Badge>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Check className="h-4 w-4 mr-1" />
              Mark Complete
            </Button>
          </div>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Due Date</h4>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {format(new Date(task.dueDate), 'MMMM d, yyyy')}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Assignee</h4>
            <div className="flex items-center text-sm">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">{task.assignee}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button>Edit Task</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const TaskCard: React.FC<{ task: any; onTaskClick: (task: any) => void }> = ({ task, onTaskClick }) => {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-md group"
      onClick={() => onTaskClick(task)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Checkbox id={`task-${task.id}`} checked={task.completed} className="mr-2" />
            <div className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-muted-foreground truncate max-w-[240px]">
                {task.description}
              </p>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                <DropdownMenuItem>Delete Task</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{format(new Date(task.dueDate), 'MMM d')}</span>
            </div>
          </div>
          <Avatar className="h-6 w-6">
            <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
};

const TaskList: React.FC<{ 
  tasks: any[];
  filteredStatus?: string;
  onTaskClick: (task: any) => void;
}> = ({ tasks, filteredStatus, onTaskClick }) => {
  const filteredTasks = filteredStatus 
    ? tasks.filter(task => task.status === filteredStatus)
    : tasks;
  
  return (
    <div className="space-y-3">
      {filteredTasks.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No tasks found.
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
        ))
      )}
    </div>
  );
};

const Tasks: React.FC = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [taskList, setTaskList] = useState(tasks);
  const [viewMode, setViewMode] = useState('kanban');

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTasks = taskList.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todoTasks = filteredTasks.filter(task => task.status === 'to-do');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  const totalTasks = filteredTasks.length;
  const completedTasksCount = completedTasks.length;
  const completionRate = totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0;

  const dueTodayCount = filteredTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate.getDate() === today.getDate() && 
           dueDate.getMonth() === today.getMonth() && 
           dueDate.getFullYear() === today.getFullYear();
  }).length;

  const overdueTasks = filteredTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today && task.status !== 'completed';
  });

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <p className="text-muted-foreground">
          Manage your tasks and track your team's progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold tracking-tight">{completionRate.toFixed(0)}%</p>
              </div>
              <div className="rounded-full p-2 bg-green-100">
                <CheckSquare className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <Progress value={completionRate} className="mt-4 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTasksCount} of {totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Today</p>
                <p className="text-2xl font-bold tracking-tight">{dueTodayCount}</p>
              </div>
              <div className="rounded-full p-2 bg-blue-100">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-muted-foreground">
                {dueTodayCount === 0 ? 'No tasks due today' : dueTodayCount === 1 ? '1 task needs your attention' : `${dueTodayCount} tasks need your attention`}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue Tasks</p>
                <p className="text-2xl font-bold tracking-tight">{overdueTasks.length}</p>
              </div>
              <div className="rounded-full p-2 bg-red-100">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-muted-foreground">
                {overdueTasks.length === 0 ? 'No overdue tasks' : overdueTasks.length === 1 ? '1 task is overdue' : `${overdueTasks.length} tasks are overdue`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Tabs 
            value={viewMode} 
            onValueChange={setViewMode} 
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </Button>
            </DialogTrigger>
            <AddTaskDialog isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
          </Dialog>
        </div>
      </div>

      <TabsContent value="kanban" className={viewMode === 'kanban' ? 'block animate-fade-in' : 'hidden'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-md flex items-center justify-between">
                <div className="flex items-center">
                  <Badge variant="outline" className={statusColors['to-do']}>
                    To Do
                  </Badge>
                  <Badge variant="outline" className="ml-2 text-xs text-muted-foreground">
                    {todoTasks.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-auto hide-scrollbar">
              <TaskList tasks={todoTasks} onTaskClick={handleTaskClick} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-md flex items-center justify-between">
                <div className="flex items-center">
                  <Badge variant="outline" className={statusColors['in-progress']}>
                    In Progress
                  </Badge>
                  <Badge variant="outline" className="ml-2 text-xs text-muted-foreground">
                    {inProgressTasks.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-auto hide-scrollbar">
              <TaskList tasks={inProgressTasks} onTaskClick={handleTaskClick} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-md flex items-center justify-between">
                <div className="flex items-center">
                  <Badge variant="outline" className={statusColors['completed']}>
                    Completed
                  </Badge>
                  <Badge variant="outline" className="ml-2 text-xs text-muted-foreground">
                    {completedTasks.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-auto hide-scrollbar">
              <TaskList tasks={completedTasks} onTaskClick={handleTaskClick} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="list" className={viewMode === 'list' ? 'block animate-fade-in' : 'hidden'}>
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
            <CardDescription>View and manage all your tasks in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="todo">To Do</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="mt-4">
                <TabsContent value="all">
                  <TaskList tasks={filteredTasks} onTaskClick={handleTaskClick} />
                </TabsContent>
                <TabsContent value="todo">
                  <TaskList tasks={filteredTasks} filteredStatus="to-do" onTaskClick={handleTaskClick} />
                </TabsContent>
                <TabsContent value="in-progress">
                  <TaskList tasks={filteredTasks} filteredStatus="in-progress" onTaskClick={handleTaskClick} />
                </TabsContent>
                <TabsContent value="completed">
                  <TaskList tasks={filteredTasks} filteredStatus="completed" onTaskClick={handleTaskClick} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </TabsContent>

      <Dialog open={isTaskDetailOpen} onOpenChange={setIsTaskDetailOpen}>
        {selectedTask && (
          <TaskDetailDialog 
            task={selectedTask} 
            isOpen={isTaskDetailOpen} 
            onClose={() => setIsTaskDetailOpen(false)} 
          />
        )}
      </Dialog>
    </div>
  );
};

export default Tasks;
