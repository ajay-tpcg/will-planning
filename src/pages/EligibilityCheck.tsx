import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EligibilityData {
  nationality: string;
  allAssetsInSingapore: boolean;
  religion: string;
}

const EligibilityCheck = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EligibilityData>({
    nationality: "",
    allAssetsInSingapore: true,
    religion: ""
  });
  const [showIneligibleModal, setShowIneligibleModal] = useState(false);
  const [ineligibilityReason, setIneligibilityReason] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleBack = () => {
    navigate("/");
  };

  const checkEligibility = (): { eligible: boolean; reason?: string } => {
    // Example eligibility rules - customize based on your requirements
    if (!formData.allAssetsInSingapore) {
      return {
        eligible: false,
        reason: "Currently, our will writing service is only available for individuals with all assets located in Singapore."
      };
    }

    if (formData.nationality && !["Singapore Citizen", "Singapore PR"].includes(formData.nationality)) {
      return {
        eligible: false,
        reason: "Our will writing service is currently available only for Singapore Citizens and Permanent Residents."
      };
    }

    return { eligible: true };
  };

  const handleContinue = () => {
    const eligibilityResult = checkEligibility();
    
    if (!eligibilityResult.eligible) {
      setIneligibilityReason(eligibilityResult.reason || "You are not eligible for our service.");
      setShowIneligibleModal(true);
      return;
    }

    // Store eligibility data
    localStorage.setItem('willPlanningEligibility', JSON.stringify(formData));
    
    // Navigate to personal details (about me page)
    navigate("/personal-details");
  };

  const handleEmailSubmit = async () => {
    if (!contactEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive updates.",
        variant: "destructive"
      });
      return;
    }

    // Store email for follow-up
    localStorage.setItem('willPlanningIneligibleEmail', contactEmail);
    
    toast({
      title: "Thank you",
      description: "We'll contact you when our service becomes available for your situation.",
    });
    
    setShowIneligibleModal(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button onClick={handleBack} className="back-button mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Check Your Eligibility</h1>
            <p className="text-muted-foreground">
              Let's check if our will writing tool is suitable for you.
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="form-section">
          <div className="space-y-6">
            {/* Nationality */}
            <div className="space-y-2">
              <Label htmlFor="nationality" className="text-sm font-medium text-foreground">
                Nationality
              </Label>
              <Select
                value={formData.nationality}
                onValueChange={(value) => setFormData(prev => ({ ...prev, nationality: value }))}
              >
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Singapore Citizen">Singapore Citizen</SelectItem>
                  <SelectItem value="Singapore PR">Singapore Permanent Resident</SelectItem>
                  <SelectItem value="Malaysian">Malaysian</SelectItem>
                  <SelectItem value="American">American</SelectItem>
                  <SelectItem value="British">British</SelectItem>
                  <SelectItem value="Australian">Australian</SelectItem>
                  <SelectItem value="Indian">Indian</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assets Location */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                Are all your assets in Singapore?
              </Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={formData.allAssetsInSingapore ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setFormData(prev => ({ ...prev, allAssetsInSingapore: true }))}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={!formData.allAssetsInSingapore ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setFormData(prev => ({ ...prev, allAssetsInSingapore: false }))}
                >
                  No
                </Button>
              </div>
            </div>

            {/* Religion */}
            <div className="space-y-2">
              <Label htmlFor="religion" className="text-sm font-medium text-foreground">
                Religion
              </Label>
              <Select
                value={formData.religion}
                onValueChange={(value) => setFormData(prev => ({ ...prev, religion: value }))}
              >
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select religion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buddhism">Buddhism</SelectItem>
                  <SelectItem value="Christianity">Christianity</SelectItem>
                  <SelectItem value="Islam">Islam</SelectItem>
                  <SelectItem value="Hinduism">Hinduism</SelectItem>
                  <SelectItem value="Taoism">Taoism</SelectItem>
                  <SelectItem value="No Religion">No Religion</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Help Link */}
            <div className="text-center">
              <button className="text-sm text-primary hover:underline">
                Find out what assets can be distributed via your will. (?)
              </button>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="continue-button"
              disabled={!formData.nationality || !formData.religion}
            >
              Continue
            </Button>
          </div>
        </Card>

        {/* Ineligible Modal */}
        <Dialog open={showIneligibleModal} onOpenChange={setShowIneligibleModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <DialogTitle>Not Eligible</DialogTitle>
              </div>
              <DialogDescription className="text-left">
                {ineligibilityReason}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="form-input"
                />
                <p className="text-xs text-muted-foreground">
                  We'll contact you when our service becomes available for your situation.
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowIneligibleModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEmailSubmit}
                  className="flex-1"
                >
                  Submit Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EligibilityCheck;