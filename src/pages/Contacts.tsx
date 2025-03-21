
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  UserPlus, 
  Download,
  Tag,
  Star,
  StarOff,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

// Sample data
const contacts = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    company: 'TechNova Inc.',
    status: 'Customer',
    lastContact: '2 days ago',
    favorite: true,
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1 (555) 987-6543',
    company: 'Global Solutions',
    status: 'Lead',
    lastContact: '1 week ago',
    favorite: false,
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1 (555) 456-7890',
    company: 'Innovative Corp',
    status: 'Prospect',
    lastContact: '3 days ago',
    favorite: true,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1 (555) 789-0123',
    company: 'Elite Enterprises',
    status: 'Customer',
    lastContact: 'Today',
    favorite: false,
  },
  {
    id: 5,
    name: 'Robert Wilson',
    email: 'robert@example.com',
    phone: '+1 (555) 234-5678',
    company: 'Prime Partners',
    status: 'Lead',
    lastContact: '5 days ago',
    favorite: false,
  },
  {
    id: 6,
    name: 'Jennifer Taylor',
    email: 'jennifer@example.com',
    phone: '+1 (555) 876-5432',
    company: 'Vision Ventures',
    status: 'Customer',
    lastContact: '2 weeks ago',
    favorite: true,
  },
  {
    id: 7,
    name: 'David Martinez',
    email: 'david@example.com',
    phone: '+1 (555) 345-6789',
    company: 'Axis Analytics',
    status: 'Prospect',
    lastContact: '4 days ago',
    favorite: false,
  },
  {
    id: 8,
    name: 'Linda Anderson',
    email: 'linda@example.com',
    phone: '+1 (555) 654-3210',
    company: 'Strategic Systems',
    status: 'Lead',
    lastContact: '1 day ago',
    favorite: false,
  },
];

const statusColors: Record<string, string> = {
  Customer: 'bg-green-100 text-green-800',
  Lead: 'bg-blue-100 text-blue-800',
  Prospect: 'bg-yellow-100 text-yellow-800',
};

const ContactDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogDescription>
          Enter the details of the new contact below.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="Enter first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Enter last name" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="Enter phone number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Enter company name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Input id="notes" placeholder="Add notes about this contact" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save Contact</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const ContactDetailDialog: React.FC<{ contact: any; isOpen: boolean; onClose: () => void }> = ({ 
  contact, 
  isOpen, 
  onClose 
}) => {
  return (
    <DialogContent className="sm:max-w-[700px]">
      <DialogHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-xl">{contact.name}</DialogTitle>
            <DialogDescription className="text-sm">
              {contact.status && (
                <Badge variant="outline" className={statusColors[contact.status]}>
                  {contact.status}
                </Badge>
              )}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-muted-foreground mb-2">Contact Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{contact.email}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{contact.phone}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-muted-foreground mb-2">Company Details</h3>
                <p>{contact.company}</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-muted-foreground mb-2">Last Interaction</h3>
              <p>Last contacted: {contact.lastContact}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="pt-4">
          <Card>
            <CardContent className="p-4 h-64">
              <div className="text-center text-muted-foreground p-8">
                No recent activities found.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="pt-4">
          <Card>
            <CardContent className="p-4 h-64">
              <div className="text-center text-muted-foreground p-8">
                No notes available.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <DialogFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="gap-1">
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Phone className="h-4 w-4" />
            Call
          </Button>
        </div>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const Contacts: React.FC = () => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [contactDetailsOpen, setContactDetailsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [contactList, setContactList] = useState(contacts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredContacts = contactList.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (id: number) => {
    setContactList(contacts => 
      contacts.map(contact => 
        contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
      )
    );
  };

  const showContactDetails = (contact: any) => {
    setSelectedContact(contact);
    setContactDetailsOpen(true);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
        <p className="text-muted-foreground">
          Manage your contacts and keep track of your relationships.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
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
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <UserPlus className="h-4 w-4" />
                <span>Add Contact</span>
              </Button>
            </DialogTrigger>
            <ContactDialog isOpen={isAddContactOpen} onClose={() => setIsAddContactOpen(false)} />
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden lg:table-cell">Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No contacts found.
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => (
                <TableRow key={contact.id} className="cursor-pointer hover:bg-muted/50" onClick={() => showContactDetails(contact)}>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(contact.id);
                      }}
                    >
                      {contact.favorite ? (
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ) : (
                        <StarOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{contact.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{contact.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{contact.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">{contact.company}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[contact.status]}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Phone className="mr-2 h-4 w-4" />
                          <span>Call</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Tag className="mr-2 h-4 w-4" />
                          <span>Edit Tags</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={contactDetailsOpen} onOpenChange={setContactDetailsOpen}>
        {selectedContact && (
          <ContactDetailDialog 
            contact={selectedContact} 
            isOpen={contactDetailsOpen} 
            onClose={() => setContactDetailsOpen(false)} 
          />
        )}
      </Dialog>
    </div>
  );
};

export default Contacts;
