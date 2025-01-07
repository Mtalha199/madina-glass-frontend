import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { Line } from "recharts";

const BreadCrumbCommon = ({
  ITEMS,
  BREADCRUMBS = true,
  BUTTONS,
  SHOW_BUTTONS = false,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {BREADCRUMBS ? (
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {ITEMS?.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink asChild>
                        <Link to={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < ITEMS.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <h1 className="text-xl font-bold">
            {ITEMS?.length > 0 && ITEMS[ITEMS.length - 1].label}
          </h1>
        )}
        {SHOW_BUTTONS && (
          <div className={`${BREADCRUMBS ? "" : "ml-auto"} flex space-x-2`}>
            {BUTTONS?.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || "default"}
                onClick={button.onClick}
              >
                {button.icon && <span className="mr-1">{button.icon}</span>}
                <span>{button.label}</span>
              </Button>
            ))}
          </div>
        )}
      </div>

      {ITEMS?.length > 0 && BREADCRUMBS && (
        <h1 className="text-xl font-bold pt-2">
          {ITEMS[ITEMS.length - 1].label}
        </h1>
      )}
    </>
  );
};

export default BreadCrumbCommon;
