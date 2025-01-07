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
}) => {
  return (
    <>
      <FormField
        control={CONTROL}
        name={NAME}
        render={({ field ,fieldState }) => (
          <FormItem>
            <FormLabel>
              {LABEL}
              {IS_REQUIRED && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <Input placeholder={PLACEHOLDER} type={TYPE} {...field} className={fieldState.error ? "border-red-500" : CLASSNAME}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
