import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PlansSection from "@/components/PlansSection";
import { Users, Shield, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">WillPlanner</h1>
                <p className="text-sm text-muted-foreground">Secure Your Legacy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/plans">
                <Button variant="ghost" size="sm">
                  View Plans
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Plan Your Will with
            <span className="text-primary block">Complete Confidence</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create a legally binding will in minutes. Our guided process ensures your assets are distributed according to your wishes.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/eligibility-check">
              <Button size="lg" className="continue-button text-lg px-8 py-4">
                Start Your Will
              </Button>
            </Link>
            <Link to="/plans">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                View Plans
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Legally Binding</h3>
            <p className="text-muted-foreground">
              Our wills are legally compliant and recognized by Singapore courts.
            </p>
          </Card>

          <Card className="p-6 text-center border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Expert Guidance</h3>
            <p className="text-muted-foreground">
              Step-by-step guidance from legal experts throughout the process.
            </p>
          </Card>

          <Card className="p-6 text-center border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Simple Process</h3>
            <p className="text-muted-foreground">
              Complete your will in just a few simple steps, no legal jargon.
            </p>
          </Card>
        </div>

        {/* How it Works */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Check Eligibility", desc: "Verify if our service suits your needs" },
              { step: 2, title: "Personal Details", desc: "Provide your basic information" },
              { step: 3, title: "Asset Distribution", desc: "Decide how to distribute your assets" },
              { step: 4, title: "Review & Sign", desc: "Review your will and make it official" }
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                  {step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card border border-border rounded-xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Secure Your Legacy?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands who have already created their wills with us.
          </p>
          <Link to="/eligibility-check">
            <Button size="lg" className="continue-button text-lg px-8 py-4">
              Start Your Will Today
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
