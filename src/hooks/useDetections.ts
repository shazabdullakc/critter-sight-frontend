
import { useState, useMemo } from "react";

// Define the Detection type
interface Detection {
  id: string;
  animalClass: string;
  confidence: number;
  timestamp: string;
  imageUrl: string;
  cameraName: string;
}

export const useDetections = (initialData: Detection[]) => {
  const [confidenceThreshold, setConfidenceThreshold] = useState([70]);
  const [searchQuery, setSearchQuery] = useState("");
  const [animalFilter, setAnimalFilter] = useState("all");
  const [cameraFilter, setCameraFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Get unique animal classes and cameras
  const uniqueAnimalClasses = useMemo(() => 
    Array.from(new Set(initialData.map(d => d.animalClass))), 
    [initialData]
  );
  
  const uniqueCameras = useMemo(() => 
    Array.from(new Set(initialData.map(d => d.cameraName))), 
    [initialData]
  );
  
  // Apply filters
  const filteredDetections = useMemo(() => {
    return initialData.filter(detection => {
      const meetsConfidence = detection.confidence * 100 >= confidenceThreshold[0];
      const meetsAnimal = animalFilter === "all" || detection.animalClass === animalFilter;
      const meetsCamera = cameraFilter === "all" || detection.cameraName === cameraFilter;
      const meetsSearch = searchQuery === "" || 
        detection.animalClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
        detection.cameraName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        detection.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Date range filtering
      const detectionDate = new Date(detection.timestamp);
      const meetsDateRange = (
        (!startDate || detectionDate >= startDate) && 
        (!endDate || detectionDate <= endDate)
      );
      
      // Legacy date filter option
      const meetsDateFilter = dateFilter === "all" || (
        dateFilter === "today" && detectionDate.toDateString() === new Date().toDateString()
      );
      
      return meetsConfidence && meetsAnimal && meetsCamera && meetsSearch && 
             (dateFilter === "custom" ? meetsDateRange : meetsDateFilter);
    });
  }, [
    initialData, 
    confidenceThreshold, 
    animalFilter, 
    cameraFilter, 
    searchQuery, 
    dateFilter, 
    startDate, 
    endDate
  ]);
  
  // Sort by most recent
  const sortedDetections = useMemo(() => 
    [...filteredDetections].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ), 
    [filteredDetections]
  );

  const resetFilters = () => {
    setSearchQuery("");
    setAnimalFilter("all");
    setCameraFilter("all");
    setDateFilter("all");
    setConfidenceThreshold([70]);
    setStartDate(undefined);
    setEndDate(undefined);
  };
  
  return {
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
  };
};
