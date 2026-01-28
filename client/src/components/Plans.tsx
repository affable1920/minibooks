import { motion } from "framer-motion";
import { AnimatedButton } from "@components/AnimatedButton";

const plans = [
  {
    name: "Starter",
    price: "$29",
    desc: "Perfect for freelancers",
  },
  {
    name: "Growth",
    price: "$79",
    desc: "Best for small teams",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    desc: "For scaling organizations",
  },
];

const Plans = () => {
  return (
    <section id="pricing" className="py-12 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{
                y: -10,
                cursor: "pointer",
                transition: { duration: 0.3 },
              }}
              className={`p-8 rounded-2xl border ${plan.popular ? "bg-foreground border-muted-foreground/50 relative overflow-hidden" : "bg-slate-800 border-slate-700"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent-foreground text-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
                  POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 tracking-normal">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`tracking-wider ml-2 text-muted`}>/month</span>
              </div>
              <p
                className={`mb-6 ${plan.popular ? "text-primary-foreground/90" : "text-slate-400"}`}
              >
                {plan.desc}
              </p>
              <AnimatedButton
                variant={plan.popular ? "secondary" : "outline"}
                className={`w-full ${!plan.popular && "border-slate-600 text-white hover:bg-slate-700"}`}
              >
                Choose {plan.name}
              </AnimatedButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
