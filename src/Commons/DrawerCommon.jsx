import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Loader } from "./Loader";

const CommonDrawer = ({
  title,
  description,
  children,
  trigger,
  isOpen,
  onOpenChange,
  onSave,
  showActions = true,
  fullWidth = false,
  height,
  loading,
}) => {
  const contentHeight = height || "90vh";
  const maxHeightContent = `calc(${contentHeight} - 120px)`;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className={`h-[${contentHeight}] fixed `}>
        <div
          className={`${
            fullWidth ? "w-full px-4" : "max-w-4xl mx-auto"
          } w-full`}
        >
          <DrawerHeader className="relative border-b">
            <div className="flex justify-between items-center pr-32">
              <div>
                <DrawerTitle className="text-xl font-semibold">
                  {title}
                </DrawerTitle>
                {description && (
                  <DrawerDescription>{description}</DrawerDescription>
                )}
              </div>

              {showActions && (
                <div className="absolute right-12 top-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  {loading ? (
                    <Loader size={60} />
                  ) : (
                    <Button size="sm" onClick={onSave}>
                      Save
                    </Button>
                  )}
                </div>
              )}

              {/* <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
                <X className="h-4 w-4" />
              </DrawerClose> */}
            </div>
          </DrawerHeader>
          <div
            className={`p-4 pb-0 overflow-y-auto`}
            style={{ maxHeight: maxHeightContent, paddingBottom: "2rem" }}
          >
            {children}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CommonDrawer;
