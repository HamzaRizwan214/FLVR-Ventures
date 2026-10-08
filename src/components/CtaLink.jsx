import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Pill + circular arrow, as in the reference. variant: "primary" | "outline".
export default function CtaLink({ to, variant = "primary", className, children }) {
  return (
    <Link to={to} className={cn("cta", `cta--${variant}`, className)}>
      <span className="cta-pill">{children}</span>
      <span className="cta-circle" aria-hidden="true">
        <ArrowUpRight size={17} strokeWidth={1.5} className="rtl:-scale-x-100" />
      </span>
    </Link>
  );
}
