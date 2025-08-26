import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PersonalDetails {
  fullName: string;
  idNumber: string;
  gender: string;
  maritalStatus: string;
  numberOfChildren: number;
  email: string;
  phone: string;
}

interface PersonalDetailsFormProps {
  onBack: () => void;
  onContinue: (details: PersonalDetails) => void;
}

const PersonalDetailsForm = ({ onBack, onContinue }: PersonalDetailsFormProps) => {
  const [formData, setFormData] = useState<PersonalDetails>({
    fullName: "",
    idNumber: "",
    gender: "",
    maritalStatus: "",
    numberOfChildren: 0,
    email: "",
    phone: ""
  });

  const handleInputChange = (field: keyof PersonalDetails, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'idNumber', 'gender', 'maritalStatus', 'email', 'phone'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof PersonalDetails]) {
        toast({
          title: "Required Fields Missing",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) return;
    onContinue(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button onClick={onBack} className="back-button mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">About Me</h1>
            <p className="text-muted-foreground">
              Tell us about yourself to get started
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="form-section">
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                Full Name *
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="form-input"
              />
            </div>

            {/* ID Number */}
            <div className="space-y-2">
              <Label htmlFor="idNumber" className="text-sm font-medium text-foreground">
                NRIC/Passport Number *
              </Label>
              <Input
                id="idNumber"
                placeholder="Enter your ID number"
                value={formData.idNumber}
                onChange={(e) => handleInputChange("idNumber", e.target.value)}
                className="form-input"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Gender *
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Marital Status *
              </Label>
              <Select
                value={formData.maritalStatus}
                onValueChange={(value) => handleInputChange("maritalStatus", value)}
              >
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Children */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Number of Children
              </Label>
              <Select
                value={formData.numberOfChildren.toString()}
                onValueChange={(value) => handleInputChange("numberOfChildren", parseInt(value))}
              >
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select number of children" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num === 0 ? "No children" : `${num} ${num === 1 ? "child" : "children"}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="form-input"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="form-input"
              />
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="continue-button"
            >
              Continue
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;