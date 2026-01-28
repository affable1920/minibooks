import { motion } from "motion/react";
import { ArrowRight, Video } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            v2.0 is now live
          </motion.div>

          <h1
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 bg-clip-text 
          text-transparent bg-linear-to-r from-foreground to-foreground/70"
          >
            Simplify Your <br />
            <span className="text-primary">Entire Business</span>
          </h1>

          <p className="text-md md:text-lg text-muted-foreground mb-8 max-w-lg leading-normal">
            Minibooks brings your accounting, HR, and inventory together in one
            beautiful, easy-to-use platform. No more spreadsheets.
          </p>

          <div className="flex flex-col gap-4">
            <AnimatedButton
              size="lg"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Start Free Trial <ArrowRight size={14} />
            </AnimatedButton>
            <AnimatedButton size="lg" variant="outline">
              View Live Demo
              <Video size={14} />
            </AnimatedButton>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background md:border-transparent bg-muted  overflow-hidden"
                >
                  {/* Placeholder avatars */}
                  <div
                    className={`w-full h-full bg-linear-to-tr from-slate-200 to-slate-300`}
                  />
                </div>
              ))}
            </div>
            <p>Trusted by 2,000+ companies</p>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-border/50 bg-white/50 backdrop-blur-sm">
            {/* Abstract Dashboard Mockup */}
            <div className="aspect-4/3 bg-linear-to-br from-white to-slate-50 p-6 flex flex-col gap-4">
              {/* Mock Header - reactange and two cricles */}
              <div className="flex justify-between items-center mb-4">
                <div className="w-32 h-8 bg-slate-200 rounded-lg animate-pulse" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200" />
                  <div className="w-8 h-8 rounded-full bg-slate-200" />
                </div>
              </div>

              {/* Mock Charts */}
              <div className="grid grid-cols-3 gap-4 h-32">
                <div className="col-span-2 bg-primary/5 rounded-xl border border-primary/10 p-4 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-primary/20 rounded-b-xl" />
                  <div className="w-full h-2 bg-primary/30 mt-8 rounded-full" />
                  <div className="w-2/3 h-2 bg-primary/30 mt-2 rounded-full" />
                </div>
                <div className="bg-accent/10 rounded-xl border border-accent/20" />
              </div>

              {/* Mock Table */}
              <div className="flex-1 space-y-3 bg-white rounded-xl border border-border/50 p-4 shadow-sm">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-100 animate-pulse" />
                      <div className="w-24 h-3 bg-slate-100 rounded" />
                    </div>
                    <div className="w-12 h-3 bg-slate-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-border/50 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <ArrowRight className="-rotate-45" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">
                  Revenue
                </p>
                <p className="text-lg font-bold text-foreground">+127%</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
