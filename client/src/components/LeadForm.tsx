import { useForm } from "react-hook-form";
import { motion, useAnimation } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

import { AnimatedButton } from "./AnimatedButton";
import { AnimatedInput } from "./AnimatedInput";
import { useCreateOrg, type OrgCreateAPI } from "@/hooks/useCreateOrg";
import { orgCreateSchema } from "@/types/schemas";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const LeadForm = () => {
  const { mutate, isPending } = useCreateOrg();
  const form = useForm({ resolver: zodResolver(orgCreateSchema) });

  const navigate = useNavigate();
  const controls = useAnimation();

  const onSubmit = (data: OrgCreateAPI) => {
    orgCreateSchema.parse(data);
    mutate(data, {
      onSuccess: async () => {
        await controls.start({ scaleY: 0, transition: { duration: 0.5 } });

        toast("Organization created successfully", {
          description() {
            return "Navigating to Dashboard ...";
          },
        });

        navigate("/dash");
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  const {
    formState: { errors },
  } = form;

  return (
    <motion.section
      id="contact"
      animate={controls}
      className="py-24 px-6 relative"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-transparent rounded-3xl p-8 md:p-12 border border-border shadow-2xl relative overflow-hidden">
          {/* Decorative background blob inside card */}

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl font-display font-bold mb-4 tracking-wide leading-[1.2]">
              Ready to streamline your business?
            </h2>
            <p className="text-foreground font-medium leading-tight text-sm">
              Get an email of a personalized demo of Minibooks. Create an
              account and see how much time you can save today.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedInput
                id="businessName"
                label="business name"
                {...form.register("businessName")}
                placeholder="john Doe's Studio"
                aria-invalid={!!errors?.businessName?.message}
                error={errors?.businessName?.message}
              />

              <AnimatedInput
                id="email"
                type="email"
                label="Email"
                {...form.register("email")}
                placeholder="johndoe@company.com"
                aria-invalid={!!errors?.email?.message}
                error={errors?.email?.message}
              />

              <AnimatedInput
                id="password"
                type="password"
                label="password"
                error={errors?.password?.message}
                aria-invalid={!!errors?.password?.message}
                {...form.register("password")}
              />

              <AnimatedInput
                id="contact"
                type="tel"
                label="contact"
                error={errors?.contact?.message}
                aria-invalid={!!errors?.contact?.message}
                {...form.register("contact")}
              />
            </div>

            <AnimatedButton
              size="lg"
              type="submit"
              className="w-full"
              loading={isPending}
            >
              Get Onboard
            </AnimatedButton>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default LeadForm;
