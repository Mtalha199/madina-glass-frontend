import CommonDrawer from "@/Commons/DrawerCommon";
import FileUpload from "@/Commons/FileUploadCommon";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const StirAndShaken = ({ form, MODE }) => {
  const [open, setOpen] = useState(false);
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            // onClick={onAddEntry}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Bulk
          </Button>
          <CommonDrawer
            title="Add Single Stir/Shaken"
            description="Stir/Shaken"
            isOpen={open}
            onOpenChange={setOpen}
            trigger={
              <Button type="button" variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Single
              </Button>
            }
          >
            <FileUpload />
          </CommonDrawer>
        </div>
      </div>
    </div>
  );
};

export default StirAndShaken;
