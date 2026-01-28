import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const contentList = [
  "Real-time data synchronization",
  "Automated daily backups",
  "Bank-grade security encryption",
  "One-click report generation",
];

const DemoPreview = () => {
  return (
    <section id="demo" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mockup */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="bg-white pt-10 pb-0 pl-0 min-h-100">
                <div className="flex h-full">
                  {/* Content Mock */}
                  <div className="flex-1 p-6 bg-slate-50/30">
                    <div className="flex justify-between mb-8">
                      <div className="h-6 w-32 bg-slate-200 rounded" />
                      <div className="h-8 w-24 bg-primary rounded shadow-lg shadow-primary/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="h-24 bg-muted/75 rounded-xl border border-border shadow-sm p-4" />
                      <div className="h-24 bg-background/50 rounded-xl border border-border shadow-sm p-4" />
                    </div>
                    <div className="h-48 bg-white rounded-xl border border-border/50 shadow-sm p-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Built for speed and clarity
            </h2>
            <p className="text-md text-muted-foreground mb-8">
              Stop wrestling with clunky legacy software. Minibooks is designed
              to be intuitive from day one, so your team can focus on work, not
              learning tools.
            </p>
            <ul className="space-y-6">
              {contentList.map((item, i) => (
                <motion.li
                  key={i}
                  transition={{ delay: i * 0.1 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 font-semibold"
                >
                  <CheckCircle2 className="text-green-700 w-4 h-4" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoPreview;
