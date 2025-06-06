"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { CustomScrollbar } from "@/components/ui/custom-scrollbar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  // DrawerTrigger,
} from "@/components/ui/drawer";

interface ResponsiveDialogProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  hideHeader?: boolean;
  hideCloseButton?: boolean;
  footerContent?: React.ReactNode;
}

export const ResponsiveDialog = ({
  title = "Dialog",
  description,
  children,
  open,
  onOpenChange,
  maxWidth = "2xl",
  hideHeader = false,
  hideCloseButton = false,
  footerContent,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();

  const getDialogSize = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "3xl":
        return "max-w-3xl";
      case "4xl":
        return "max-w-4xl";
      default:
        return "max-w-2xl";
    }
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh] overflow-hidden flex flex-col">
          {/* Título sempre presente para acessibilidade */}
          <DrawerTitle className={hideHeader ? "sr-only" : "hidden"}>
            {title}
          </DrawerTitle>

          {!hideHeader && title && (
            <DrawerHeader className="text-left flex-shrink-0">
              <DrawerTitle className="text-xl">{title}</DrawerTitle>
              {description && (
                <DrawerDescription className="text-sm text-muted-foreground">
                  {description}
                </DrawerDescription>
              )}
            </DrawerHeader>
          )}
          <CustomScrollbar className="px-4 flex-1 min-h-0">
            {children}
          </CustomScrollbar>
          {footerContent && (
            <div className="px-4 pb-4 border-t bg-background/98 backdrop-blur-md flex-shrink-0">
              {footerContent}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${getDialogSize()} max-h-[90vh] flex flex-col p-0 overflow-hidden`}
        hideCloseButton={hideCloseButton}
      >
        {/* Título sempre presente para acessibilidade */}
        <DialogTitle className={hideHeader ? "sr-only" : "hidden"}>
          {title}
        </DialogTitle>

        {!hideHeader && title && (
          <DialogHeader className="p-6 pb-0 flex-shrink-0">
            <DialogTitle className="text-xl">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-muted-foreground">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <CustomScrollbar className="flex-1 min-h-0 p-6">
          {children}
        </CustomScrollbar>
        {footerContent && (
          <div className="p-6 pt-0 border-t bg-background/98 backdrop-blur-md shadow-xl flex-shrink-0">
            {footerContent}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
