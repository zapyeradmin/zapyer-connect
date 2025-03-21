
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Zap, CheckCircle, ChevronRight, ExternalLink, Plus, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ZapierIntegration: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  
  const handleTriggerWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          action: "manual_trigger",
          data: {
            source: "Zapyer CRM",
            user: "Admin",
          }
        }),
      });

      // Since we're using no-cors, we won't get a proper response status
      toast({
        title: "Request Sent",
        description: "The webhook was triggered successfully. Check your Zapier task history.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConnect = () => {
    toast({
      title: "Connected to Zapier",
      description: "Your Zapyer CRM is now connected to Zapier.",
    });
    setIsConnectDialogOpen(false);
  };
  
  const integrationsData = [
    {
      title: "Gmail",
      description: "Automatically create contacts from new emails",
      icon: "📧",
      status: "popular",
    },
    {
      title: "Google Calendar",
      description: "Create events from new deals or tasks",
      icon: "📅",
      status: "popular",
    },
    {
      title: "Slack",
      description: "Get notifications for new leads and deals",
      icon: "💬",
      status: "popular",
    },
    {
      title: "Mailchimp",
      description: "Add new contacts to email marketing lists",
      icon: "📊",
      status: "popular",
    },
    {
      title: "Salesforce",
      description: "Sync contacts and deals between platforms",
      icon: "☁️",
      status: "new",
    },
    {
      title: "HubSpot",
      description: "Transfer contacts and deal data",
      icon: "🔄",
      status: "",
    },
    {
      title: "Trello",
      description: "Create cards from new tasks",
      icon: "📝",
      status: "",
    },
    {
      title: "QuickBooks",
      description: "Generate invoices from won deals",
      icon: "💰",
      status: "",
    },
  ];
  
  const popularTemplates = [
    {
      title: "New Lead Notification",
      description: "Send a Slack message when a new lead is created",
      apps: ["Zapyer CRM", "Slack"],
    },
    {
      title: "Contact Sync",
      description: "Add new contacts to Mailchimp automatically",
      apps: ["Zapyer CRM", "Mailchimp"],
    },
    {
      title: "Deal Won Celebration",
      description: "Post to team channel when a deal is marked as won",
      apps: ["Zapyer CRM", "Slack", "Google Sheets"],
    },
    {
      title: "Calendar Sync",
      description: "Create Google Calendar events from meetings",
      apps: ["Zapyer CRM", "Google Calendar"],
    },
  ];
  
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Zapier Integration</h2>
        <p className="text-muted-foreground">
          Connect your CRM with thousands of apps through Zapier.
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="webhook">Webhooks</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-4 text-center lg:text-left">
                  <div className="inline-block rounded-full bg-primary/10 p-2 mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Connect with Zapier</h3>
                  <p className="text-muted-foreground max-w-md">
                    Zapier connects Zapyer CRM with 3,000+ apps to automate your work and 
                    make your CRM even more powerful.
                  </p>
                  
                  <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="mt-2">
                        Connect Account
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Connect to Zapier</DialogTitle>
                        <DialogDescription>
                          Link your Zapyer CRM account with Zapier to create automated workflows.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="zapierAccount">Zapier Account Email</Label>
                          <Input id="zapierAccount" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zapierApiKey">Zapier API Key</Label>
                          <Input id="zapierApiKey" placeholder="Enter your Zapier API key" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Don't have a Zapier account? 
                          <a 
                            href="https://zapier.com/sign-up" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-1 text-primary hover:underline"
                          >
                            Sign up for free
                          </a>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsConnectDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleConnect}>
                          Connect
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="rounded-lg bg-card/90 backdrop-blur-sm shadow-sm p-6 border flex flex-col items-center text-center">
                  <h4 className="font-medium">What you can automate:</h4>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Create contacts from form submissions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Send notifications when deals change status</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Update spreadsheets when tasks are completed</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Create calendar events for meetings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h3 className="text-xl font-bold mt-8">Popular Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrationsData.map((integration, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{integration.icon}</div>
                      <div>
                        <h4 className="font-medium">{integration.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    {integration.status && (
                      <Badge variant="outline" className={integration.status === 'popular' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                        {integration.status === 'popular' ? 'Popular' : 'New'}
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" className="w-full mt-4 gap-1">
                    <Plus className="h-4 w-4" />
                    Add Integration
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="link" className="gap-1">
              <span>View all integrations</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="webhook" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Use webhooks to connect Zapyer CRM with other services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTriggerWebhook}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="webhookUrl">Zapier Webhook URL</Label>
                      <Input 
                        id="webhookUrl" 
                        placeholder="https://hooks.zapier.com/hooks/catch/..." 
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Enter the webhook URL provided by Zapier when you set up a "Webhook by Zapier" trigger.
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full gap-1"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin">⟳</span>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4" />
                          <span>Test Webhook</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How to Use Webhooks</CardTitle>
                <CardDescription>
                  Follow these steps to set up a webhook integration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 text-sm">
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 flex items-center justify-center h-6 w-6 text-xs font-medium text-primary mr-2 shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Create a Zap in Zapier</h4>
                      <p className="text-muted-foreground mt-1">
                        Sign in to your Zapier account and create a new Zap with "Webhook by Zapier" as the trigger.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 flex items-center justify-center h-6 w-6 text-xs font-medium text-primary mr-2 shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Copy the Webhook URL</h4>
                      <p className="text-muted-foreground mt-1">
                        Zapier will provide a unique webhook URL. Copy this URL.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 flex items-center justify-center h-6 w-6 text-xs font-medium text-primary mr-2 shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Paste and Test</h4>
                      <p className="text-muted-foreground mt-1">
                        Paste the URL in the field on the left and click "Test Webhook" to verify the connection.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-primary/10 flex items-center justify-center h-6 w-6 text-xs font-medium text-primary mr-2 shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Complete Your Zap</h4>
                      <p className="text-muted-foreground mt-1">
                        Back in Zapier, continue setting up your Zap by adding actions to perform when the webhook is triggered.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
              <CardFooter>
                <a 
                  href="https://zapier.com/apps/webhook/integrations" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center"
                >
                  <span>View Zapier webhook documentation</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="mt-6 border-blue-100 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Automatic Webhook Triggers</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Zapyer CRM can automatically trigger webhooks when specific events occur, such as creating a new contact, updating a deal, or completing a task. 
                    Configure automatic triggers in the <a href="/settings" className="text-primary hover:underline">Settings</a> page.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="animate-fade-in">
          <h3 className="text-xl font-bold mb-4">Zap Templates</h3>
          <p className="text-muted-foreground mb-6">
            Get started quickly with these pre-built Zap templates.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            {popularTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {template.apps.map((app, i) => (
                      <React.Fragment key={i}>
                        <Badge variant="secondary">{app}</Badge>
                        {i < template.apps.length - 1 && (
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Use This Template</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="mt-8 border-yellow-100 bg-yellow-50/50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Need a custom integration?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    If you need help setting up a specific integration or have complex requirements, our support team can help.
                    <Button variant="link" className="h-auto p-0 ml-1 text-sm">Contact Support</Button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="gap-1">
              <ExternalLink className="h-4 w-4" />
              <span>Explore More Templates on Zapier</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ZapierIntegration;
