import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface ShineButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "gold";
  className?: string;
  icon?: boolean;
}

export function ShineButton({
  children,
  to,
  onClick,
  variant = "primary",
  className = "",
  icon = true,
}: ShineButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-premium font-semibold text-sm transition-all duration-300 btn-shine";
  
  const variantClasses = {
    primary: "bg-maroon-900 text-white hover:bg-maroon-800 shadow-luxury hover:shadow-lg",
    secondary: "bg-white text-maroon-900 hover:bg-maroon-50 border border-maroon-200",
    outline: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-maroon-900",
    gold: "bg-gold text-dark hover:bg-gold-light shadow-lg",
  };

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {content}
    </motion.button>
  );
}
