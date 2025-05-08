
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Image } from "lucide-react";

interface DetectionCardProps {
  id: string;
  animalClass: string;
  confidence: number;
  timestamp: string;
  imageUrl: string;
  cameraName: string;
}

const DetectionCard = ({ 
  id, 
  animalClass, 
  confidence, 
  timestamp, 
  imageUrl, 
  cameraName 
}: DetectionCardProps) => {
  const formatConfidence = (confidence: number) => {
    return `${(confidence * 100).toFixed(0)}%`;
  };
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.7) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="detection-card overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${animalClass} detection`}
          className="animal-image w-full h-full object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${getConfidenceColor(confidence)}`}
        >
          {formatConfidence(confidence)}
        </Badge>
      </div>
      <CardHeader className="p-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{animalClass}</h3>
          <Badge variant="outline">{cameraName}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 text-sm text-muted-foreground">
        <p>Detected: {new Date(timestamp).toLocaleString()}</p>
        <p>ID: {id}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="sr-only">Correct</span>
          </Button>
          <Button variant="ghost" size="sm">
            <ThumbsDown className="h-4 w-4 mr-1" />
            <span className="sr-only">Incorrect</span>
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Image className="h-4 w-4 mr-1" />
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DetectionCard;
