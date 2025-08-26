import { useNavigate } from "react-router-dom";
import ConfirmationPreview from "@/components/ConfirmationPreview";

const Confirmation = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate to previous step (executor registration)
    navigate("/executor-registration");
  };

  const handleEdit = (section: string) => {
    // Navigate to specific sections based on what user wants to edit
    switch (section) {
      case "personal details":
        navigate("/personal-details");
        break;
      case "beneficiaries":
        navigate("/beneficiaries");
        break;
      case "estate distribution":
        navigate("/estate-distribution");
        break;
      case "executor and trustee":
        navigate("/executor-registration");
        break;
      default:
        break;
    }
  };

  const handleContinue = () => {
    // Navigate to final step (payment, document generation, etc.)
    alert("Will confirmed! This is where you'd proceed to final steps like payment or document generation.");
  };

  return (
    <ConfirmationPreview
      onBack={handleBack}
      onEdit={handleEdit}
      onContinue={handleContinue}
    />
  );
};

export default Confirmation;