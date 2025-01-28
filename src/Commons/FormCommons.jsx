import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";

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

export const RadioGroupCommon = ({
  LABEL,
  IS_REQUIRED = false,
  NAME,
  OPTIONS,
  CONTROL,
  CLASSNAME = "",
  DIRECTION = "row",
  ICON = null,
  DEFAULT_VALUE = true,
}) => {
  return (
    <FormField
      control={CONTROL}
      name={NAME}
      defaultValue={DEFAULT_VALUE}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex items-center space-x-2 mb-4">
            <FormLabel>
              {LABEL}
              {IS_REQUIRED && <span className="text-red-500">*</span>}
            </FormLabel>
          </div>
          <div className="flex items-center space-x-2">
            {/* {ICON && <span className="text-gray-500">{ICON}</span>} */}
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value || DEFAULT_VALUE}
                className={`
                  ${
                    DIRECTION === "row"
                      ? "flex flex-row space-x-4"
                      : "space-y-2"
                  }
                  ${CLASSNAME}
                `}
              >
                {OPTIONS.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${NAME}-${option.value}`}
                    />
                    <FormLabel htmlFor={`${NAME}-${option.value}`}>
                      {option.label}
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

export const CheckboxCommon = ({
  LABEL,
  IS_REQUIRED = false,
  NAME,
  CONTROL,
  CLASSNAME = "",
  START_ICON = null,
  DESCRIPTION = null,
}) => {
  return (
    <FormField
      control={CONTROL}
      name={NAME}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            {START_ICON && <span className="text-gray-500">{START_ICON}</span>}
            <FormControl>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className={CLASSNAME}
                />
                <FormLabel>
                  {LABEL}
                  {IS_REQUIRED && <span className="text-red-500">*</span>}
                </FormLabel>
              </div>
            </FormControl>
          </div>
          {DESCRIPTION && (
            <p className="text-sm text-gray-500 ml-6">{DESCRIPTION}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const SelectCommon = ({
  LABEL,
  IS_REQUIRED = false,
  NAME,
  OPTIONS,
  CONTROL,
  PLACEHOLDER = "Select an option",
  CLASSNAME = "",
  DESCRIPTION = null,
}) => {
  const [search, setSearch] = useState("");

  const filteredOptions = OPTIONS.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FormField
      control={CONTROL}
      name={NAME}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex items-center space-x-2 mb-4">
            <FormLabel>
              {LABEL}
              {IS_REQUIRED && <span className="text-red-500">*</span>}
            </FormLabel>
          </div>

          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className={`w-full ${CLASSNAME}`}>
                <SelectValue placeholder={PLACEHOLDER} />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-2"
                  />
                </div>
                {filteredOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
                {filteredOptions.length === 0 && (
                  <div className="p-2 text-center text-gray-500">
                    No options found
                  </div>
                )}
              </SelectContent>
            </Select>
          </FormControl>

          {DESCRIPTION && (
            <p className="text-sm text-gray-500 mt-1">{DESCRIPTION}</p>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ComboboxCommon = ({
  LABEL,
  IS_REQUIRED = false,
  NAME,
  OPTIONS,
  CONTROL,
  PLACEHOLDER = "Select option...",
  CLASSNAME = "",
  DESCRIPTION = null,
}) => {
  return (
    <FormField
      control={CONTROL}
      name={NAME}
      render={({ field, fieldState }) => {
        const [open, setOpen] = React.useState(false);

        return (
          <FormItem>
            <div className="flex items-center space-x-2 mb-2">
              <FormLabel>
                {LABEL}
                {IS_REQUIRED && <span className="text-red-500">*</span>}
              </FormLabel>
            </div>

            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full justify-between",
                      field.value ? "p-5" : "text-muted-foreground p-5",
                      CLASSNAME
                    )}
                  >
                    {field.value
                      ? OPTIONS.find((option) => option.value == field.value)
                          ?.label
                      : PLACEHOLDER}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search options..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {OPTIONS.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={(currentValue) => {
                              field.onChange(
                                currentValue === field.value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            {option.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value === option.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>

            {DESCRIPTION && (
              <p className="text-sm text-gray-500 mt-1">{DESCRIPTION}</p>
            )}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
