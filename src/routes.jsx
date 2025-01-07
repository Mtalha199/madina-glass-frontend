import Check from "./Auth/Check";
import Setting from "./Auth/Setting";
import Login from "./Auth/Login";
import PublicLayout from "./components/Layouts/PublicLayout";
import { SCREEN_PATH } from "./Constant";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import NumberGroups from "./Pages/NumberReputation/NumberGroups";
import NewGroups from "./Pages/NumberReputation/NewGroup";
import Rotator from "./Pages/Rotator/Rotator";
import NewUrl from "./Pages/Rotator/NewUrl";
import SpecificGroupNumber from "./Pages/NumberReputation/SpecificGroupNumber";
import DncScrubber from "./Pages/DncScrubber/DncScrubber";
import Calendar from "./Pages/NumberReputation/SpecificGroupNumber/Calender";
import PrivateLayout from "./components/Layouts/PrivateLayout";
import CustomersList from "./Pages/Customers/List";
import SpecificCustomer from "./Pages/Customers/List/specificCustomer";
import Dashboard from "./Pages/DashBoard";


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
    element: <PrivateLayout />,
    children: [
      { path: SCREEN_PATH.DASHBOARD, element:<Dashboard /> },
      { path: SCREEN_PATH.NUMBER_REPUTATION_GROUPS, element: <NumberGroups /> },
      { path: SCREEN_PATH.CUSTOMER_LIST, element: <CustomersList /> },
      { path: SCREEN_PATH.CUSTOMER_LIST_UNIQUE, element: <SpecificCustomer /> },


      { path: SCREEN_PATH.NUMBER_REPUTATION_NEW_GROUPS, element: <NewGroups /> },
      { path: SCREEN_PATH.NUMBER_REPUTATION_SPECIFIC_GROUP, element: <SpecificGroupNumber /> },
      { path: SCREEN_PATH.ROTATOR, element: <Rotator /> },
      { path: SCREEN_PATH.ROTATOR_NEW_URL, element: <NewUrl /> },
      { path: SCREEN_PATH.DNC_SCRUBBER, element: <DncScrubber /> },
      { path: SCREEN_PATH.CALENDER, element: <Calendar /> },


      { path: "/setting", element: <Setting /> },
    ],
  },
];

export default routes;
