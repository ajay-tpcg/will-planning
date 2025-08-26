import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalDetails {
  fullName: string;
  idNumber: string;
  gender: string;
  maritalStatus: string;
  numberOfChildren: number;
}

interface Beneficiary {
  relation: string;
  fullName: string;
  idNumber: string;
}

interface EstateDistribution {
  beneficiaryName: string;
  relation: string;
  percentage: number;
}

interface ExecutorDetails {
  relation: string;
  fullName: string;
  idNumber: string;
}

interface ConfirmationData {
  personalDetails: PersonalDetails;
  beneficiaries: Beneficiary[];
  estateDistribution: EstateDistribution[];
  mainExecutor: ExecutorDetails;
  alternativeExecutor: ExecutorDetails;
}

interface ConfirmationPreviewProps {
  onBack?: () => void;
  onEdit?: (section: string) => void;
  onContinue?: () => void;
  data?: ConfirmationData;
}

const ConfirmationPreview = ({
  onBack,
  onEdit,
  onContinue,
  data
}: ConfirmationPreviewProps) => {
  const { toast } = useToast();

  // Sample data - in real app this would come from props or state management
  const defaultData: ConfirmationData = {
    personalDetails: {
      fullName: "Sophia Carter",
      idNumber: "1234567890",
      gender: "Female",
      maritalStatus: "Married",
      numberOfChildren: 2
    },
    beneficiaries: [
      {
        relation: "Daughter",
        fullName: "Olivia Bennett",
        idNumber: "9876543210"
      },
      {
        relation: "Son",
        fullName: "Ethan Bennett",
        idNumber: "5678901234"
      }
    ],
    estateDistribution: [
      {
        beneficiaryName: "Olivia Bennett (Daughter)",
        relation: "Daughter",
        percentage: 50
      },
      {
        beneficiaryName: "Ethan Bennett (Son)",
        relation: "Son",
        percentage: 50
      }
    ],
    mainExecutor: {
      relation: "Brother",
      fullName: "Liam Carter",
      idNumber: "1122334455"
    },
    alternativeExecutor: {
      relation: "Friend",
      fullName: "Noah Thompson",
      idNumber: "2233445566"
    }
  };

  const confirmationData = data || defaultData;

  const handleEdit = (section: string) => {
    onEdit?.(section);
    toast({
      title: "Redirecting to Edit",
      description: `Taking you back to edit ${section} details.`
    });
  };

  const handleContinue = () => {
    toast({
      title: "Will Confirmed",
      description: "Your will details have been confirmed and are ready for finalization.",
    });
    onContinue?.();
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
            <div className="step-indicator mb-2">4</div>
            <h1 className="text-2xl font-semibold text-foreground">Confirmation</h1>
            <p className="text-muted-foreground text-sm mt-1">Step 4</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Almost there!</h2>
            <p className="text-foreground">
              Please check that all details{" "}
              <span className="italic text-muted-foreground">(especially Full Name and Identification Number)</span>{" "}
              provided are accurate as they will be reflected in your will.
            </p>
          </div>

          {/* About Me Section */}
          <Card className="form-section">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">About Me</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit("personal details")}
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-primary font-medium">Full Name</p>
                <p className="text-foreground">{confirmationData.personalDetails.fullName}</p>
              </div>
              <div>
                <p className="text-primary font-medium">ID Number</p>
                <p className="text-foreground">{confirmationData.personalDetails.idNumber}</p>
              </div>
              <div>
                <p className="text-primary font-medium">Gender</p>
                <p className="text-foreground">{confirmationData.personalDetails.gender}</p>
              </div>
              <div>
                <p className="text-primary font-medium">Marital Status</p>
                <p className="text-foreground">{confirmationData.personalDetails.maritalStatus}</p>
              </div>
              <div>
                <p className="text-primary font-medium">Number of Children</p>
                <p className="text-foreground">{confirmationData.personalDetails.numberOfChildren}</p>
              </div>
            </div>
          </Card>

          {/* Beneficiaries Section */}
          <Card className="form-section">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">My Beneficiaries</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit("beneficiaries")}
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>

            <div className="space-y-4">
              {confirmationData.beneficiaries.map((beneficiary, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 text-sm p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-primary font-medium">Relation</p>
                    <p className="text-foreground">{beneficiary.relation}</p>
                  </div>
                  <div>
                    <p className="text-primary font-medium">Full Name</p>
                    <p className="text-foreground">{beneficiary.fullName}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-primary font-medium">ID Number</p>
                    <p className="text-foreground">{beneficiary.idNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Estate Distribution Section */}
          <Card className="form-section">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">My Estate Distribution</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit("estate distribution")}
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>

            <div className="space-y-3">
              {confirmationData.estateDistribution.map((distribution, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg text-sm">
                  <div>
                    <p className="text-primary font-medium">{distribution.beneficiaryName}</p>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">{distribution.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Executor & Trustee Section */}
          <Card className="form-section">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">My Executor & Trustee</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit("executor and trustee")}
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>

            <div className="space-y-6">
              {/* Main Executor */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-medium text-foreground mb-3">Main Executor & Trustee</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-primary font-medium">Relation</p>
                    <p className="text-foreground">{confirmationData.mainExecutor.relation}</p>
                  </div>
                  <div>
                    <p className="text-primary font-medium">Full Name</p>
                    <p className="text-foreground">{confirmationData.mainExecutor.fullName}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-primary font-medium">ID Number</p>
                    <p className="text-foreground">{confirmationData.mainExecutor.idNumber}</p>
                  </div>
                </div>
              </div>

              {/* Alternative Executor */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-medium text-foreground mb-3">Alternative Executor & Trustee</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-primary font-medium">Relation</p>
                    <p className="text-foreground">{confirmationData.alternativeExecutor.relation}</p>
                  </div>
                  <div>
                    <p className="text-primary font-medium">Full Name</p>
                    <p className="text-foreground">{confirmationData.alternativeExecutor.fullName}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-primary font-medium">ID Number</p>
                    <p className="text-foreground">{confirmationData.alternativeExecutor.idNumber}</p>
                  </div>
                </div>
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

export default ConfirmationPreview;