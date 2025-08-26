import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EligibilityCheck from "./pages/EligibilityCheck";
import PersonalDetails from "./pages/PersonalDetails";
import FamilyInformation from "./pages/FamilyInformation";
import Beneficiaries from "./pages/Beneficiaries";
import EstateDistribution from "./pages/EstateDistribution";
import ExecutorRegistration from "./pages/ExecutorRegistration";
import Confirmation from "./pages/Confirmation";
import Plans from "./pages/Plans";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/eligibility-check" element={<EligibilityCheck />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/family-information" element={<FamilyInformation />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/estate-distribution" element={<EstateDistribution />} />
          <Route path="/executor-registration" element={<ExecutorRegistration />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
