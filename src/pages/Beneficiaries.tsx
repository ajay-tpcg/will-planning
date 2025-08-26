import { useNavigate } from "react-router-dom";
import BeneficiariesForm from "@/components/BeneficiariesForm";

interface Beneficiary {
  id: string;
  relation: string;
  fullName: string;
  idNumber: string;
}

const Beneficiaries = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if user has family info to determine correct back route
    const familyInfo = localStorage.getItem('willPlanningFamilyInfo');
    if (familyInfo) {
      navigate("/family-information");
    } else {
      navigate("/personal-details");
    }
  };

  const handleContinue = (beneficiaries: Beneficiary[]) => {
    // Store beneficiaries data
    localStorage.setItem('willPlanningBeneficiaries', JSON.stringify(beneficiaries));
    console.log("Beneficiaries:", beneficiaries);

    // Navigate to estate distribution step
    navigate("/estate-distribution");
  };

  return (
    <BeneficiariesForm
      onBack={handleBack}
      onContinue={handleContinue}
    />
  );
};

export default Beneficiaries;