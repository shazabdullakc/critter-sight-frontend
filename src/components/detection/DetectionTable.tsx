
import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";

interface DetectionTableProps {
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

const DetectionTable = ({ detections, onViewDetails }: DetectionTableProps) => {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Animal</TableHead>
              <TableHead>Camera</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detections.map((detection) => (
              <TableRow key={detection.id}>
                <TableCell>{detection.id}</TableCell>
                <TableCell>{detection.animalClass}</TableCell>
                <TableCell>{detection.cameraName}</TableCell>
                <TableCell>{new Date(detection.timestamp).toLocaleString()}</TableCell>
                <TableCell>{(detection.confidence * 100).toFixed(0)}%</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(detection);
                    }}
                  >
                    <ImageIcon className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DetectionTable;
