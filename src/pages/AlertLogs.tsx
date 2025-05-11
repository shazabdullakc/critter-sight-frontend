
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for alert logs
const mockAlertLogs = [
  {
    id: "al-001",
    type: "email",
    recipient: "user@example.com",
    subject: "Deer Detected",
    message: "A deer was detected with 95% confidence at your forest edge camera.",
    timestamp: "2025-05-10T15:32:45",
    status: "delivered"
  },
  {
    id: "al-002",
    type: "sms",
    recipient: "+11234567890",
    subject: null,
    message: "Alert: Bear detected at backyard camera with 87% confidence.",
    timestamp: "2025-05-10T18:45:21",
    status: "delivered"
  },
  {
    id: "al-003",
    type: "email",
    recipient: "user@example.com",
    subject: "Bear Detected",
    message: "A bear was detected with 87% confidence at your backyard camera.",
    timestamp: "2025-05-10T18:45:23",
    status: "delivered"
  },
  {
    id: "al-004",
    type: "sms",
    recipient: "+11234567890",
    subject: null,
    message: "Alert: Fox detected at front gate camera with 91% confidence.",
    timestamp: "2025-05-11T08:12:05",
    status: "failed"
  },
  {
    id: "al-005",
    type: "email",
    recipient: "user@example.com",
    subject: "Multiple Detections",
    message: "There have been 3 new animal detections in the last hour.",
    timestamp: "2025-05-11T10:30:15",
    status: "delivered"
  }
];

const AlertLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "email" | "sms">("all");
  
  const filteredLogs = mockAlertLogs
    .filter(log => 
      (filter === "all" || log.type === filter) && 
      (log.recipient.toLowerCase().includes(searchQuery.toLowerCase()) || 
       log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
       (log.subject && log.subject.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Alert Logs</h1>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Alert History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Tabs 
                  defaultValue="all" 
                  value={filter}
                  onValueChange={(value) => setFilter(value as "all" | "email" | "sms")}
                  className="w-full sm:w-auto"
                >
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="email" className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="sms" className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      SMS
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {filteredLogs.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          {log.type === "email" ? (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              Email
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              SMS
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{log.recipient}</TableCell>
                        <TableCell>
                          <div>
                            {log.subject && <div className="font-medium">{log.subject}</div>}
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {log.message}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                        <TableCell>
                          {log.status === "delivered" ? (
                            <Badge variant="default" className="bg-green-600">Delivered</Badge>
                          ) : (
                            <Badge variant="destructive">Failed</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">📭</div>
                <h3 className="text-lg font-medium">No alerts found</h3>
                <p className="text-muted-foreground">
                  No alert logs match your current search and filter settings.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alert Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Total Alerts</h3>
                  <span className="text-xl font-bold">{mockAlertLogs.length}</span>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Email Alerts</h3>
                  <span className="text-xl font-bold">{mockAlertLogs.filter(log => log.type === "email").length}</span>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">SMS Alerts</h3>
                  <span className="text-xl font-bold">{mockAlertLogs.filter(log => log.type === "sms").length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AlertLogs;
