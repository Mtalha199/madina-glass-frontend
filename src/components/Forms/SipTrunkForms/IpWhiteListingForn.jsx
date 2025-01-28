import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TRUNK_TYPE_STATUS_OPTIONS } from "@/Constant";
import { Plus, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputCommon, RadioGroupCommon } from "@/Commons/FormCommons";
import { useSipTrunk } from "@/components/Hooks/CustomHooks";

const IpWhiteListingForm = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ipEntries",
  });

  const onAddEntry = () => {
    append({
      customer_ip: "",
      sip_map_ip: "",
      cps_limit: 0,
      session_limit:0,
      status: true,
      tech_prefix: "",
      suffix: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              IP White Listing Detail
            </h2>
            <p className="text-sm text-muted-foreground">
              Specify the SIP trunk detail to add.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddEntry}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Entry
          </Button>
        </div>

        {fields.length > 0 && (
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 space-y-4 ">
              <div className="hidden lg:block lg:col-span-1"></div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-sm font-medium text-gray-700">
                    Customer IP <span className="text-red-500">*</span>
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    SIP Map IP <span className="text-red-500">*</span>
                  </p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-sm font-medium text-gray-700">
                    CPS Limit <span className="text-red-500">*</span>
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    Session Limit <span className="text-red-500">*</span>
                  </p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-sm font-medium text-gray-700">
                    Tech Prefix
                  </p>
                  <p className="text-sm font-medium text-gray-700">Suffix</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-sm font-medium text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </p>
                </div>
              </div>
            </div>
            {fields.map((field, index) => (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="hidden lg:block lg:col-span-1"></div>

                <div
                  key={field.id}
                  className="col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputCommon
                      NAME={`ipEntries.${index}.customer_ip`}
                      TYPE="text"
                      PLACEHOLDER="1.1.1.1"
                      CONTROL={form.control}
                    />
                    <InputCommon
                      NAME={`ipEntries.${index}.sip_map_ip`}
                      TYPE="text"
                      PLACEHOLDER="2.2.2.2"
                      CONTROL={form.control}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputCommon
                      NAME={`ipEntries.${index}.cps_limit`}
                      TYPE="number"
                      PLACEHOLDER="0"
                      CONTROL={form.control}
                    />
                    <InputCommon
                      NAME={`ipEntries.${index}.session_limit`}
                      TYPE="number"
                      PLACEHOLDER="0"
                      CONTROL={form.control}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputCommon
                      NAME={`ipEntries.${index}.tech_prefix`}
                      TYPE="text"
                      PLACEHOLDER="Tech Prefix"
                      CONTROL={form.control}
                    />
                    <InputCommon
                      NAME={`ipEntries.${index}.suffix`}
                      TYPE="text"
                      PLACEHOLDER="Suffix"
                      CONTROL={form.control}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <RadioGroupCommon
                      NAME={`ipEntries.${index}.status`}
                      OPTIONS={TRUNK_TYPE_STATUS_OPTIONS}
                      CONTROL={form.control}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                      className="self-start w-10 ml-10 mt-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IpWhiteListingForm;
