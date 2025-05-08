
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Check, AlertTriangle, HelpCircle } from "lucide-react";

interface FeedbackFormProps {
  detectionId: string;
  animalClass?: string;
}

type FeedbackType = "correct" | "wrong_class" | "wrong_bbox" | "false_detection" | "other";

const FeedbackForm = ({ detectionId, animalClass }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("correct");
  const [suggestedClass, setSuggestedClass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common animal classes that might be detected
  const commonAnimals = [
    "Deer", "Fox", "Rabbit", "Raccoon", "Cat", "Dog", "Squirrel", 
    "Bear", "Coyote", "Wolf", "Bird", "Mouse", "Opossum"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! This will help improve our detection model.",
      });
      
      // Reset form
      setFeedback("");
      setFeedbackType("correct");
      setSuggestedClass("");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <Label className="text-base font-medium">Detection Accuracy</Label>
        <RadioGroup
          value={feedbackType}
          onValueChange={(value) => setFeedbackType(value as FeedbackType)}
          className="grid gap-3"
        >
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
            <RadioGroupItem value="correct" id="correct" />
            <Label htmlFor="correct" className="flex items-center gap-2 font-normal cursor-pointer">
              <Check className="h-4 w-4 text-green-500" />
              <div>
                <p className="font-medium">Correct detection</p>
                <p className="text-sm text-muted-foreground">The detection is accurate</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
            <RadioGroupItem value="wrong_class" id="wrong_class" />
            <Label htmlFor="wrong_class" className="flex items-center gap-2 font-normal cursor-pointer">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="font-medium">Wrong classification</p>
                <p className="text-sm text-muted-foreground">The animal was detected but classified incorrectly</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
            <RadioGroupItem value="wrong_bbox" id="wrong_bbox" />
            <Label htmlFor="wrong_bbox" className="flex items-center gap-2 font-normal cursor-pointer">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <div>
                <p className="font-medium">Wrong bounding box</p>
                <p className="text-sm text-muted-foreground">The box doesn't properly contain the animal</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
            <RadioGroupItem value="false_detection" id="false_detection" />
            <Label htmlFor="false_detection" className="flex items-center gap-2 font-normal cursor-pointer">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <div>
                <p className="font-medium">False detection</p>
                <p className="text-sm text-muted-foreground">There is no animal in this image</p>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="flex items-center gap-2 font-normal cursor-pointer">
              <HelpCircle className="h-4 w-4 text-blue-500" />
              <div>
                <p className="font-medium">Other issue</p>
                <p className="text-sm text-muted-foreground">Please describe the issue in the comments</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {feedbackType === "wrong_class" && (
        <div className="space-y-2">
          <Label htmlFor="suggested-class">Correct animal class</Label>
          <Select
            value={suggestedClass}
            onValueChange={setSuggestedClass}
          >
            <SelectTrigger id="suggested-class">
              <SelectValue placeholder="Select the correct animal" />
            </SelectTrigger>
            <SelectContent>
              {commonAnimals.sort().map((animal) => (
                <SelectItem key={animal.toLowerCase()} value={animal.toLowerCase()}>
                  {animal}
                </SelectItem>
              ))}
              <SelectItem value="other">Other (specify in comments)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="feedback">Additional Comments</Label>
        <Textarea
          id="feedback"
          placeholder="Please provide any additional details that might help improve our detection model..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
};

export default FeedbackForm;
