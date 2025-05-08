
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import DetectionCard from "@/components/DetectionCard";
import FeedbackForm from "@/components/FeedbackForm";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Image as ImageIcon } from "lucide-react";

const DetectionHistory = () => {
  const [confidenceThreshold, setConfidenceThreshold] = useState([70]);
  const [selectedDetection, setSelectedDetection] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [animalFilter, setAnimalFilter] = useState("all");
  const [cameraFilter, setCameraFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  
  // Mock data
  const mockDetections = [
    { id: "DET001", animalClass: "Deer", confidence: 0.98, timestamp: "2024-05-08T14:30:00", imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", cameraName: "Backyard Camera" },
    { id: "DET002", animalClass: "Fox", confidence: 0.87, timestamp: "2024-05-08T10:15:00", imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23", cameraName: "Forest Edge" },
    { id: "DET003", animalClass: "Cat", confidence: 0.76, timestamp: "2024-05-07T18:45:00", imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", cameraName: "Front Gate" },
    { id: "DET004", animalClass: "Deer", confidence: 0.93, timestamp: "2024-05-07T11:20:00", imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", cameraName: "Forest Edge" },
    { id: "DET005", animalClass: "Rabbit", confidence: 0.81, timestamp: "2024-05-06T09:15:00", imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23", cameraName: "Front Gate" },
    { id: "DET006", animalClass: "Raccoon", confidence: 0.89, timestamp: "2024-05-05T22:40:00", imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", cameraName: "Backyard Camera" },
  ];
  
  const uniqueAnimalClasses = Array.from(new Set(mockDetections.map(d => d.animalClass)));
  const uniqueCameras = Array.from(new Set(mockDetections.map(d => d.cameraName)));
  
  // Apply filters
  const filteredDetections = mockDetections.filter(detection => {
    const meetsConfidence = detection.confidence * 100 >= confidenceThreshold[0];
    const meetsAnimal = animalFilter === "all" || detection.animalClass === animalFilter;
    const meetsCamera = cameraFilter === "all" || detection.cameraName === cameraFilter;
    const meetsSearch = searchQuery === "" || 
      detection.animalClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detection.cameraName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detection.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date filtering would be more complex in a real app
    const meetsDate = dateFilter === "all" || (
      dateFilter === "today" && new Date(detection.timestamp).toDateString() === new Date().toDateString()
    );
    
    return meetsConfidence && meetsAnimal && meetsCamera && meetsSearch && meetsDate;
  });
  
  // Sort by most recent
  const sortedDetections = [...filteredDetections].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Detection History</h1>
          <Tabs value={view} onValueChange={(value) => setView(value as "grid" | "table")}>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input 
                  id="search"
                  placeholder="Search detections..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="animal-filter">Animal Type</Label>
                <Select value={animalFilter} onValueChange={setAnimalFilter}>
                  <SelectTrigger id="animal-filter">
                    <SelectValue placeholder="All Animals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Animals</SelectItem>
                    {uniqueAnimalClasses.map(animal => (
                      <SelectItem key={animal} value={animal}>
                        {animal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="camera-filter">Camera</Label>
                <Select value={cameraFilter} onValueChange={setCameraFilter}>
                  <SelectTrigger id="camera-filter">
                    <SelectValue placeholder="All Cameras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cameras</SelectItem>
                    {uniqueCameras.map(camera => (
                      <SelectItem key={camera} value={camera}>
                        {camera}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date-filter">Date Range</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger id="date-filter">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="confidence-slider">Confidence Threshold: {confidenceThreshold[0]}%</Label>
                </div>
                <Slider 
                  id="confidence-slider"
                  defaultValue={[70]} 
                  max={100} 
                  step={1}
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2" onClick={() => {
                setSearchQuery("");
                setAnimalFilter("all");
                setCameraFilter("all");
                setDateFilter("all");
                setConfidenceThreshold([70]);
              }}>
                Reset Filters
              </Button>
              <Button>
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {sortedDetections.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg border border-dashed">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No matching detections</h3>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <TabsContent value="grid" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedDetections.map((detection) => (
                <Dialog key={detection.id}>
                  <DialogTrigger asChild>
                    <div onClick={() => setSelectedDetection(detection.id)} className="cursor-pointer">
                      <DetectionCard 
                        id={detection.id} 
                        animalClass={detection.animalClass} 
                        confidence={detection.confidence} 
                        timestamp={detection.timestamp} 
                        imageUrl={detection.imageUrl} 
                        cameraName={detection.cameraName} 
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Detection Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img 
                          src={detection.imageUrl} 
                          alt={`${detection.animalClass} detection`}
                          className="w-full rounded-md"
                        />
                        <div className="mt-4">
                          <h3 className="font-semibold text-lg">{detection.animalClass}</h3>
                          <p className="text-sm text-muted-foreground">Detection ID: {detection.id}</p>
                          <p className="text-sm text-muted-foreground">Camera: {detection.cameraName}</p>
                          <p className="text-sm text-muted-foreground">Time: {new Date(detection.timestamp).toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Confidence: {(detection.confidence * 100).toFixed(0)}%</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Provide Feedback</h3>
                        <FeedbackForm detectionId={detection.id} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="table" className="mt-0">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left font-medium">ID</th>
                    <th className="h-10 px-4 text-left font-medium">Animal</th>
                    <th className="h-10 px-4 text-left font-medium">Camera</th>
                    <th className="h-10 px-4 text-left font-medium">Time</th>
                    <th className="h-10 px-4 text-left font-medium">Confidence</th>
                    <th className="h-10 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDetections.map((detection) => (
                    <tr key={detection.id} className="border-b">
                      <td className="p-4">{detection.id}</td>
                      <td className="p-4">{detection.animalClass}</td>
                      <td className="p-4">{detection.cameraName}</td>
                      <td className="p-4">{new Date(detection.timestamp).toLocaleString()}</td>
                      <td className="p-4">{(detection.confidence * 100).toFixed(0)}%</td>
                      <td className="p-4 text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedDetection(detection.id)}>
                              <ImageIcon className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Detection Details</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <img 
                                  src={detection.imageUrl} 
                                  alt={`${detection.animalClass} detection`}
                                  className="w-full rounded-md"
                                />
                                <div className="mt-4">
                                  <h3 className="font-semibold text-lg">{detection.animalClass}</h3>
                                  <p className="text-sm text-muted-foreground">Detection ID: {detection.id}</p>
                                  <p className="text-sm text-muted-foreground">Camera: {detection.cameraName}</p>
                                  <p className="text-sm text-muted-foreground">Time: {new Date(detection.timestamp).toLocaleString()}</p>
                                  <p className="text-sm text-muted-foreground">Confidence: {(detection.confidence * 100).toFixed(0)}%</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg mb-4">Provide Feedback</h3>
                                <FeedbackForm detectionId={detection.id} />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </main>
    </div>
  );
};

export default DetectionHistory;
