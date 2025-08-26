import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Beneficiary {
  id: string;
  relation: string;
  fullName: string;
  idNumber: string;
}

interface BeneficiariesFormProps {
  onBack?: () => void;
  onContinue?: (beneficiaries: Beneficiary[]) => void;
}

const BeneficiariesForm = ({ onBack, onContinue }: BeneficiariesFormProps) => {
  const { toast } = useToast();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: '1', relation: '', fullName: '', idNumber: '' }
  ]);

  const relationships = [
    "Spouse",
    "Son",
    "Daughter",
    "Parent",
    "Sibling",
    "Grandchild",
    "Friend",
    "Charity",
    "Other"
  ];

  const addBeneficiary = () => {
    const newId = Date.now().toString();
    setBeneficiaries(prev => [
      ...prev,
      { id: newId, relation: '', fullName: '', idNumber: '' }
    ]);
  };

  const removeBeneficiary = (id: string) => {
    if (beneficiaries.length > 1) {
      setBeneficiaries(prev => prev.filter(b => b.id !== id));
    } else {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one beneficiary.",
        variant: "destructive"
      });
    }
  };

  const updateBeneficiary = (id: string, field: keyof Omit<Beneficiary, 'id'>, value: string) => {
    setBeneficiaries(prev => prev.map(b =>
      b.id === id ? { ...b, [field]: value } : b
    ));
  };

  const validateForm = () => {
    for (const beneficiary of beneficiaries) {
      if (!beneficiary.relation || !beneficiary.fullName || !beneficiary.idNumber) {
        toast({
          title: "Incomplete Beneficiary",
          description: "Please fill in all fields for each beneficiary.",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onContinue?.(beneficiaries);
      toast({
        title: "Beneficiaries Saved",
        description: "Your beneficiaries have been saved successfully."
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
            <div className="step-indicator mb-2">2</div>
            <h1 className="text-2xl font-semibold text-foreground">My Beneficiaries</h1>
            <p className="text-muted-foreground text-sm mt-1">Step 2</p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-foreground text-center">
            Who would you like to include as beneficiaries in your will? These are the people or organizations who will inherit your estate.
          </p>

          <div className="space-y-4">
            {beneficiaries.map((beneficiary, index) => (
              <Card key={beneficiary.id} className="form-section">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Beneficiary {index + 1}
                  </h3>
                  {beneficiaries.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeBeneficiary(beneficiary.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`relation-${beneficiary.id}`}>Relationship</Label>
                    <Select
                      value={beneficiary.relation}
                      onValueChange={(value) => updateBeneficiary(beneficiary.id, 'relation', value)}
                    >
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
                    <Label htmlFor={`fullName-${beneficiary.id}`}>Full Name</Label>
                    <Input
                      id={`fullName-${beneficiary.id}`}
                      placeholder="Enter full name"
                      value={beneficiary.fullName}
                      onChange={(e) => updateBeneficiary(beneficiary.id, 'fullName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`idNumber-${beneficiary.id}`}>ID Number</Label>
                    <Input
                      id={`idNumber-${beneficiary.id}`}
                      placeholder="Enter ID number"
                      value={beneficiary.idNumber}
                      onChange={(e) => updateBeneficiary(beneficiary.id, 'idNumber', e.target.value)}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Add Beneficiary Button */}
          <Button
            variant="outline"
            onClick={addBeneficiary}
            className="w-full flex items-center gap-2 border-dashed"
          >
            <Plus className="w-4 h-4" />
            Add Another Beneficiary
          </Button>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="continue-button"
          >
            Continue to Estate Distribution
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiariesForm;