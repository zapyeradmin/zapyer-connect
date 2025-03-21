
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  Users,
  DollarSign,
  Calendar,
  CheckSquare,
  Settings,
  Zap,
  Info,
  MessageSquare,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mainNavItems = [
  { title: 'Dashboard', icon: BarChart3, path: '/' },
  { title: 'Contacts', icon: Users, path: '/contacts' },
  { title: 'Deals', icon: DollarSign, path: '/deals' },
  { title: 'Calendar', icon: Calendar, path: '/calendar' },
  { title: 'Tasks', icon: CheckSquare, path: '/tasks' },
];

const otherNavItems = [
  { title: 'Settings', icon: Settings, path: '/settings' },
  { title: 'Zapier', icon: Zap, path: '/zapier' },
];

const Sidebar: React.FC = () => {
  return (
    <SidebarBase>
      <SidebarHeader className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-2">
          <Zap size={24} className="text-primary" />
          <span className="text-xl font-bold tracking-tight">Zapyer CRM</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-2">
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Help & Resources</span>
          </div>
          <div className="flex gap-2">
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </SidebarFooter>
    </SidebarBase>
  );
};

export default Sidebar;
