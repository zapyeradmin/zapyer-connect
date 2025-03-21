
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { 
  User, 
  Lock, 
  Bell, 
  PanelLeft, 
  Zap, 
  Globe, 
  Upload, 
  Mail, 
  Key,
  CreditCard,
  Calendar,
  Users,
  Shield,
  Check,
  X,
  Laptop,
  Smartphone
} from 'lucide-react';

const Settings: React.FC = () => {
  const [companyName, setCompanyName] = useState('Zapyer Inc.');
  const [email, setEmail] = useState('admin@zapyer.com');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [apiKey, setApiKey] = useState('zpy_1234567890abcdef');
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully.",
    });
  };
  
  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated successfully.",
    });
  };
  
  const regenerateApiKey = () => {
    const newKey = `zpy_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    toast({
      title: "API Key regenerated",
      description: "Your new API key has been generated. Make sure to copy it.",
    });
  };
  
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and CRM settings.
        </p>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="md:w-1/4">
            <TabsList className="flex flex-row md:flex-col w-full h-auto p-0 bg-transparent space-x-2 md:space-x-0 md:space-y-1">
              <TabsTrigger 
                value="general" 
                className="w-full justify-start data-[state=active]:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="w-full justify-start data-[state=active]:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <Bell className="h-4 w-4 mr-2" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                className="w-full justify-start data-[state=active]:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <PanelLeft className="h-4 w-4 mr-2" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger 
                value="integrations" 
                className="w-full justify-start data-[state=active]:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <Zap className="h-4 w-4 mr-2" />
                <span>Integrations</span>
              </TabsTrigger>
              <TabsTrigger 
                value="billing" 
                className="w-full justify-start data-[state=active]:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                <span>Billing</span>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="w-full justify-start data-[state=active]:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <Shield className="h-4 w-4 mr-2" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 md:w-3/4">
            <TabsContent value="general" className="mt-0 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Manage your account information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>ZC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h3 className="font-medium">Profile Picture</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Upload className="h-4 w-4" />
                          <span>Upload</span>
                        </Button>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Company Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input 
                          id="companyName" 
                          value={companyName} 
                          onChange={(e) => setCompanyName(e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" placeholder="https://yourcompany.com" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input id="industry" placeholder="Select industry" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Input id="companySize" placeholder="Number of employees" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="Your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Your phone number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Input id="language" placeholder="Select language" defaultValue="English" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveGeneral}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications about important updates
                          </p>
                        </div>
                        <Switch 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Task Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when tasks are assigned to you or status changes
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Deal Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about deal status changes
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">System Announcements</Label>
                          <p className="text-sm text-muted-foreground">
                            Important updates about the CRM system
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications in your browser
                          </p>
                        </div>
                        <Switch 
                          checked={pushNotifications} 
                          onCheckedChange={setPushNotifications} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Task Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Get reminded about upcoming tasks and deadlines
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Meeting Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts before scheduled meetings
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-0 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your CRM dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Switch between light and dark theme
                          </p>
                        </div>
                        <Switch 
                          checked={darkMode} 
                          onCheckedChange={setDarkMode} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Layout</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Compact Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Display more information in less space
                          </p>
                        </div>
                        <Switch 
                          checked={compactMode} 
                          onCheckedChange={setCompactMode} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Auto-hide Sidebar</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically collapse sidebar on smaller screens
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Date & Time</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input id="timezone" defaultValue="UTC-05:00 (Eastern Time)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Input id="dateFormat" defaultValue="MM/DD/YYYY" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveAppearance}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="mt-0 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Connect your CRM with other apps and services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-primary/10 p-2">
                          <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Zapier</h3>
                          <p className="text-sm text-muted-foreground">
                            Connect with 3,000+ apps and automate workflows
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Connected
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-blue-100 p-2">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email Integration</h3>
                          <p className="text-sm text-muted-foreground">
                            Sync your emails with contacts and deals
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-purple-100 p-2">
                          <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Calendar</h3>
                          <p className="text-sm text-muted-foreground">
                            Sync your calendar with meetings and tasks
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-yellow-100 p-2">
                          <Globe className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Website Tracking</h3>
                          <p className="text-sm text-muted-foreground">
                            Track website visits and form submissions
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">API Access</h3>
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          id="apiKey" 
                          value={apiKey} 
                          readOnly 
                          className="font-mono text-xs" 
                        />
                        <Button 
                          variant="outline" 
                          onClick={regenerateApiKey}
                          className="shrink-0"
                        >
                          Regenerate
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Use this key to authenticate API requests.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="mt-0 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Billing</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Current Plan</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">Pro</Badge>
                            <span className="text-sm text-muted-foreground">
                              $49/month
                            </span>
                          </div>
                        </div>
                        <Button>Upgrade Plan</Button>
                      </div>
                      <div className="mt-4 text-sm">
                        <p className="font-medium">Plan includes:</p>
                        <ul className="mt-2 space-y-1 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Unlimited contacts</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Advanced reporting</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>API access</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>5 team members</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Method</h3>
                    <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-md bg-card p-2 shadow-sm">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/2025
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="billingName">Name</Label>
                        <Input id="billingName" defaultValue="Zapyer Inc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingEmail">Email</Label>
                        <Input id="billingEmail" defaultValue="billing@zapyer.com" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="billingAddress">Address</Label>
                        <Input id="billingAddress" defaultValue="123 Main St" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">City</Label>
                        <Input id="billingCity" defaultValue="San Francisco" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="billingState">State</Label>
                        <Input id="billingState" defaultValue="CA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingZip">Zip Code</Label>
                        <Input id="billingZip" defaultValue="94105" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingCountry">Country</Label>
                        <Input id="billingCountry" defaultValue="United States" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Billing History</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage account security and authentication settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                      </div>
                      <Button className="w-fit">Update Password</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h3 className="text-base font-medium">Auto Logout</h3>
                          <p className="text-sm text-muted-foreground">
                            Automatically log out after a period of inactivity
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Active Sessions</h4>
                            <p className="text-sm text-muted-foreground">
                              Currently logged in devices
                            </p>
                          </div>
                          <Button variant="outline" size="sm">Log Out All Devices</Button>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between bg-background p-3 rounded-md">
                            <div className="flex items-center space-x-4">
                              <div className="rounded-full bg-primary/10 p-2">
                                <Laptop className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">MacBook Pro</p>
                                <p className="text-xs text-muted-foreground">
                                  San Francisco, CA • Last active: Just now
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-green-100 text-green-800">Current</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between bg-background p-3 rounded-md">
                            <div className="flex items-center space-x-4">
                              <div className="rounded-full bg-primary/10 p-2">
                                <Smartphone className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">iPhone 13</p>
                                <p className="text-xs text-muted-foreground">
                                  San Francisco, CA • Last active: 2 hours ago
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
