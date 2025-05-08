
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetectionFilters from "@/components/detection/DetectionFilters";
import EmptyDetections from "@/components/detection/EmptyDetections";
import DetectionGrid from "@/components/detection/DetectionGrid";
import DetectionTable from "@/components/detection/DetectionTable";
import DetectionDetailsPanel from "@/components/detection/DetectionDetailsPanel";
import { useDetections } from "@/hooks/useDetections";

const DetectionHistory = () => {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [detectionDetails, setDetectionDetails] = useState<any>(null);
  
  // Mock data
  const mockDetections = [
    { id: "DET001", animalClass: "Deer", confidence: 0.98, timestamp: "2024-05-08T14:30:00", imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", cameraName: "Backyard Camera" },
    { id: "DET002", animalClass: "Fox", confidence: 0.87, timestamp: "2024-05-08T10:15:00", imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23", cameraName: "Forest Edge" },
    { id: "DET003", animalClass: "Cat", confidence: 0.76, timestamp: "2024-05-07T18:45:00", imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", cameraName: "Front Gate" },
    { id: "DET004", animalClass: "Deer", confidence: 0.93, timestamp: "2024-05-07T11:20:00", imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", cameraName: "Forest Edge" },
    { id: "DET005", animalClass: "Rabbit", confidence: 0.81, timestamp: "2024-05-06T09:15:00", imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23", cameraName: "Front Gate" },
    { id: "DET006", animalClass: "Raccoon", confidence: 0.89, timestamp: "2024-05-05T22:40:00", imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", cameraName: "Backyard Camera" },
  ];

  // Use our custom hook for detections data and filtering
  const {
    confidenceThreshold,
    setConfidenceThreshold,
    searchQuery,
    setSearchQuery,
    animalFilter,
    setAnimalFilter,
    cameraFilter,
    setCameraFilter,
    dateFilter,
    setDateFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    uniqueAnimalClasses,
    uniqueCameras,
    sortedDetections,
    resetFilters,
  } = useDetections(mockDetections);

  const handleDetectionClick = (detection: any) => {
    setDetectionDetails(detection);
    setIsSheetOpen(true);
  };

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
        
        <DetectionFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          animalFilter={animalFilter}
          setAnimalFilter={setAnimalFilter}
          cameraFilter={cameraFilter}
          setCameraFilter={setCameraFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          confidenceThreshold={confidenceThreshold}
          setConfidenceThreshold={setConfidenceThreshold}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          resetFilters={resetFilters}
          uniqueAnimalClasses={uniqueAnimalClasses}
          uniqueCameras={uniqueCameras}
        />
        
        {sortedDetections.length === 0 ? (
          <EmptyDetections />
        ) : (
          <Tabs value={view} onValueChange={(value) => setView(value as "grid" | "table")}>
            <TabsContent value="grid" className="mt-0">
              <DetectionGrid 
                detections={sortedDetections} 
                onViewDetails={handleDetectionClick} 
              />
            </TabsContent>
            
            <TabsContent value="table" className="mt-0">
              <DetectionTable 
                detections={sortedDetections}
                onViewDetails={handleDetectionClick}
              />
            </TabsContent>
          </Tabs>
        )}
      </main>

      <DetectionDetailsPanel
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        detectionDetails={detectionDetails}
      />
    </div>
  );
};

export default DetectionHistory;
