import React from "react";
import { motion } from "motion/react";

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AnimatedInput = React.forwardRef<
  HTMLInputElement,
  AnimatedInputProps
>(({ label, id, error, className, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`text-xs capitalize font-semibold text-black opacity-70`}
      >
        {label}
      </label>

      <input
        id={id}
        ref={ref}
        className={`
              rounded-lg text-sm px-4 py-2 w-full outline-0 bg-background border-2 focus:ring-2 text-md 
              focus:ring-blue-600/30 focus:border-blue-700/50 placeholder:text-xs placeholder:opacity-80 border-border`}
        {...props}
      />

      {props?.["aria-invalid"] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] first-letter:capitalize leading-tight text-red-600 font-medium tracking-widest font-sans"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

AnimatedInput.displayName = "AnimatedInput";

// export function renderInput(props: ZodObject) {
//   return <AnimatedInput {...props} />;
// }
