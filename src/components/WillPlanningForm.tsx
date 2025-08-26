import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import BeneficiaryForm from "./BeneficiaryForm";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  identificationType: z.string({
    required_error: "Please select an identification type.",
  }),
  identificationNumber: z.string().min(1, {
    message: "Identification number is required.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Please select your gender.",
  }),
  maritalStatus: z.string({
    required_error: "Please select your marital status.",
  }),
  numberOfChildren: z.string({
    required_error: "Please select number of children.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const WillPlanningForm = () => {
  const [step, setStep] = useState(1);
  const [userFormData, setUserFormData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      identificationType: "",
      identificationNumber: "",
      gender: undefined,
      maritalStatus: "",
      numberOfChildren: "",
    },
  });

  const onSubmit = (values: FormData) => {
    setUserFormData(values);
    setStep(2);
  };

  const handleBeneficiaryBack = () => {
    setStep(1);
  };

  const handleBeneficiaryContinue = (beneficiaries: any[]) => {
    console.log('User info:', userFormData);
    console.log('Beneficiaries:', beneficiaries);
    // Handle final submission here
  };

  if (step === 2 && userFormData) {
    return (
      <BeneficiaryForm
        onBack={handleBeneficiaryBack}
        onContinue={handleBeneficiaryContinue}
        userInfo={userFormData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" className="mr-4">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Will Writing</h1>
        </div>

        {/* Step indicator */}
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Step {step}</p>
        </div>

        {/* Form title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">About Me</h2>
          <p className="text-muted-foreground">
            Please enter your details accurately
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ... keep existing form fields ... */}
            
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Full Name (as per ID)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Identification Type */}
            <FormField
              control={form.control}
              name="identificationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Identification Type
                  </FormLabel>
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

            {/* Identification Number */}
            <FormField
              control={form.control}
              name="identificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Identification Number
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your identification number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 rounded-lg border p-4">
                        <RadioGroupItem value="male" id="male" />
                        <label
                          htmlFor="male"
                          className="text-base font-medium cursor-pointer flex-1"
                        >
                          Male
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border p-4">
                        <RadioGroupItem value="female" id="female" />
                        <label
                          htmlFor="female"
                          className="text-base font-medium cursor-pointer flex-1"
                        >
                          Female
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marital Status */}
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Marital Status
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Children */}
            <FormField
              control={form.control}
              name="numberOfChildren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Number of Children
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of children" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Continue Button */}
            <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WillPlanningForm;