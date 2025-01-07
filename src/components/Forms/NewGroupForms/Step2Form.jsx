import { InputCommon } from "@/Commons/FormCommons";
import { useNewGroupForm } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";


const Step2 = ({setCurrentStep,onNext }) => {
  const form = useNewGroupForm();
  const handleCancel = () => {
    setCurrentStep(1);
  };
  const handlePrevious = () => {
    setCurrentStep(1);
  };
  const onSubmit = (values) => {
    onNext(values);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="w-[35rem]">
            <InputCommon
              LABEL={"Group Name111"}
              IS_REQUIRED={true}
              NAME={"group_name"}
              TYPE={"text"}
              PLACEHOLDER={"Group123"}
              CONTROL={form.control}
            />
            </div>
         
        </form>
      </Form>
    </>
  );
};
export default Step2;
