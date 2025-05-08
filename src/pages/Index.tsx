
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import CameraCard from "@/components/CameraCard";
import DetectionCard from "@/components/DetectionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, AlertTriangle, Eye, Bell } from "lucide-react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const mockCameras = [
    { id: "CAM001", name: "Backyard Camera", location: "Backyard", isOnline: true, lastDetection: "Today, 2:30 PM", detectionCount: 12 },
    { id: "CAM002", name: "Front Gate", location: "Front Yard", isOnline: false, lastDetection: "Yesterday, 10:15 AM", detectionCount: 5 },
    { id: "CAM003", name: "Forest Edge", location: "North Property Line", isOnline: true, lastDetection: "Today, 9:45 AM", detectionCount: 23 },
  ];

  const mockDetections = [
    { id: "DET001", animalClass: "Deer", confidence: 0.98, timestamp: "2024-05-08T14:30:00", imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", cameraName: "Backyard Camera" },
    { id: "DET002", animalClass: "Fox", confidence: 0.87, timestamp: "2024-05-08T10:15:00", imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23", cameraName: "Forest Edge" },
    { id: "DET003", animalClass: "Cat", confidence: 0.76, timestamp: "2024-05-07T18:45:00", imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", cameraName: "Front Gate" },
  ];

  if (!isAuthenticated) {
    // In a real app, we would redirect to login page
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to continue</h1>
        <Button asChild>
          <a href="/login">Go to Login</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              <StatCard 
                title="Total Cameras" 
                value={mockCameras.length} 
                icon={<Camera className="w-4 h-4" />} 
                description="Active wildlife monitoring devices" 
              />
              <StatCard 
                title="Active Cameras" 
                value={mockCameras.filter(c => c.isOnline).length} 
                icon={<Eye className="w-4 h-4" />} 
                description="Currently online and monitoring" 
              />
              <StatCard 
                title="Detections Today" 
                value={8} 
                icon={<AlertTriangle className="w-4 h-4" />} 
                description="Wildlife sightings in the last 24h" 
              />
              <StatCard 
                title="Monthly Alerts" 
                value={42} 
                icon={<Bell className="w-4 h-4" />} 
                description="Alert notifications this month" 
              />
            </div>

            <div className="mt-8">
              <Tabs defaultValue="cameras">
                <TabsList>
                  <TabsTrigger value="cameras">Cameras</TabsTrigger>
                  <TabsTrigger value="recent">Recent Detections</TabsTrigger>
                </TabsList>
                <TabsContent value="cameras" className="pt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {mockCameras.map((camera) => (
                      <CameraCard 
                        key={camera.id} 
                        id={camera.id} 
                        name={camera.name} 
                        location={camera.location} 
                        isOnline={camera.isOnline} 
                        lastDetection={camera.lastDetection}
                        detectionCount={camera.detectionCount}
                      />
                    ))}
                    
                    <div className="border-2 border-dashed rounded-lg border-primary/20 flex flex-col items-center justify-center p-8 text-center h-[250px]">
                      <Camera className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Add Camera</h3>
                      <p className="text-sm text-muted-foreground mt-2">Configure a new wildlife detection camera</p>
                      <Button className="mt-4" variant="outline">Add Camera</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="recent" className="pt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {mockDetections.map((detection) => (
                      <DetectionCard 
                        key={detection.id} 
                        id={detection.id} 
                        animalClass={detection.animalClass} 
                        confidence={detection.confidence} 
                        timestamp={detection.timestamp} 
                        imageUrl={detection.imageUrl} 
                        cameraName={detection.cameraName} 
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
