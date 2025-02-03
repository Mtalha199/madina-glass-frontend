import CommonDrawer from "@/Commons/DrawerCommon";
import FileUpload from "@/Commons/FileUploadCommon";
import { InputCommon, RadioGroupCommon } from "@/Commons/FormCommons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ATTESTATION_OPTIONS } from "@/Constant";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const StirAndShaken = ({ form, MODE }) => {
  const [open, setOpen] = useState(false);
  const [openSingle, setOpenSingle] = useState(false);

  return (
    <div className="space-y-6 border-t mt-4 pt-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Stir/Shaken Detail</h2>
          <p className="text-sm text-muted-foreground">
            Specify the Stir/Shaken detail to add.
          </p>
        </div>
        <div className="flex space-x-2">
          {/* <Button
            type="button"
            variant="outline"
            size="sm"
            // onClick={onAddEntry}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Single
          </Button> */}
          <CommonDrawer
            title="Add Single Stir/Shaken"
            description="Stir/Shaken"
            isOpen={openSingle}
            onOpenChange={setOpenSingle}
            trigger={
              <Button type="button" variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Single
              </Button>
            }
          >
          <InputCommon LABEL={"Number"} NAME={"phone_number"} PLACEHOLDER={"+1 234 567 89"} TYPE={"number"} />

            <div className="space-y-4 pt-4">
            <RadioGroupCommon
              LABEL={"Attestation"}
              NAME={"attestation"}
              OPTIONS={ATTESTATION_OPTIONS}
            />
            </div>

            <div>
              <div className="pt-4">
          <Label>Notes</Label>
          <Textarea
            // value={textAreaContent}
            // onChange={(e) => setTextAreaContent(e.target.value)}
            placeholder="Enter Notes"
            rows={8}
          />
          </div>
        </div>
          </CommonDrawer>
          <CommonDrawer
            title="Add Bulk Stir/Shaken"
            description="Stir/Shaken"
            isOpen={open}
            onOpenChange={setOpen}
            trigger={
              <Button type="button" variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Bulk
              </Button>
            }
          >
            <FileUpload />
            <div className="space-y-4 pt-4">
            <RadioGroupCommon
              LABEL={"Attestation"}
              NAME={"attestation"}
              OPTIONS={ATTESTATION_OPTIONS}
            />
            </div>

            <div>
              <div className="pt-4">
          <Label>Notes</Label>
          <Textarea
            // value={textAreaContent}
            // onChange={(e) => setTextAreaContent(e.target.value)}
            placeholder="Enter Notes"
            rows={8}
          />
          </div>
        </div>
          </CommonDrawer>
        </div>
      </div>
    </div>
  );
};

export default StirAndShaken;
