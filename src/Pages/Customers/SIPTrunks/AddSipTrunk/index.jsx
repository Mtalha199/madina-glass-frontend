import { BasicDetailForm } from "@/components/Forms/SipTrunkForms/BasicDetailForm";
import { useContactDetailEdit } from "@/components/Hooks/CustomHooks";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DATA_VIEW_MODE, SCREEN_PATH } from "@/Constant";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddSipTrunk = () => {
    const navigate = useNavigate();
  
      const form = useContactDetailEdit();
        const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    console.log(data);
  }
    return (
        <>
         <div className="p-6">
         <Button
        variant="ghost"
        onClick={() => navigate(SCREEN_PATH.SIP_TRUNK_LIST)}
        className="mb-4"
      >
        <ArrowLeft />
        Sip Trunk List
      </Button>
      <h1 className="text-2xl font-bold mb-4">Add Sip Trunk</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {loading ? (
            <FormSkeleton />
          ) : (
            <>
              <BasicDetailForm form={form} MODE={DATA_VIEW_MODE.ADD} />
            </>
          )}

          <div className="col-span-2 flex justify-end mt-4">
            <Button type="submit" className="">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
        </>
    )
}