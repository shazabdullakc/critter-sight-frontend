
import DetectionCard from "@/components/DetectionCard";

interface DetectionGridProps {
  detections: Array<{
    id: string;
    animalClass: string;
    confidence: number;
    timestamp: string;
    imageUrl: string;
    cameraName: string;
  }>;
  onViewDetails: (detection: any) => void;
}

const DetectionGrid = ({ detections, onViewDetails }: DetectionGridProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {detections.map((detection) => (
        <div key={detection.id} onClick={() => onViewDetails(detection)} className="cursor-pointer">
          <DetectionCard 
            id={detection.id} 
            animalClass={detection.animalClass} 
            confidence={detection.confidence} 
            timestamp={detection.timestamp} 
            imageUrl={detection.imageUrl} 
            cameraName={detection.cameraName} 
          />
        </div>
      ))}
    </div>
  );
};

export default DetectionGrid;
