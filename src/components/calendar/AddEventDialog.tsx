
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Evento criado",
      description: "O evento foi adicionado ao seu calendário com sucesso.",
    });
    onClose();
  };
  
  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Adicionar Novo Evento</DialogTitle>
        <DialogDescription>
          Crie um novo evento ou reunião no seu calendário.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Evento</Label>
          <Input id="title" placeholder="Digite o título do evento" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <div className="relative">
              <Input id="date" type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Evento</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">Reunião</SelectItem>
                <SelectItem value="call">Ligação</SelectItem>
                <SelectItem value="demo">Demonstração</SelectItem>
                <SelectItem value="internal">Interno</SelectItem>
                <SelectItem value="planning">Planejamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Hora de Início</Label>
            <Input id="startTime" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">Hora de Término</Label>
            <Input id="endTime" type="time" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Local</Label>
          <Input id="location" placeholder="Digite o local" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Input id="description" placeholder="Adicione a descrição do evento" className="h-20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="attendees">Participantes</Label>
          <Input id="attendees" placeholder="Adicione participantes (separados por vírgula)" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar Evento</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddEventDialog;
