import React from "react";

interface AvatarTextProps {
  name: string;
  className?: string;
}

const AvatarText: React.FC<AvatarTextProps> = ({ name, className = "" }) => {
  // Generate initials from name
  const safeName = name || "U";
  const initials = safeName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent brand color based on the name
  const getColorClass = (name: string) => {
    // Use consistent brand color (orange) for all team members
    return "bg-brand-100 text-brand-600";
  };

  return (
    <div
      className={`flex h-10 w-10 ${className} items-center justify-center rounded-full ${getColorClass(
        safeName
      )}`}
    >
      <span className="text-sm font-medium">{initials}</span>
    </div>
  );
};

export default AvatarText;
