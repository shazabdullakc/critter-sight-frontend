
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter 
} from "@/components/ui/sheet";
import FeedbackForm from "@/components/FeedbackForm";

interface DetectionDetailsPanelProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  detectionDetails: {
    id: string;
    animalClass: string;
    confidence: number;
    timestamp: string;
    imageUrl: string;
    cameraName: string;
  } | null;
}

const DetectionDetailsPanel = ({ isOpen, setIsOpen, detectionDetails }: DetectionDetailsPanelProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detection Details</SheetTitle>
          <SheetDescription>
            Full information about this detection event
          </SheetDescription>
        </SheetHeader>
        
        {detectionDetails && (
          <div className="py-6">
            <div className="mb-6">
              <img 
                src={detectionDetails.imageUrl} 
                alt={`${detectionDetails.animalClass} detection`}
                className="w-full rounded-md object-cover aspect-video"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{detectionDetails.animalClass}</h3>
                <p className="text-sm text-muted-foreground">
                  Detected with {(detectionDetails.confidence * 100).toFixed(0)}% confidence
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Detection ID</p>
                  <p className="text-sm text-muted-foreground">{detectionDetails.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Camera</p>
                  <p className="text-sm text-muted-foreground">{detectionDetails.cameraName}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">Timestamp</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(detectionDetails.timestamp).toLocaleString()}
                </p>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">Help Improve Our Model</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your feedback helps us improve our detection accuracy. Please let us know if this detection was correct or how it could be improved.
                </p>
                <FeedbackForm 
                  detectionId={detectionDetails.id} 
                  animalClass={detectionDetails.animalClass}
                />
              </div>
            </div>
          </div>
        )}
        
        <SheetFooter className="mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DetectionDetailsPanel;
