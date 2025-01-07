import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BreadCrumbCommon from "@/Commons/BreadCrumbCommon";
import { MODULENAME, SCREEN_PATH, STEPS } from "@/Constant";
import { Form, FormLabel } from "@/components/ui/form";
import { useNewGroupForm } from "@/components/Hooks/CustomHooks";
import { InputCommon } from "@/Commons/FormCommons";
import Stepper from "@/Commons/Stepper";
import ServiceCard from "@/components/Forms/NewGroupForms/Step1From";
import { Home, HomeIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomTextarea from "./CustomTextArea";
import FileUpload from "./FileUpload";
import useCheckboxManager from "./UseCheckboxManager";
import { useLocation } from "react-router-dom";

const NewGroups = () => {
  const form = useNewGroupForm();
  const {reset}=form;
  const location = useLocation();
  const dataReceived = location.state;
  const [currentStep, setCurrentStep] = useState(1);
  const services = [
    {
      id: 1,
      title: "Device Spam Check by Carrier 1",
      description:
        "Above Mentioned Carriers will be added to the services for Device Spam Checking 1",
      icons: <HomeIcon />,
    },
    {
      id: 2,
      title: "Device Spam Check by Carrier 2",
      description:
        "Above Mentioned Carriers will be added to the services for Device Spam Checking 2",
      icons: <HomeIcon />,
    },
    {
      id: 3,
      title: "Device Spam Check by Carrier 3",
      description:
        "Above Mentioned Carriers will be added to the services for Device Spam Checking 3",
      icons: <HomeIcon />,
    },
    {
      id: 4,
      title: "Device Spam Check by Carrier 3",
      description:
        "Above Mentioned Carriers will be added to the services for Device Spam Checking 3",
      icons: <HomeIcon />,
    },
    {
      id: 5,
      title: "Device Spam Check by Carrier 3",
      description:
        "Above Mentioned Carriers will be added to the services for Device Spam Checking 3",
      icons: <HomeIcon />,
    },
    {
      id: 6,
      title: "Device Spam Check by Carrier 3",
      description:
        "Above Mentioned Carriers will be added to the services for Device Spam Checking 3",
      icons: <HomeIcon />,
    },
  ];
  const { checkedStates, toggleCheckbox, validateCheckboxes, error } =useCheckboxManager(services);
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleCancel = () => {
    setCurrentStep(1);
  };
  const onSubmit = (values) => {
    if (currentStep === 2) {
      const isValid = validateCheckboxes();
      if (!isValid) return;
    }
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("All steps completed. Final form data:", values);
    }
  };
  useEffect(() => {
    if (dataReceived?.editData) {
      reset({
        group_name: dataReceived?.group_name || "",
        // description: editData.description || "",
        // Add other fields as needed
      });
    }
  }, [dataReceived, reset]);
  return (
    <>
      <BreadCrumbCommon
        ITEMS={[
          {
            label: "Number Reputation",
            href: SCREEN_PATH.NUMBER_REPUTATION_GROUPS,
          },
          { label: MODULENAME.NEW_GROUP },
        ]}
      />
      <Stepper steps={STEPS} currentStep={currentStep} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {currentStep === 1 && (
            <div className="w-[35rem]">
              <InputCommon
                LABEL={"Group Name"}
                IS_REQUIRED={true}
                NAME={"group_name"}
                TYPE={"text"}
                PLACEHOLDER={"Group123"}
                CONTROL={form.control}
              />
            </div>
          )}
          <div className=" flex justify-between items-center p-4 bg-muted absolute bottom-0 inset-x-0 ">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <div className="flex space-x-2">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}
              <Button type="submit">
                {currentStep === STEPS.length ? "Save" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="flex flex-wrap">
        {currentStep === 2 && (
          <>
            {error && (
              <div className="w-full px-2 mb-4">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            {services.map((service) => (
              <div
                key={service.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4"
              >
                <ServiceCard
                  ICON={service.icons}
                  TITLE={service.title}
                  DESCRIPTION={service.description}
                  CHECKED={checkedStates[service.id]}
                  ONTOGGLE={() => toggleCheckbox(service.id)}
                />
              </div>
            ))}
          </>
        )}
      </div>

      {currentStep === 3 && (
        <>
          <div className="mt-4">
            <Label>Set Verification Schedule for Group</Label>
            <Select>
              <SelectTrigger className="w-[400px]">
                <SelectValue placeholder="Select a Schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Daily</SelectItem>
                  <SelectItem value="banana">Weekly</SelectItem>
                  <SelectItem value="blueberry">Every n</SelectItem>
                  <SelectItem value="grapes">n Times in a </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
      {currentStep === 4 && (
        <>
          <div className="mt-4">
            <div className="w-full pb-[5rem]">
              <Tabs defaultValue="account">
                <TabsList className="grid w-full grid-cols-2 w-[240px]">
                  <TabsTrigger value="account">Enter Manually </TabsTrigger>
                  <TabsTrigger value="password">Import</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <CustomTextarea />
                </TabsContent>
                <TabsContent value="password" className="">
                  <FileUpload />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default NewGroups;
