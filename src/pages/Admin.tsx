
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, PlusCircle, Info, Edit, Trash2, Shield, UserCheck, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dados simulados de usuários para a demonstração
const usersData = [
  {
    id: 1,
    name: 'Super Admin',
    email: 'admin@zapyer.com',
    role: 'superadmin',
    createdAt: '2023-10-15',
    lastLogin: '2023-11-01',
    status: 'ativo',
  },
  {
    id: 2,
    name: 'João Silva',
    email: 'joao@empresa.com',
    role: 'gerente',
    createdAt: '2023-07-12',
    lastLogin: '2023-10-30',
    status: 'ativo',
  },
  {
    id: 3,
    name: 'Maria Oliveira',
    email: 'maria@empresa.com',
    role: 'vendedor',
    createdAt: '2023-08-22',
    lastLogin: '2023-10-29',
    status: 'ativo',
  },
  {
    id: 4,
    name: 'Pedro Santos',
    email: 'pedro@empresa.com',
    role: 'analista',
    createdAt: '2023-09-05',
    lastLogin: '2023-10-25',
    status: 'inativo',
  },
];

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'superadmin':
      return 'bg-red-100 text-red-800';
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    case 'gerente':
      return 'bg-blue-100 text-blue-800';
    case 'vendedor':
      return 'bg-green-100 text-green-800';
    case 'analista':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'superadmin':
      return 'Super Admin';
    case 'admin':
      return 'Administrador';
    case 'gerente':
      return 'Gerente';
    case 'vendedor':
      return 'Vendedor';
    case 'analista':
      return 'Analista';
    default:
      return role.charAt(0).toUpperCase() + role.slice(1);
  }
};

const Admin: React.FC = () => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Painel de Administração</h2>
        <p className="text-muted-foreground">
          Gerencie usuários, permissões e configurações do sistema.
        </p>
      </div>

      <Tabs defaultValue="usuarios" className="w-full">
        <TabsList>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="permissoes">Permissões</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          <TabsTrigger value="logs">Logs de Atividade</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Gerenciar Usuários</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar usuários..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo Usuário
                  </Button>
                </div>
              </div>
              <CardDescription>
                Gerencie os usuários e suas permissões no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead className="hidden md:table-cell">Criado em</TableHead>
                    <TableHead className="hidden md:table-cell">Último login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(getRoleBadgeColor(user.role))}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{user.createdAt}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'ativo' ? 'default' : 'outline'}>
                          {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            disabled={user.role === 'superadmin'}
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">
                Mostrando {filteredUsers.length} de {users.length} usuários
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Próximo
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Informações de Acesso do Super Admin</span>
              </CardTitle>
              <CardDescription>
                Credenciais padrão para o Super Admin do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4 bg-yellow-50">
                <div className="flex items-start gap-4">
                  <Info className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Credenciais do Super Admin</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Use estas credenciais para acessar o sistema como Super Admin. 
                      Recomendamos alterar a senha após o primeiro acesso.
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="grid grid-cols-2">
                        <div className="text-sm font-medium">Email:</div>
                        <div className="text-sm">admin@zapyer.com</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="text-sm font-medium">Senha:</div>
                        <div className="text-sm">Admin@123</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <UserCheck className="mr-2 h-4 w-4" />
                Mudar Senha do Super Admin
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="permissoes">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Permissões</CardTitle>
              <CardDescription>
                Configure as permissões para cada função no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">Em desenvolvimento. Esta funcionalidade estará disponível em breve.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>
                Configure os parâmetros gerais do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">Em desenvolvimento. Esta funcionalidade estará disponível em breve.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Atividade</CardTitle>
              <CardDescription>
                Acompanhe as atividades dos usuários no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground">Em desenvolvimento. Esta funcionalidade estará disponível em breve.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
