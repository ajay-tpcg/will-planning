import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExecutorData {
  relationship: string;
  fullName: string;
  identificationType: string;
  identificationNumber: string;
}

interface ExecutorFormProps {
  onBack?: () => void;
  onContinue?: (mainExecutor: ExecutorData, alternativeExecutor: ExecutorData) => void;
}

const ExecutorForm = ({ onBack, onContinue }: ExecutorFormProps) => {
  const { toast } = useToast();
  const [mainExecutor, setMainExecutor] = useState<ExecutorData>({
    relationship: "",
    fullName: "",
    identificationType: "NRIC",
    identificationNumber: "",
  });

  const [alternativeExecutor, setAlternativeExecutor] = useState<ExecutorData>({
    relationship: "",
    fullName: "",
    identificationType: "NRIC",
    identificationNumber: "",
  });

  const relationships = [
    "Spouse",
    "Parent",
    "Child",
    "Sibling",
    "Friend",
    "Professional Advisor",
    "Other Family Member"
  ];

  const identificationTypes = [
    "NRIC",
    "Passport",
    "FIN",
    "Birth Certificate"
  ];

  const updateMainExecutor = (field: keyof ExecutorData, value: string) => {
    setMainExecutor(prev => ({ ...prev, [field]: value }));
  };

  const updateAlternativeExecutor = (field: keyof ExecutorData, value: string) => {
    setAlternativeExecutor(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['relationship', 'fullName', 'identificationNumber'];

    // Validate main executor
    for (const field of requiredFields) {
      if (!mainExecutor[field as keyof ExecutorData]) {
        toast({
          title: "Missing Information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} for the main executor.`,
          variant: "destructive"
        });
        return false;
      }
    }

    // Validate alternative executor
    for (const field of requiredFields) {
      if (!alternativeExecutor[field as keyof ExecutorData]) {
        toast({
          title: "Missing Information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} for the alternative executor.`,
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onContinue?.(mainExecutor, alternativeExecutor);
      toast({
        title: "Executors Registered",
        description: "Your executor and trustee information has been saved successfully."
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 hover:bg-muted rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="flex-1">
            <div className="step-indicator mb-2">3</div>
            <h1 className="text-2xl font-semibold text-foreground">My Executor & Trustee</h1>
            <p className="text-muted-foreground text-sm mt-1">Step 3</p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-foreground text-center">
            As this is a critical role in the execution of your will, please choose people that you trust.
          </p>

          <p className="text-muted-foreground text-sm text-center italic">
            Note: The Executor and Trustee must be at least 21 years old.
          </p>

          {/* Main Executor Section */}
          <Card className="form-section">
            <h2 className="text-xl font-semibold text-foreground mb-6">Main Executor & Trustee</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="main-relationship">Relationship</Label>
                <Select value={mainExecutor.relationship} onValueChange={(value) => updateMainExecutor('relationship', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationships.map((rel) => (
                      <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="main-fullname">Full name</Label>
                <Input
                  id="main-fullname"
                  placeholder="Enter full name"
                  value={mainExecutor.fullName}
                  onChange={(e) => updateMainExecutor('fullName', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="main-id-type">Identification Type</Label>
                <Select value={mainExecutor.identificationType} onValueChange={(value) => updateMainExecutor('identificationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    {identificationTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="main-id-number">Identification number</Label>
                <Input
                  id="main-id-number"
                  placeholder="Enter ID number"
                  value={mainExecutor.identificationNumber}
                  onChange={(e) => updateMainExecutor('identificationNumber', e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Alternative Executor Section */}
          <Card className="form-section">
            <h2 className="text-xl font-semibold text-foreground mb-2">Alternative Executor & Trustee</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Takes over the role as your executor & trustee in the event that your main executor & trustee passes on before you.
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="alt-relationship">Relationship</Label>
                <Select value={alternativeExecutor.relationship} onValueChange={(value) => updateAlternativeExecutor('relationship', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationships.map((rel) => (
                      <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="alt-fullname">Full name</Label>
                <Input
                  id="alt-fullname"
                  placeholder="Enter full name"
                  value={alternativeExecutor.fullName}
                  onChange={(e) => updateAlternativeExecutor('fullName', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="alt-id-type">Identification Type</Label>
                <Select value={alternativeExecutor.identificationType} onValueChange={(value) => updateAlternativeExecutor('identificationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    {identificationTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="alt-id-number">Identification number</Label>
                <Input
                  id="alt-id-number"
                  placeholder="Enter ID number"
                  value={alternativeExecutor.identificationNumber}
                  onChange={(e) => updateAlternativeExecutor('identificationNumber', e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="continue-button"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExecutorForm;