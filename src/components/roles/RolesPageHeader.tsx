import React from "react";
import PageHeader from "../common/PageHeader";
import CreateNewDropdown from "./CreateNewDropdown";
import PermissionWrapper from "../permissions/PermissionWrapper";

interface RolesPageHeaderProps {
  onCreateRole?: () => void;
  onCreateUser?: () => void;
}

const RolesPageHeader: React.FC<RolesPageHeaderProps> = ({
  onCreateRole,
  onCreateUser,
}) => {
  return (
    <PageHeader
      title="Roles & Permissions"
      subtitle="Define and manage access control roles."
      breadcrumbs={[
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Roles" },
      ]}
      action={  
        <PermissionWrapper permissions={['role.create']}>

        <CreateNewDropdown
          onCreateRole={onCreateRole || (() => {})}
          onCreateUser={onCreateUser || (() => {})}
          />
          </PermissionWrapper>
      }
    />
  );
};

export default RolesPageHeader;

