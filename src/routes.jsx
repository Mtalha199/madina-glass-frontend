import Login from "./Auth/Login";
import PublicLayout from "./components/Layouts/PublicLayout";
import { SCREEN_PATH } from "./Constant";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import PrivateLayout from "./components/Layouts/PrivateLayout";
import CustomersList from "./Pages/Customers/List";
import SpecificCustomer from "./Pages/Customers/List/specificCustomer";
import Dashboard from "./Pages/DashBoard";
import AuthGuard from "./Auth/AuthGaurd";
import { AddCustomer } from "./Pages/Customers/List/AddCustomer";

const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: SCREEN_PATH.REGISTER, element: <SignUp /> },
      { path: SCREEN_PATH.FORGOT_PASSWORD, element: <ForgotPassword /> },
      { path: SCREEN_PATH.RESET_PASSWORD, element: <ResetPassword /> },
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <PrivateLayout />
      </AuthGuard>
    ),
    children: [
      { path: SCREEN_PATH.DASHBOARD, element: <Dashboard /> },
      { path: SCREEN_PATH.CUSTOMER_LIST, element: <CustomersList /> },
      { path: SCREEN_PATH.CUSTOMER_LIST_UNIQUE, element: <SpecificCustomer /> },
      { path: SCREEN_PATH.ADD_NEW_CUSTOMER, element: <AddCustomer /> },

    ],
  },
];

export default routes;
