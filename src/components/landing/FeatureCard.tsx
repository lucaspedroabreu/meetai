import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  gradient,
  delay = 0,
}: FeatureCardProps) => (
  <div
    className="group relative animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Glow effect on hover */}
    <div
      className={cn(
        "absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500",
        gradient
      )}
    />

    {/* Card */}
    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 h-full group-hover:scale-105 group-hover:border-white/20">
      {/* Icon container */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
          "bg-gradient-to-br",
          gradient,
          "shadow-lg group-hover:scale-110 transition-transform duration-300"
        )}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <h3 className="font-bold text-lg text-white mb-2 group-hover:text-white/95 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>
);
