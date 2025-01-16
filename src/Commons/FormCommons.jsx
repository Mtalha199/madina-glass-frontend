import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
export const InputCommon = ({
  LABEL,
  IS_REQUIRED = false,
  NAME,
  TYPE,
  PLACEHOLDER,
  CONTROL,
  CLASSNAME,
  ICON,
}) => {
  return (
    <>
      <FormField
        control={CONTROL}
        name={NAME}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>
              {LABEL}
              {IS_REQUIRED && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative">
                {ICON && (
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <span className="w-4 h-4 flex justify-center items-center">
                      {ICON}
                    </span>
                  </span>
                )}
                <Input
                  placeholder={PLACEHOLDER}
                  type={TYPE}
                  {...field}
                  className={`${ICON ? "pl-10" : ""} ${
                    fieldState.error ? "border-red-500" : CLASSNAME
                  }`}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
