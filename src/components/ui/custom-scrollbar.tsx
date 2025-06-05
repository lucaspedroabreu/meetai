"use client";

import SimpleBar from "simplebar-react";

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string | number;
  autoHide?: boolean;
  forceVisible?: boolean | "x" | "y";
  style?: React.CSSProperties;
}

export const CustomScrollbar = ({
  children,
  className = "",
  maxHeight,
  autoHide = true,
  forceVisible = false,
  style,
  ...props
}: CustomScrollbarProps) => {
  return (
    <SimpleBar
      className={className}
      autoHide={autoHide}
      forceVisible={forceVisible}
      style={{
        ...(maxHeight && {
          maxHeight:
            typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        }),
        ...style,
      }}
      {...props}
    >
      {children}
    </SimpleBar>
  );
};
