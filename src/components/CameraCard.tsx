
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Camera, MapPin } from "lucide-react";

interface CameraCardProps {
  id: string;
  name: string;
  location: string;
  isOnline: boolean;
  lastDetection?: string;
  detectionCount?: number;
}

const CameraCard = ({ 
  id, 
  name, 
  location, 
  isOnline, 
  lastDetection = "Never", 
  detectionCount = 0
}: CameraCardProps) => {
  const [online, setOnline] = useState(isOnline);
  
  const handleToggle = () => {
    setOnline(!online);
    // In a real application, this would make an API call
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${online ? "bg-green-500" : "bg-red-500"}`} />
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          <div className="flex items-center">
            <Camera className="w-5 h-5 mr-2 text-primary" />
            {name}
          </div>
        </CardTitle>
        <Badge variant={online ? "default" : "outline"} className={online ? "bg-green-500" : ""}>
          {online ? "Online" : "Offline"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{location}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Camera ID:</span> {id}
          </div>
          <div className="text-sm">
            <span className="font-medium">Last Detection:</span> {lastDetection}
          </div>
          <div className="text-sm">
            <span className="font-medium">Total Detections:</span> {detectionCount}
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-medium">Toggle Camera</span>
            <Switch checked={online} onCheckedChange={handleToggle} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraCard;
