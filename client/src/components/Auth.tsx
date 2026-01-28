import z from "zod";
import { useForm } from "react-hook-form";
import { AnimatedInput } from "./AnimatedInput";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { AnimatedButton } from "./AnimatedButton";
import auth from "@/services/AuthService";

const authSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "password must have exactly 6 characters"),
});

type AuthSchema = z.infer<typeof authSchema>;

const Auth = () => {
  const form = useForm<AuthSchema>({ resolver: zodResolver(authSchema) });

  const onSubmit = async (data: AuthSchema) => {
    try {
      await auth.login(data.email, data.password);
    } catch (ex) {
      console.log(ex);
    }
  };

  const {
    formState: { errors },
  } = form;

  return (
    <section className="min-h-screen py-32 px-6 max-w-md mx-auto">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 rounded-full animate-blob mix-blend-multiply bg-blue-300 blur-3xl opacity-15" />
        <div className="absolute top-0 -right-4 w-72 h-72 rounded-full animate-blob mix-blend-multiply bg-purple-300 blur-3xl opacity-15" />
        <div className="absolute bottom-0 w-72 left-1/2 h-72 rounded-full animate-blob mix-blend-multiply bg-purple-300 blur-3xl opacity-15" />
      </div>
      <div className="bg-transparent rounded-3xl p-8 md:p-12 border border-border shadow-xl overflow-hidden">
        <h2 className="capitalize text-center mb-8 text-3xl">Sign in</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mx-auto flex flex-col gap-6">
            <AnimatedInput
              type="email"
              id="email"
              label="email"
              {...form.register("email")}
              aria-invalid={!!errors.email?.message}
              error={errors.email?.message}
            />

            <AnimatedInput
              type="password"
              id="password"
              label="password"
              {...form.register("password")}
              aria-invalid={!!errors.password?.message}
              error={errors.password?.message}
            />
          </div>

          <AnimatedButton className="w-full">Sign in</AnimatedButton>
        </form>
      </div>
    </section>
  );
};

export default Auth;
