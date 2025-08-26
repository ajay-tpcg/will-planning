import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Beneficiary {
  id: string;
  fullName: string;
  relationship: string;
  type: 'person' | 'organization';
  percentage?: number;
}

interface EstateDistributionFormProps {
  onBack: () => void;
  onContinue: (distributions: Beneficiary[]) => void;
  beneficiaries: Beneficiary[];
}

const EstateDistributionForm = ({ onBack, onContinue, beneficiaries }: EstateDistributionFormProps) => {
  const [distributions, setDistributions] = useState<Beneficiary[]>(
    beneficiaries.map(b => ({ ...b, percentage: 0 }))
  );
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const updatePercentage = (id: string, percentage: number) => {
    setDistributions(prev => 
      prev.map(dist => 
        dist.id === id ? { ...dist, percentage } : dist
      )
    );
  };

  const getTotalPercentage = () => {
    return distributions.reduce((sum, dist) => sum + (dist.percentage || 0), 0);
  };

  const handleContinue = () => {
    const total = getTotalPercentage();
    const zeroBeneficiaries = distributions.filter(dist => (dist.percentage || 0) === 0);
    
    if (total !== 100 || zeroBeneficiaries.length > 0) {
      let message = "";
      
      if (total !== 100) {
        message += `Total distribution is ${total}% (should be 100%). `;
      }
      
      if (zeroBeneficiaries.length > 0) {
        message += `${zeroBeneficiaries.length} beneficiary(ies) have 0% allocation: ${zeroBeneficiaries.map(b => b.fullName).join(", ")}.`;
      }
      
      setWarningMessage(message);
      setShowWarningModal(true);
      return;
    }
    
    onContinue(distributions);
  };

  const handleConfirmContinue = () => {
    setShowWarningModal(false);
    onContinue(distributions);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" className="mr-4" onClick={onBack}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Estate Distribution</h1>
        </div>

        {/* Step indicator */}
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Step 3</p>
        </div>

        {/* Form title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Estate Distribution</h2>
        </div>

        {/* Beneficiaries List */}
        <div className="space-y-4 mb-6">
          {distributions.map((beneficiary) => (
            <div key={beneficiary.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-base">{beneficiary.fullName}</h3>
                <p className="text-sm text-muted-foreground capitalize">{beneficiary.relationship}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={beneficiary.percentage || ""}
                  onChange={(e) => updatePercentage(beneficiary.id, Number(e.target.value))}
                  className="w-16 text-center"
                  placeholder="0"
                />
                <span className="text-muted-foreground">%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Percentage Display */}
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Distribution:</span>
            <span className={`font-bold ${getTotalPercentage() === 100 ? 'text-green-600' : 'text-red-600'}`}>
              {getTotalPercentage()}%
            </span>
          </div>
        </div>

        {/* Explanation Text */}
        <div className="mb-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            If a beneficiary passes away before you, their share will be redistributed among the remaining 
            beneficiaries according to their original percentages.
          </p>
        </div>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Continue
        </Button>

        {/* Warning Modal */}
        <Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Distribution Warning</DialogTitle>
              <DialogDescription>
                {warningMessage} Are you sure you want to continue?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowWarningModal(false)}>
                Go Back
              </Button>
              <Button onClick={handleConfirmContinue}>
                Continue Anyway
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EstateDistributionForm;