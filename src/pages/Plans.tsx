import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Plans = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">WillPlanner</h1>
                <p className="text-sm text-muted-foreground">Secure Your Legacy</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground">
            Professional will writing made simple and affordable
          </p>
        </div>

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

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include secure document storage and lifetime access
          </p>
          <p className="text-sm text-muted-foreground">
            Need help choosing? <a href="#" className="text-primary hover:underline">Contact our team</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Plans;