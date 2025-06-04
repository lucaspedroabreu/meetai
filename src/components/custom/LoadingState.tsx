import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  showSpinner?: boolean;
}

const sizeConfig = {
  sm: {
    container: "p-6",
    spinner: "size-4",
    title: "text-base",
    description: "text-xs",
    gap: "gap-y-4",
  },
  md: {
    container: "p-8",
    spinner: "size-6",
    title: "text-lg",
    description: "text-sm",
    gap: "gap-y-6",
  },
  lg: {
    container: "p-12",
    spinner: "size-8",
    title: "text-xl",
    description: "text-base",
    gap: "gap-y-8",
  },
};

export function LoadingState({
  title,
  description,
  action,
  size = "md",
  className,
  showSpinner = true,
}: LoadingStateProps) {
  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        "py-4 px-8 flex flex-1 items-center justify-center",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl shadow-sm",
          config.container,
          config.gap
        )}
      >
        {showSpinner && (
          <div className="relative">
            <Loader2Icon
              className={cn(config.spinner, "animate-spin text-primary")}
            />
            <div
              className={cn(
                config.spinner,
                "absolute inset-0 rounded-full border-2 border-primary/10"
              )}
            />
          </div>
        )}
        <div className="flex flex-col gap-y-2 text-center max-w-sm">
          <h6 className={cn(config.title, "font-semibold text-foreground")}>
            {title}
          </h6>
          <p
            className={cn(
              config.description,
              "text-muted-foreground leading-relaxed"
            )}
          >
            {description}
          </p>
          {action && <div className="mt-2">{action}</div>}
        </div>
      </div>
    </div>
  );
}
