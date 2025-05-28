import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Base theme classes organized by purpose
const baseClasses = {
  layout:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
  typography: "text-sm font-medium",
  shape: "rounded-md",
  transitions: "transition-all duration-200",
  focus:
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  states:
    "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  validation:
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  icons:
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
};

// Complete variant themes (colors, effects, states, etc.)
const variantThemes = {
  default: {
    background: "bg-primary",
    text: "text-primary-foreground",
    shadow: "shadow-sm",
    hover: "hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25",
    dark: "dark:hover:shadow-primary/20",
  },
  outline: {
    background: "bg-background",
    text: "hover:text-accent-foreground",
    border: "border-2 border-border",
    shadow: "shadow-sm",
    hover: "hover:bg-accent hover:border-accent-foreground/20",
    dark: "dark:hover:bg-accent/50",
  },
  secondary: {
    background: "bg-secondary",
    text: "text-secondary-foreground",
    shadow: "shadow-sm",
    hover: "hover:bg-secondary/80 hover:shadow-md",
  },
  ghost: {
    hover: "hover:bg-accent hover:text-accent-foreground",
    dark: "dark:hover:bg-accent/30",
  },
  link: {
    text: "text-primary",
    decoration: "underline-offset-4 hover:underline hover:text-primary/80",
  },
  // Gradient themes
  call: {
    background: "bg-gradient-call",
    text: "text-white",
    shadow: "shadow-md",
    hover:
      "hover:bg-gradient-call-hover hover:shadow-lg hover:shadow-green-500/25",
  },
  leave: {
    background: "bg-gradient-leave",
    text: "text-white",
    shadow: "shadow-md",
    hover:
      "hover:bg-gradient-leave-hover hover:shadow-lg hover:shadow-red-500/25",
  },
  destructive: {
    background: "bg-red-600",
    text: "text-white",
    shadow: "shadow-sm",
    hover: "hover:bg-red-700 hover:shadow-md hover:shadow-red-600/25",
    focus: "focus-visible:ring-red-500/20",
    dark: "dark:bg-red-700 dark:hover:bg-red-800",
  },
  calendar: {
    background: "bg-gradient-calendar",
    text: "text-white",
    shadow: "shadow-md",
    hover:
      "hover:bg-calendar-hover hover:shadow-lg hover:shadow-calendar-from/25",
  },
  ai: {
    background: "bg-gradient-ai",
    border: "border border-primary/20",
    text: "text-foreground",
    hover: "hover:bg-gradient-ai-hover hover:border-primary/30",
    effects: "backdrop-blur-sm",
  },
  info: {
    background: "bg-gradient-info",
    text: "text-white",
    shadow: "shadow-md",
    hover:
      "hover:bg-gradient-info-hover hover:shadow-lg hover:shadow-blue-500/25",
  },
  warning: {
    background: "bg-gradient-warning",
    text: "text-white",
    shadow: "shadow-md",
    hover:
      "hover:bg-gradient-warning-hover hover:shadow-lg hover:shadow-yellow-500/25",
  },
  icon: {
    hover: "hover:bg-accent hover:text-accent-foreground",
    dark: "dark:hover:bg-accent/30",
    effects: "rounded-full p-2 h-8 w-8", // Override base rounded-md for better icon button shape
  },
};

// Helper function to combine variant theme classes
const resolvedThemes = Object.fromEntries(
  Object.entries(variantThemes).map(([k, v]) => [k, Object.values(v).join(" ")])
);

const buttonVariants = cva(
  // Base classes combined
  Object.values(baseClasses).join(" "),
  {
    variants: {
      variant: {
        default: resolvedThemes.default,
        outline: resolvedThemes.outline,
        secondary: resolvedThemes.secondary,
        ghost: resolvedThemes.ghost,
        link: resolvedThemes.link,
        call: resolvedThemes.call,
        leave: resolvedThemes.leave,
        destructive: resolvedThemes.destructive,
        calendar: resolvedThemes.calendar,
        ai: resolvedThemes.ai,
        info: resolvedThemes.info,
        warning: resolvedThemes.warning,
        icon: resolvedThemes.icon,
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 rounded-lg px-6 text-base has-[>svg]:px-4",
        xl: "h-14 rounded-lg px-8 text-lg has-[>svg]:px-6",
      },
      glow: {
        true: "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 dark:shadow-primary/10 dark:hover:shadow-primary/20",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: false,
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, glow, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
