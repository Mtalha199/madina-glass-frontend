import React from "react";

const GearIcon: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6667 10.8333L15.8333 13.3333L14.1667 15.4167L11.6667 16.25C11.3333 16.3333 11 16.4 10.6667 16.45L8.33333 16.75L5.83333 16.25L3.75 14.5833L2.91667 12.0833C2.83333 11.75 2.76667 11.4167 2.71667 11.0833L2.41667 8.75L2.91667 6.25L4.58333 4.16667L7.08333 3.33333C7.41667 3.25 7.75 3.18333 8.08333 3.13333L10.4167 2.83333L12.9167 3.33333L15 4.99999L15.8333 7.49999C15.9167 7.83333 15.9833 8.16666 16.0333 8.49999L16.3333 10.8333H16.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GearIcon;

