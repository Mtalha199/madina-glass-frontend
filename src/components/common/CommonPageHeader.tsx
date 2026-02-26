import React from "react";
import PageHeader from "../common/PageHeader";
import PermissionWrapper from "../permissions/PermissionWrapper";
import Button from "../ui/button/Button";

export interface HeaderAction {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  permissions?: string[];
  variant?: "primary" | "outline"; 
  size?: "sm" | "md";           
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

interface CommonPageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: HeaderAction[];
}

const CommonPageHeader: React.FC<CommonPageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
}) => {
  const renderActions = () => {
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex items-center gap-2">
        {actions.map((action, index) => {
          const button = (
            <Button
              key={index}
              variant={action.variant || "primary"}
              size={action.size || "md"}
              startIcon={action.icon}
              onClick={action.onClick}
              disabled={action.disabled}
              type={action.type || "button"}
              className={action.className}
            >
              {action.label}
            </Button>
          );

          if (action.permissions?.length) {
            return (
              <PermissionWrapper
                key={index}
                permissions={action.permissions}
              >
                {button}
              </PermissionWrapper>
            );
          }

          return button;
        })}
      </div>
    );
  };

  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      breadcrumbs={breadcrumbs}
      action={renderActions()}
    />
  );
};

export default CommonPageHeader;
