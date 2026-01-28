import React from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { AnimatedButton } from "@components/AnimatedButton";
import { Menu, Minimize2 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const ref = React.useRef<HTMLDivElement | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const scrollIntoView = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();

    const href = ev.currentTarget.getAttribute("href");
    const id = href?.split("#")?.[1];

    if (!id) {
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const navbar = ref?.current;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (isMobileMenuOpen && !navbar?.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-card rounded-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-black text-xl">
            M
          </div>
          <span className="text-xl font-bold font-display tracking-wide">
            Minibooks
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features">Features</a>
          <a href="#demo">How it works</a>
          <a href="#pricing">Pricing</a>
          <AnimatedButton
            size="sm"
            variant="primary"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Started
          </AnimatedButton>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <Minimize2 /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 md:hidden 
            flex flex-col gap-8 shadow-xl w-full font-semibold [&>a]:text-sm"
          >
            <a href="#features" onClick={scrollIntoView}>
              Features
            </a>
            <a href="#demo" onClick={scrollIntoView}>
              How it works
            </a>
            <a href="#pricing" onClick={scrollIntoView}>
              Pricing
            </a>
            <div className="space-y-4">
              <AnimatedButton
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
              </AnimatedButton>
              <AnimatedButton variant="outline" className="w-full capitalize">
                <Link to="/auth">sign in</Link>
              </AnimatedButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
