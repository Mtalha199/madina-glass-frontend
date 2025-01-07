import BreadCrumbCommon from "@/Commons/BreadCrumbCommon";
import { Home, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MODULENAME, SCREEN_PATH } from "@/Constant";
import Stepper from "@/Commons/Stepper";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNewUrlForm } from "@/components/Hooks/CustomHooks";
import { Form } from "@/components/ui/form";
import { InputCommon } from "@/Commons/FormCommons";
import { Label } from "@/components/ui/label";
import ServiceCard from "@/components/Forms/NewGroupForms/Step1From";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const NewUrl = () => {
  const navigate = useNavigate();
  const form = useNewUrlForm();

  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, label: "Basic Information" },
    { id: 2, label: "Select Checkers" },
    { id: 3, label: "Formatting" },
    { id: 4, label: "Attach IPs" },
  ];
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleCancel = () => {
    setCurrentStep(1);
  };
  const onSubmit = (values) => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("All steps completed. Final form data:", values);
    }

    console.log("Current step data:", values);
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Options array for MultiSelect
  const options = [
    { label: "Eastern Standard Time (EST)", value: "est" },
    { label: "Central Standard Time (CST)", value: "cst" },
    { label: "Mountain Standard Time (MST)", value: "mst" },
    { label: "Pacific Standard Time (PST)", value: "pst" },
    { label: "Alaska Standard Time (AKST)", value: "akst" },
    { label: "Hawaii Standard Time (HST)", value: "hst" },
  ];

  const handleValueChange = (newSelectedValues) => {
    setSelectedOptions(newSelectedValues);
  };
  const [inputValue, setInputValue] = useState("");
  const [validatedIps, setValidatedIps] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Simple regex for IP validation
  const validateIp = (ip) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (validateIp(inputValue)) {
        setValidatedIps((prevIps) => [...prevIps, inputValue]);
        setInputValue("");
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid IP address format");
      }
    }
  };

  const removeBadge = (ip) => {
    setValidatedIps((prevIps) => prevIps.filter((item) => item !== ip));
  };

  return (
    <>
      <BreadCrumbCommon
        ITEMS={[
          { label: MODULENAME.ROTATOR, href: SCREEN_PATH.ROTATOR },
          { label: MODULENAME.CREATE_NEW_URL },
        ]}
        SHOW_BUTTONS={false}
      />
      <Stepper steps={steps} currentStep={currentStep} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {currentStep === 1 && (
            <>
              <div className="w-[35rem]">
                <InputCommon
                  LABEL={"Name"}
                  IS_REQUIRED={true}
                  NAME={"name"}
                  TYPE={"text"}
                  PLACEHOLDER={"Test"}
                  CONTROL={form.control}
                />
              </div>
              <div className="w-[35rem]">
                <Label>Number Reputation Groups</Label>
                <MultiSelect
                  options={options}
                  onValueChange={handleValueChange}
                  value
                  // defaultValue={["est"]}
                  placeholder="Select time zones"
                  animation={0.5}
                  maxCount={2}
                  POPOVER_WIDTH={"35rem"}
                />
              </div>
            </>
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
                {currentStep === steps.length ? "Save" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {currentStep === 2 && (
        <ServiceCard
          icon={<Home />}
          title="Device Spam Check by Carrier"
          description="Above Mentioned Carriers will be added to the services for Device Spam Checking"
          checked={isChecked}
          onToggle={handleToggle}
        />
      )}
      {currentStep === 3 && (
        <>
          <Label>Return Caller ID Format</Label>
          <div className="flex space-x-4">
            <ServiceCard
              icon={<Home />}
              title="+1 NPAN XXXXXX"
              description="Caller ID will be return in this format. Your carrier/service provider will see A number in this format."
              checked={isChecked}
              onToggle={handleToggle}
              SHOW_ICONS={false}
            />
            <ServiceCard
              icon={<Home />}
              title="+1 NPAN XXXXXX"
              description="Caller ID will be return in this format. Your carrier/service provider will see A number in this format."
              checked={isChecked}
              onToggle={handleToggle}
              SHOW_ICONS={false}
            />
            <ServiceCard
              icon={<Home />}
              title="+1 NPAN XXXXXX"
              description="Caller ID will be return in this format. Your carrier/service provider will see A number in this format."
              checked={isChecked}
              onToggle={handleToggle}
              SHOW_ICONS={false}
            />
          </div>
        </>
      )}
      {currentStep === 4 && (
        <>
          <Label>ALLOWED IPs</Label>
          <div className="w-[35rem]">
            <Input
              type="text"
              placeholder="0.0.0.0"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {errorMessage && (
              <span className="text-red-500">{errorMessage}</span>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {validatedIps.map((ip) => (
                <Badge variant={"outline"} key={ip}>
                  {ip}
                  {/* <Button size="xs" > */}
                    <X className="h-4" onClick={() => removeBadge(ip)} />
                  {/* </Button> */}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default NewUrl;
