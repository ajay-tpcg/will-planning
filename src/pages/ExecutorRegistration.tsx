import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExecutorForm from "@/components/ExecutorForm";

interface ExecutorData {
  relationship: string;
  fullName: string;
  identificationType: string;
  identificationNumber: string;
}

const ExecutorRegistration = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/estate-distribution");
  };

  const handleContinue = (mainExecutor: ExecutorData, alternativeExecutor: ExecutorData) => {
    // Store the executor data
    localStorage.setItem('willPlanningMainExecutor', JSON.stringify(mainExecutor));
    localStorage.setItem('willPlanningAlternativeExecutor', JSON.stringify(alternativeExecutor));
    console.log("Main Executor:", mainExecutor);
    console.log("Alternative Executor:", alternativeExecutor);

    // Navigate to confirmation page
    navigate("/confirmation");
  };

  return (
    <ExecutorForm
      onBack={handleBack}
      onContinue={handleContinue}
    />
  );
};

export default ExecutorRegistration;