import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <Outlet />
    </React.Fragment>
  );
};

export default PublicLayout;
