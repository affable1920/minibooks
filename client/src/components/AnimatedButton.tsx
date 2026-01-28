import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMemo, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
}

const baseStyles = `relative inline-flex items-center justify-center rounded-xl font-semibold
 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 
 disabled:pointer-events-none overflow-hidden`;

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-lg shadow-primary/25",

  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",

  outline:
    "border-2 border-primary/20 bg-transparent text-primary hover:bg-primary/5 focus:ring-primary",

  ghost: "bg-transparent hover:bg-muted focus:ring-muted",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function AnimatedButton({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  ...props
}: AnimatedButtonProps) {
  const classConfig = useMemo(() => {
    return [baseStyles, variants[variant], sizes[size], className]
      .filter(Boolean)
      .join(" ")
      .trim();
  }, [variant, size, className]);

  return (
    <motion.button
      whileHover={{
        scale: disabled || loading ? 1 : 1.02,
        y: disabled || loading ? 0 : -2,
      }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={classConfig}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <span className="relative z-10 flex items-center gap-2">
        {children as ReactNode}
      </span>

      {/* Shine effect for primary buttons */}
      {variant === "primary" && !disabled && !loading && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
}
