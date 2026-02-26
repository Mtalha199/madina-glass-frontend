import { Vehicle } from "./types";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getStatusBadge = (progress: Vehicle["progress"]) => {
  if (progress.current === 0) {
    return { label: "Pending", color: "light" as const };
  } else if (progress.current === progress.total && progress.total > 0) {
    return { label: "Delivered", color: "success" as const };
  } else {
    return { label: "In Progress", color: "warning" as const };
  }
};

export const getCustomerTypeDisplay = (customerType: Vehicle["customerType"]): string => {
  switch (customerType) {
    case "ZAMBIAN_IMPORT":
      return "Zambian Import";
    case "ZIMBABWE_TRANSIT":
      return "Zimbabwe Transit";
    case "DRC":
      return "DRC";
    default:
      return customerType;
  }
};

export const getRouteDisplay = (route: Vehicle["route"]): string => {
  return route;
};

export const calculateProgressPercentage = (progress: Vehicle["progress"]): number => {
  return progress.total > 0
    ? Math.round((progress.current / progress.total) * 100)
    : 0;
};

