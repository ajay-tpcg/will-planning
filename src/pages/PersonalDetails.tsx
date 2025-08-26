import { useNavigate } from "react-router-dom";
import PersonalDetailsForm from "@/components/PersonalDetailsForm";

interface PersonalDetails {
  fullName: string;
  idNumber: string;
  gender: string;
  maritalStatus: string;
  numberOfChildren: number;
  email: string;
  phone: string;
}

const PersonalDetails = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/eligibility-check");
  };

  const handleContinue = (details: PersonalDetails) => {
    // Store personal details
    localStorage.setItem('willPlanningPersonalDetails', JSON.stringify(details));
    console.log("Personal Details:", details);

    // Check if user is married or has children to determine next step
    const isMarried = details.maritalStatus === 'Married';
    const hasChildren = details.numberOfChildren > 0;

    if (isMarried || hasChildren) {
      // Navigate to family information screen
      navigate("/family-information");
    } else {
      // Navigate directly to beneficiaries
      navigate("/beneficiaries");
    }
  };

  return (
    <PersonalDetailsForm
      onBack={handleBack}
      onContinue={handleContinue}
    />
  );
};

export default PersonalDetails;