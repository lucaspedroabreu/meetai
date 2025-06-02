import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = ({
  children,
  className,
  ...props
}: GlassCardProps) => (
  <div
    className={cn(
      "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
