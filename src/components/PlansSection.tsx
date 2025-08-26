import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PlansSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Basic Plan */}
      <Card className="p-8 border-2 border-border hover:border-primary/50 transition-colors">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">Basic Will</h3>
          <div className="text-4xl font-bold text-primary mb-1">$99</div>
          <p className="text-muted-foreground">One-time payment</p>
        </div>

        <ul className="space-y-3 mb-8">
          {[
            "Simple will creation",
            "Basic asset distribution",
            "Executor appointment",
            "Legal document generation",
            "Email support"
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Link to="/eligibility-check">
          <Button variant="outline" className="w-full">
            Get Started
          </Button>
        </Link>
      </Card>

      {/* Premium Plan */}
      <Card className="p-8 border-2 border-primary bg-primary/5 relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">Premium Will</h3>
          <div className="text-4xl font-bold text-primary mb-1">$199</div>
          <p className="text-muted-foreground">One-time payment</p>
        </div>

        <ul className="space-y-3 mb-8">
          {[
            "Everything in Basic",
            "Trust creation options",
            "Advanced asset planning",
            "Guardian nominations",
            "Priority support",
            "Annual review reminder",
            "Legal consultation (1 hour)"
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Link to="/eligibility-check">
          <Button className="w-full">
            Get Started
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default PlansSection;