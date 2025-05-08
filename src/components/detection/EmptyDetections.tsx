
import { Image as ImageIcon } from "lucide-react";

const EmptyDetections = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg border border-dashed">
      <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No matching detections</h3>
      <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters to see more results</p>
    </div>
  );
};

export default EmptyDetections;
