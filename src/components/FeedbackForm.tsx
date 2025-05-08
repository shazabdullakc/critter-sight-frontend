
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface FeedbackFormProps {
  detectionId: string;
}

const FeedbackForm = ({ detectionId }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackType) {
      toast({
        title: "Error",
        description: "Please select a feedback type.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
      setFeedback("");
      setFeedbackType("");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="feedback-type" className="text-sm font-medium">
          Feedback Type
        </label>
        <Select
          value={feedbackType}
          onValueChange={setFeedbackType}
        >
          <SelectTrigger id="feedback-type">
            <SelectValue placeholder="Select feedback type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="incorrect_animal">Incorrect Animal Type</SelectItem>
            <SelectItem value="false_positive">False Positive</SelectItem>
            <SelectItem value="missed_detection">Missed Detection</SelectItem>
            <SelectItem value="other">Other Issue</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="feedback" className="text-sm font-medium">
          Additional Comments
        </label>
        <Textarea
          id="feedback"
          placeholder="Please provide any additional details..."
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
