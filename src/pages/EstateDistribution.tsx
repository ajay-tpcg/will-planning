import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EstateDistributionForm from "@/components/EstateDistributionForm";

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

const EstateDistribution = () => {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  useEffect(() => {
    // Load beneficiaries from localStorage
    const stored = localStorage.getItem('willPlanningBeneficiaries');
    if (stored) {
      setBeneficiaries(JSON.parse(stored));
    }
  }, []);

  const handleBack = () => {
    navigate("/beneficiaries");
  };

  const handleContinue = (distributions: EstateDistribution[]) => {
    // Store estate distribution data
    localStorage.setItem('willPlanningDistributions', JSON.stringify(distributions));
    console.log("Estate Distributions:", distributions);

    // Navigate to executor registration step
    navigate("/executor-registration");
  };

  return (
    <EstateDistributionForm
      onBack={handleBack}
      onContinue={handleContinue}
      beneficiaries={beneficiaries}
    />
  );
};

export default EstateDistribution;