import Login from "./Auth/Login";
import PublicLayout from "./components/Layouts/PublicLayout";
import { SCREEN_PATH } from "./Constant";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import PrivateLayout from "./components/Layouts/PrivateLayout";
import CustomersList from "./Pages/Customers/List";
import SpecificCustomer from "./Pages/Customers/List/SpecificCustomer/specificCustomer";
import Dashboard from "./Pages/DashBoard";
import AuthGuard from "./Auth/AuthGaurd";
import { AddCustomer } from "./Pages/Customers/List/AddCustomer";
import SipTrunkList from "./Pages/Customers/SIPTrunks";
import { AddSipTrunk } from "./Pages/Customers/SIPTrunks/AddSipTrunk";
import SpecificSipTrunk from "./Pages/Customers/SIPTrunks/SpecificSipTrunk";
import CarriersList from "./Pages/Carriers/List";
import { AddCarrier } from "./Pages/Carriers/List/AddCarrier";
import SpecificCarrier from "./Pages/Carriers/List/SpecificCarrier/specificCarrier";
import SipTrunkListCarrier from "./Pages/Carriers/SIPTrunks";
import { AddSipTrunkCarrier } from "./Pages/Carriers/SIPTrunks/AddSipTrunk";
import SpecificSipTrunkCarrier from "./Pages/Carriers/SIPTrunks/SpecificSipTrunkCarrier";
import CustomerPayment from "./Pages/Customers/Payments";
import RateDeckCustomer from "./Pages/Customers/Rate decks";
import GenerateRateDecks from "./Pages/Customers/Rate decks/AddRateDecks/GenerateRateDeck";
import SpecificRateDeck from "./Pages/Customers/Rate decks/SpecificRateDeck";
import Settings from "./Pages/Settings";
import RateDeckCarrier from "./Pages/Carriers/Ratedeck";
import RateDeckApproval from "./Commons/RateDeckCommons/RateDeckApprovel";

const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: SCREEN_PATH.REGISTER, element: <SignUp /> },
      { path: SCREEN_PATH.FORGOT_PASSWORD, element: <ForgotPassword /> },
      { path: SCREEN_PATH.RESET_PASSWORD, element: <ResetPassword /> },
      { path: SCREEN_PATH.RATE_DECK_APPROVEL, element: <RateDeckApproval /> },

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

      { path: SCREEN_PATH.PAYMENT_LIST_CUSTOMER, element: <CustomerPayment /> },

      { path: SCREEN_PATH.RATE_DECK_LIST_CUSTOMER, element: <RateDeckCustomer /> },
      { path: SCREEN_PATH.ADD_NEW_RATE_DECK_GENERATE, element: <GenerateRateDecks /> },
      { path: SCREEN_PATH.RATE_DECK_GENERATE_VIEW, element: <SpecificRateDeck /> },


      { path: SCREEN_PATH.SIP_TRUNK_LIST, element: <SipTrunkList /> },
      { path: SCREEN_PATH.ADD_NEW_SIP_TRUNK, element: <AddSipTrunk /> },
      { path: SCREEN_PATH.SIP_TRUNK_LIST_UNIQUE, element: <SpecificSipTrunk /> },

      { path: SCREEN_PATH.CARRIERS_LIST, element: <CarriersList /> },
      { path: SCREEN_PATH.CARRIERS_LIST_UNIQUE, element: <SpecificCarrier /> },
      { path: SCREEN_PATH.ADD_NEW_CARRIER, element: <AddCarrier /> },

      { path: SCREEN_PATH.SIP_TRUNK_LIST_CARRIER, element: <SipTrunkListCarrier /> },
      { path: SCREEN_PATH.ADD_NEW_SIP_TRUNK_CARRIER, element: <AddSipTrunkCarrier /> },
      { path: SCREEN_PATH.SIP_TRUNK_LIST_UNIQUE_CARRIER, element: <SpecificSipTrunkCarrier /> },
      
      { path: SCREEN_PATH.RATE_DECK_CARRIER, element: <RateDeckCarrier /> },


      { path: SCREEN_PATH.SETTINGS, element: <Settings /> },

    ],
  },
];

export default routes;
