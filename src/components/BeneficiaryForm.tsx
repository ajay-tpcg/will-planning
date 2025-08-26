import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EstateDistributionForm from "./EstateDistributionForm";

// Schema for adding new beneficiary
const beneficiarySchema = z.object({
  relationship: z.string({
    required_error: "Please select a relationship.",
  }),
  fullName: z.string().optional(),
  institutionName: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  uenNumber: z.string().optional(),
}).refine((data) => {
  if (data.relationship === "ngo") {
    return data.institutionName && data.uenNumber;
  } else {
    return data.fullName && data.identificationType && data.identificationNumber;
  }
}, {
  message: "All required fields must be filled",
});

type BeneficiaryFormData = z.infer<typeof beneficiarySchema>;

interface Beneficiary {
  id: string;
  fullName: string;
  relationship: string;
  type: 'person' | 'organization';
}

interface BeneficiaryFormProps {
  onBack: () => void;
  onContinue: (beneficiaries: Beneficiary[]) => void;
  userInfo: {
    fullName?: string;
    identificationType?: string;
    identificationNumber?: string;
    gender?: "male" | "female";
    maritalStatus?: string;
    numberOfChildren?: string;
  };
}

const BeneficiaryForm = ({ onBack, onContinue, userInfo }: BeneficiaryFormProps) => {
  const [step, setStep] = useState(1);
  
  // Generate default beneficiaries based on user info
  const generateDefaultBeneficiaries = (): Beneficiary[] => {
    const beneficiaries: Beneficiary[] = [];
    
    // Add spouse if married
    if (userInfo.maritalStatus === "married") {
      beneficiaries.push({
        id: "spouse-1",
        fullName: "Sophia Carter", // This would come from actual spouse data
        relationship: "Spouse",
        type: 'person'
      });
    }
    
    // Add children based on number
    const childrenCount = parseInt(userInfo.numberOfChildren) || 0;
    for (let i = 0; i < Math.min(childrenCount, 2); i++) {
      beneficiaries.push({
        id: `child-${i + 1}`,
        fullName: i === 0 ? "Liam Carter" : "Olivia Carter", // This would come from actual children data
        relationship: "Child",
        type: 'person'
      });
    }
    
    return beneficiaries;
  };

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(generateDefaultBeneficiaries());
  const [showAddForm, setShowAddForm] = useState(false);

  const form = useForm<BeneficiaryFormData>({
    resolver: zodResolver(beneficiarySchema),
    defaultValues: {
      relationship: "",
      fullName: "",
      institutionName: "",
      identificationType: "",
      identificationNumber: "",
      uenNumber: "",
    },
  });

  const selectedRelationship = form.watch("relationship");

  const onSubmitBeneficiary = (values: BeneficiaryFormData) => {
    const newBeneficiary: Beneficiary = {
      id: `beneficiary-${Date.now()}`,
      fullName: values.relationship === "ngo" ? values.institutionName! : values.fullName!,
      relationship: values.relationship === "ngo" ? "NGO" : values.relationship,
      type: values.relationship === "ngo" ? 'organization' : 'person'
    };
    
    setBeneficiaries([...beneficiaries, newBeneficiary]);
    setShowAddForm(false);
    form.reset();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    form.reset();
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleDistributionBack = () => {
    setStep(1);
  };

  const handleDistributionContinue = (distributions: Beneficiary[]) => {
    console.log('Final distributions:', distributions);
    onContinue(distributions);
  };

  if (step === 2) {
    return (
      <EstateDistributionForm
        onBack={handleDistributionBack}
        onContinue={handleDistributionContinue}
        beneficiaries={beneficiaries}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" className="mr-4" onClick={onBack}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Add beneficiaries</h1>
        </div>

        {/* Step indicator */}
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Step 2</p>
        </div>

        {/* Current beneficiaries */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Current beneficiaries</h2>
          <div className="space-y-3">
            {beneficiaries.map((beneficiary) => (
              <div key={beneficiary.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-emerald-400 rounded-sm"></div>
                  <div>
                    <p className="font-medium">{beneficiary.fullName}</p>
                    <p className="text-sm text-muted-foreground">{beneficiary.relationship}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Add new beneficiary section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Add new beneficiary</h3>
          
          {!showAddForm ? (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Add
            </Button>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitBeneficiary)} className="space-y-4">
                {/* Relationship */}
                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Relationship</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="relative">Relative</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Person fields */}
                {selectedRelationship && selectedRelationship !== "ngo" && (
                  <>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Full name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="identificationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Identification Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="NRIC" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nric">NRIC</SelectItem>
                              <SelectItem value="passport">Passport</SelectItem>
                              <SelectItem value="fin">FIN</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="identificationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Identification number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter ID number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* NGO fields */}
                {selectedRelationship === "ngo" && (
                  <>
                    <FormField
                      control={form.control}
                      name="institutionName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Institution Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter institution name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="uenNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">UEN number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter UEN number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Form buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          disabled={beneficiaries.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BeneficiaryForm;