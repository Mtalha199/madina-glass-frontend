import { AUTHENTICATION_VALUE, SCREEN_PATH } from "@/Constant";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem(AUTHENTICATION_VALUE.AUTH_TOKEN);

  if (!token) {
    return <Navigate to="/" replace />;
  }
  // const location = useLocation();
  // const currentPath = location.pathname;
  // const storedPermissions = localStorage.getItem(AUTHENTICATION_VALUE.PERMISSION);
  // let allowedRoutes = [];
  // const parsedPermissions = storedPermissions ? JSON.parse(storedPermissions) : [];
  //   allowedRoutes = parsedPermissions.flatMap((module) => { 
  //     const routes = [module.route];
  //     if (module.sub_menu?.length > 0) {
  //       routes.push(...module.sub_menu.map((sub) => sub.route));
  //     }
  //     return routes;
  //   }).filter(Boolean);
  //   const isRouteAllowed = allowedRoutes.includes(currentPath);

  // if (!isRouteAllowed) {
  //   return <Navigate to={SCREEN_PATH.NOT_ALLOWED} replace />;
  // }
  return children;

};

export default AuthGuard;
