import React from "react";
import PageHeader from "../common/PageHeader";
import Button from "../ui/button/Button";
import { PlusIcon } from "@/icons";
import PermissionWrapper from "../permissions/PermissionWrapper";

interface VehicleTrackingPageHeaderProps {
  onCreateNew?: () => void;
}

const VehicleTrackingPageHeader: React.FC<VehicleTrackingPageHeaderProps> = ({
  onCreateNew,
}) => {
  return (
    <PageHeader
      title="Vehicle Tracking"
      subtitle="Monitor and track all vehicle shipments in real-time."
      breadcrumbs={[
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Vehicle Tracking" },
      ]}
      action={
        <PermissionWrapper 
        permissions={["vehicle.create"]} >
          <Button
            variant="primary"
            size="sm"
            className="flex items-center justify-center"
            startIcon={<PlusIcon />}
            onClick={onCreateNew}
          >
            Create New
          </Button>
        </PermissionWrapper>
      }
    />
  );
};

export default VehicleTrackingPageHeader;

