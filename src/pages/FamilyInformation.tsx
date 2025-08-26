import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SpouseInfo {
  fullName: string;
  identificationType: string;
  identificationNumber: string;
}

interface ChildInfo {
  fullName: string;
  identificationType: string;
  identificationNumber: string;
  dateOfBirth: string;
}

interface FamilyData {
  spouse?: SpouseInfo;
  children: ChildInfo[];
}

const FamilyInformation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [hasSpouse, setHasSpouse] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);
  const [familyData, setFamilyData] = useState<FamilyData>({
    children: []
  });

  useEffect(() => {
    // Check personal details to determine if user is married or has children
    const personalDetails = localStorage.getItem('willPlanningPersonalDetails');
    if (personalDetails) {
      const details = JSON.parse(personalDetails);
      const isMarried = details.maritalStatus === 'Married';
      const hasKids = details.numberOfChildren > 0;
      
      if (isMarried) setHasSpouse(true);
      if (hasKids) {
        setHasChildren(true);
        // Initialize children array
        const initialChildren = Array.from({ length: details.numberOfChildren }, () => ({
          fullName: "",
          identificationType: "NRIC",
          identificationNumber: "",
          dateOfBirth: ""
        }));
        setFamilyData(prev => ({ ...prev, children: initialChildren }));
      }
    }
  }, []);

  const handleBack = () => {
    navigate("/personal-details");
  };

  const handleSpouseUpdate = (field: keyof SpouseInfo, value: string) => {
    setFamilyData(prev => ({
      ...prev,
      spouse: {
        ...prev.spouse,
        [field]: value
      } as SpouseInfo
    }));
  };

  const handleChildUpdate = (index: number, field: keyof ChildInfo, value: string) => {
    setFamilyData(prev => ({
      ...prev,
      children: prev.children.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    }));
  };

  const addChild = () => {
    setFamilyData(prev => ({
      ...prev,
      children: [...prev.children, {
        fullName: "",
        identificationType: "NRIC",
        identificationNumber: "",
        dateOfBirth: ""
      }]
    }));
  };

  const removeChild = (index: number) => {
    setFamilyData(prev => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index)
    }));
  };

  const validateCurrentStep = () => {
    if (hasSpouse && familyData.spouse) {
      const { fullName, identificationType, identificationNumber } = familyData.spouse;
      if (!fullName || !identificationType || !identificationNumber) {
        toast({
          title: "Required Fields Missing",
          description: "Please fill in all spouse information fields.",
          variant: "destructive"
        });
        return false;
      }
    }

    if (hasChildren) {
      for (let i = 0; i < familyData.children.length; i++) {
        const child = familyData.children[i];
        if (!child.fullName || !child.identificationType || !child.identificationNumber || !child.dateOfBirth) {
          toast({
            title: "Required Fields Missing",
            description: `Please fill in all information for Child ${i + 1}.`,
            variant: "destructive"
          });
          return false;
        }
      }
    }

    return true;
  };

  const handleContinue = () => {
    if (!validateCurrentStep()) return;

    // Store family data
    localStorage.setItem('willPlanningFamilyInfo', JSON.stringify(familyData));
    
    // Navigate to beneficiaries
    navigate("/beneficiaries");
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
            <h1 className="text-3xl font-bold text-foreground mb-2">About My Family</h1>
            <div className="step-indicator mb-4">
              Step 1
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Spouse Section */}
          {hasSpouse && (
            <Card className="form-section">
              <h2 className="text-xl font-semibold text-foreground mb-4">My Spouse</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="spouse-name" className="text-sm font-medium text-foreground">
                    Full name
                  </Label>
                  <Input
                    id="spouse-name"
                    placeholder="Enter full name"
                    value={familyData.spouse?.fullName || ""}
                    onChange={(e) => handleSpouseUpdate("fullName", e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Identification Type
                  </Label>
                  <Select
                    value={familyData.spouse?.identificationType || "NRIC"}
                    onValueChange={(value) => handleSpouseUpdate("identificationType", value)}
                  >
                    <SelectTrigger className="form-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NRIC">NRIC</SelectItem>
                      <SelectItem value="Passport">Passport</SelectItem>
                      <SelectItem value="FIN">FIN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spouse-id" className="text-sm font-medium text-foreground">
                    Identification number
                  </Label>
                  <Input
                    id="spouse-id"
                    placeholder="Enter ID number"
                    value={familyData.spouse?.identificationNumber || ""}
                    onChange={(e) => handleSpouseUpdate("identificationNumber", e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Children Section */}
          {hasChildren && (
            <div className="space-y-4">
              {familyData.children.map((child, index) => (
                <Card key={index} className="form-section">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      My Child {index + 1}
                    </h2>
                    {familyData.children.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeChild(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Full name
                      </Label>
                      <Input
                        placeholder="Enter full name"
                        value={child.fullName}
                        onChange={(e) => handleChildUpdate(index, "fullName", e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Identification Type
                      </Label>
                      <Select
                        value={child.identificationType}
                        onValueChange={(value) => handleChildUpdate(index, "identificationType", value)}
                      >
                        <SelectTrigger className="form-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NRIC">NRIC</SelectItem>
                          <SelectItem value="Passport">Passport</SelectItem>
                          <SelectItem value="Birth Certificate">Birth Certificate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Identification number
                      </Label>
                      <Input
                        placeholder="Enter ID number"
                        value={child.identificationNumber}
                        onChange={(e) => handleChildUpdate(index, "identificationNumber", e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Date Of Birth
                      </Label>
                      <div className="relative">
                        <Input
                          type="date"
                          placeholder="Enter Date Of Birth"
                          value={child.dateOfBirth}
                          onChange={(e) => handleChildUpdate(index, "dateOfBirth", e.target.value)}
                          className="form-input"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Add Child Button */}
              <Button
                variant="outline"
                onClick={addChild}
                className="w-full border-dashed border-2 py-6"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Child
              </Button>
            </div>
          )}

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

export default FamilyInformation;