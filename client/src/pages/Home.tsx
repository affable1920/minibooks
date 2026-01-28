import Hero from "@/components/Hero";
import Plans from "@/components/Plans";
import LeadForm from "@/components/LeadForm";
import DemoPreview from "@/components/DemoPreview";
import { FeatureCard } from "@/components/FeatureCard";

import { BarChart3, Users, Package, Receipt } from "lucide-react";

// Mock data for features
const features = [
  {
    icon: Receipt,
    title: "Smart Accounting",
    description:
      "Automate your invoices, track expenses, and get real-time financial insights without the headache.",
  },
  {
    icon: Users,
    title: "HR & Payroll",
    description:
      "Manage your team, process payroll in one click, and handle benefits all in one secure place.",
  },
  {
    icon: Package,
    title: "Inventory Control",
    description:
      "Track stock levels, set reorder points, and manage suppliers with our intelligent inventory system.",
  },
  {
    icon: BarChart3,
    title: "CRM & Sales",
    description:
      "Track leads, manage customer relationships, and close more deals with integrated sales pipelines.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden font-body bg-background selection:bg-primary/20">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything you need to run your business
            </h2>
            <p className="text-muted-foreground text-md leading-tight">
              Powerful features wrapped in a simple, intuitive interface
              designed for modern teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive/Demo Preview Section */}
      <DemoPreview />

      {/* Pricing */}
      <Plans />

      {/* Contact / Lead Gen */}
      <LeadForm />

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white font-bold text-xs">
              M
            </div>
            <span className="font-bold font-display">Minibooks</span>
          </div>
          <div className="text-sm text-foreground">
            © 2024 Minibooks Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
            <a href="#" className="hover:text-primary">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
