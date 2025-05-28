import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonSpinnerProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const ButtonSpinner = React.forwardRef<SVGSVGElement, ButtonSpinnerProps>(
  ({ className, size = "sm" }, ref) => {
    const sizeClasses = {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    };

    return (
      <svg
        ref={ref}
        className={cn(
          "animate-spin text-current",
          sizeClasses[size],
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }
);

ButtonSpinner.displayName = "ButtonSpinner";

export { ButtonSpinner };
