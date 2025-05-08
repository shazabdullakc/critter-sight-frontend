
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import { Camera, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LiveFeed = () => {
  const [selectedCamera, setSelectedCamera] = useState("CAM001");
  const [isStreaming, setIsStreaming] = useState(true);

  const mockCameras = [
    { id: "CAM001", name: "Backyard Camera", latitude: 37.7749, longitude: -122.4194, isOnline: true },
    { id: "CAM002", name: "Front Gate", latitude: 37.7750, longitude: -122.4180, isOnline: false },
    { id: "CAM003", name: "Forest Edge", latitude: 37.7751, longitude: -122.4175, isOnline: true },
  ];

  const selectedCameraData = mockCameras.find(cam => cam.id === selectedCamera);
  
  const toggleStream = () => {
    setIsStreaming(!isStreaming);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Live Camera Feed</h1>
          
          <div className="flex items-center space-x-4">
            <Select
              value={selectedCamera}
              onValueChange={setSelectedCamera}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Camera" />
              </SelectTrigger>
              <SelectContent>
                {mockCameras.map(camera => (
                  <SelectItem key={camera.id} value={camera.id} disabled={!camera.isOnline}>
                    <div className="flex items-center">
                      {camera.name} {!camera.isOnline && " (Offline)"}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant={isStreaming ? "destructive" : "default"}
              onClick={toggleStream}
            >
              {isStreaming ? "Stop Stream" : "Start Stream"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    {selectedCameraData?.name || "No camera selected"}
                  </CardTitle>
                  
                  {selectedCameraData?.isOnline ? (
                    <Badge variant="default" className="bg-green-500">Live</Badge>
                  ) : (
                    <Badge variant="outline">Offline</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!selectedCameraData || !selectedCameraData.isOnline ? (
                  <div className="aspect-video bg-muted flex flex-col items-center justify-center">
                    <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Camera Offline</h3>
                    <p className="text-sm text-muted-foreground mt-2">This camera is currently unavailable</p>
                  </div>
                ) : !isStreaming ? (
                  <div className="aspect-video bg-muted flex flex-col items-center justify-center">
                    <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Stream Paused</h3>
                    <p className="text-sm text-muted-foreground mt-2">Click "Start Stream" to view the camera feed</p>
                  </div>
                ) : (
                  <div className="aspect-video bg-black relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
                      alt="Camera feed"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="outline" className="bg-black/70 text-white">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                          LIVE
                        </div>
                      </Badge>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold">Camera ID</h4>
                    <p className="text-sm text-muted-foreground">{selectedCameraData?.id || "N/A"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedCameraData ? `${selectedCameraData.latitude.toFixed(4)}, ${selectedCameraData.longitude.toFixed(4)}` : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Status</h4>
                    <p className="text-sm">
                      <span className={`inline-block h-2 w-2 rounded-full mr-1 ${selectedCameraData?.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {selectedCameraData?.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Last Detection</h4>
                    <p className="text-sm text-muted-foreground">Today, 2:30 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center mr-3">
                        <Camera className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Deer Detected</h4>
                        <p className="text-sm text-muted-foreground">Confidence: 98%</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">2 min ago</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center mr-3">
                        <Camera className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fox Detected</h4>
                        <p className="text-sm text-muted-foreground">Confidence: 87%</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">15 min ago</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center mr-3">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      </div>
                      <div>
                        <h4 className="font-medium">Processing Detection</h4>
                        <p className="text-sm text-muted-foreground">Please wait...</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Just now</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Camera Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <Map cameras={mockCameras} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Camera Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCameras.map(camera => (
                    <div key={camera.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
                      <div className="flex items-center">
                        <span className={`inline-block h-3 w-3 rounded-full mr-2 ${camera.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span>{camera.name}</span>
                      </div>
                      <Badge variant={camera.id === selectedCamera ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCamera(camera.id)}>
                        {camera.id === selectedCamera ? "Viewing" : "View"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveFeed;
