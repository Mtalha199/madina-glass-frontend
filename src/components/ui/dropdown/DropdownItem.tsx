import type React from "react";
import Link from "next/link";

interface DropdownItemProps {
  tag?: "a" | "button";
  href?: string;
  onClick?: () => void;
  onItemClick?: (event?: React.MouseEvent) => void;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  tag = "button",
  href,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (event: React.MouseEvent) => {
    if (tag === "button") {
      event.preventDefault();
      event.stopPropagation();
    }
    if (onClick) onClick();
    if (onItemClick) onItemClick(event);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    // Use mousedown to catch event before blur fires
    // This ensures navigation happens before the input blur handler closes dropdown
    if (tag === "button") {
      event.preventDefault();
      event.stopPropagation();
      if (onClick) onClick();
      if (onItemClick) onItemClick(event);
    }
  };

  if (tag === "a" && href) {
    return (
      <Link href={href} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  // For buttons, use onMouseDown to catch event before blur
  return (
    <button onMouseDown={handleMouseDown} className={combinedClasses}>
      {children}
    </button>
  );
};
