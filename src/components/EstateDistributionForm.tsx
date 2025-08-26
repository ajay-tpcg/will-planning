import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Beneficiary {
  id: string;
  relation: string;
  fullName: string;
  idNumber: string;
}

interface EstateDistribution {
  beneficiaryId: string;
  beneficiaryName: string;
  relation: string;
  percentage: number;
}

interface EstateDistributionFormProps {
  onBack?: () => void;
  onContinue?: (distributions: EstateDistribution[]) => void;
  beneficiaries?: Beneficiary[];
}

const EstateDistributionForm = ({ onBack, onContinue, beneficiaries = [] }: EstateDistributionFormProps) => {
  const { toast } = useToast();

  // Sample beneficiaries if none provided
  const defaultBeneficiaries: Beneficiary[] = [
    { id: '1', relation: 'Daughter', fullName: 'Olivia Bennett', idNumber: '9876543210' },
    { id: '2', relation: 'Son', fullName: 'Ethan Bennett', idNumber: '5678901234' }
  ];

  const activeBeneficiaries = beneficiaries.length > 0 ? beneficiaries : defaultBeneficiaries;

  const [distributions, setDistributions] = useState<EstateDistribution[]>(
    activeBeneficiaries.map(b => ({
      beneficiaryId: b.id,
      beneficiaryName: b.fullName,
      relation: b.relation,
      percentage: Math.floor(100 / activeBeneficiaries.length)
    }))
  );

  const [totalPercentage, setTotalPercentage] = useState(0);

  useEffect(() => {
    const total = distributions.reduce((sum, dist) => sum + dist.percentage, 0);
    setTotalPercentage(total);
  }, [distributions]);

  const updateDistribution = (beneficiaryId: string, percentage: number) => {
    setDistributions(prev => prev.map(dist =>
      dist.beneficiaryId === beneficiaryId
        ? { ...dist, percentage: Math.max(0, Math.min(100, percentage)) }
        : dist
    ));
  };

  const equallyDistribute = () => {
    const equalPercentage = Math.floor(100 / distributions.length);
    const remainder = 100 - (equalPercentage * distributions.length);

    setDistributions(prev => prev.map((dist, index) => ({
      ...dist,
      percentage: equalPercentage + (index === 0 ? remainder : 0)
    })));
  };

  const validateForm = () => {
    if (totalPercentage !== 100) {
      toast({
        title: "Invalid Distribution",
        description: `The total percentage must equal 100%. Currently: ${totalPercentage}%`,
        variant: "destructive"
      });
      return false;
    }

    for (const dist of distributions) {
      if (dist.percentage <= 0) {
        toast({
          title: "Invalid Percentage",
          description: "Each beneficiary must receive at least 1% of the estate.",
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onContinue?.(distributions);
      toast({
        title: "Estate Distribution Saved",
        description: "Your estate distribution has been saved successfully."
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
            <div className="step-indicator mb-2">2.5</div>
            <h1 className="text-2xl font-semibold text-foreground">Estate Distribution</h1>
            <p className="text-muted-foreground text-sm mt-1">Step 2.5</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-foreground mb-2">
              How would you like to distribute your estate among your beneficiaries?
            </p>
            <p className="text-muted-foreground text-sm">
              The total must equal 100%
            </p>
          </div>

          {/* Total Percentage Indicator */}
          <Card className="p-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Allocated:</span>
              <span className={`text-lg font-bold ${totalPercentage === 100 ? 'text-primary' : 'text-destructive'}`}>
                {totalPercentage}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  totalPercentage === 100 ? 'bg-primary' : 'bg-destructive'
                }`}
                style={{ width: `${Math.min(totalPercentage, 100)}%` }}
              />
            </div>
          </Card>

          <Card className="form-section">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Distribution Percentages</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={equallyDistribute}
              >
                Equal Distribution
              </Button>
            </div>

            <div className="space-y-4">
              {distributions.map((dist) => (
                <div key={dist.beneficiaryId} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{dist.beneficiaryName}</p>
                    <p className="text-sm text-muted-foreground">({dist.relation})</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={dist.percentage}
                      onChange={(e) => updateDistribution(dist.beneficiaryId, parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                    />
                    <span className="text-foreground">%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="continue-button"
            disabled={totalPercentage !== 100}
          >
            Continue to Executor Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstateDistributionForm;