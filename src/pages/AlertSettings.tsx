
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Mail, Phone, Bell } from "lucide-react";

const AlertSettings = () => {
  const [confidenceThreshold, setConfidenceThreshold] = useState([85]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("");
  const [animalClasses, setAnimalClasses] = useState<string[]>(["Deer", "Bear"]);
  const [isLoading, setIsLoading] = useState(false);
  
  const allAnimalClasses = ["Deer", "Bear", "Fox", "Raccoon", "Cat", "Dog", "Rabbit", "Coyote", "Other"];
  
  const validatePhone = (value: string) => {
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    return value === "" || phoneRegex.test(value);
  };
  
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  
  const handleSave = () => {
    if (emailNotifications && !validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (smsNotifications && !validatePhone(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number (e.g., +11234567890).",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your alert settings have been updated successfully.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Alert Settings</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Thresholds</CardTitle>
                <CardDescription>Configure when you want to receive alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="confidence-threshold" className="mb-2 block">
                      Minimum Confidence Threshold: {confidenceThreshold[0]}%
                    </Label>
                    <Slider
                      id="confidence-threshold"
                      max={100}
                      step={1}
                      value={confidenceThreshold}
                      onValueChange={setConfidenceThreshold}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Only send alerts for detections with a confidence level above this threshold.
                    </p>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Animal Classes to Monitor</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {allAnimalClasses.map(animal => (
                        <div key={animal} className="flex items-center space-x-2">
                          <Switch
                            id={`animal-${animal}`}
                            checked={animalClasses.includes(animal)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setAnimalClasses([...animalClasses, animal]);
                              } else {
                                setAnimalClasses(animalClasses.filter(a => a !== animal));
                              }
                            }}
                          />
                          <Label htmlFor={`animal-${animal}`}>{animal}</Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Only send alerts for selected animal types.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notification Methods</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="email">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="sms">
                      <Phone className="h-4 w-4 mr-2" />
                      SMS
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="email" className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts via email
                        </p>
                      </div>
                      <Switch 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    {emailNotifications && (
                      <div>
                        <Label htmlFor="email-address">Email Address</Label>
                        <Input
                          id="email-address"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1"
                        />
                        {email && !validateEmail(email) && (
                          <p className="text-sm text-destructive mt-1">
                            Please enter a valid email address
                          </p>
                        )}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="sms" className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts via text message
                        </p>
                      </div>
                      <Switch 
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>
                    
                    {smsNotifications && (
                      <div>
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input
                          id="phone-number"
                          placeholder="+11234567890"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Enter phone number with country code (e.g., +11234567890)
                        </p>
                        {phone && !validatePhone(phone) && (
                          <p className="text-sm text-destructive mt-1">
                            Please enter a valid phone number
                          </p>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSave} 
                  disabled={isLoading}
                  className="ml-auto"
                >
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Schedule</CardTitle>
                <CardDescription>Set up quiet hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Quiet Hours</Label>
                    <Switch defaultChecked={false} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="start-time">Start Time</Label>
                      <Select defaultValue="22:00">
                        <SelectTrigger id="start-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="end-time">End Time</Label>
                      <Select defaultValue="07:00">
                        <SelectTrigger id="end-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Camera-Specific Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Backyard Camera</h3>
                        <p className="text-sm text-muted-foreground">CAM001</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Front Gate</h3>
                        <p className="text-sm text-muted-foreground">CAM002</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Forest Edge</h3>
                        <p className="text-sm text-muted-foreground">CAM003</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Test Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Send a test notification to verify your settings are working correctly.
                </p>
                <Button variant="outline" className="w-full">
                  Send Test Alert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlertSettings;
