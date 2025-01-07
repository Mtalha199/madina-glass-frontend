import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



const Stepper = ({steps ,currentStep,}) => {


  return (
    <div className="flex items-center space-x-4 mt-8 w-[50rem] mb-3 ">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center space-x-2">
            <Badge
              variant={currentStep >= step.id ? "primary" : "secondary"}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step.id
                  ? "text-background bg-primary"
                  : "text-gray-500 bg-muted"
              }`}
            >
              {step.id}
            </Badge>
            <span
              className={`text-sm font-medium ${
                currentStep >= step.id ? "text-primary" : "text-gray-500"
              }`}       
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 border-t border-gray-300 mx-2"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
