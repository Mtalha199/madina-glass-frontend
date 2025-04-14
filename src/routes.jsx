import Login from "./Auth/Login";
import PublicLayout from "./components/Layouts/PublicLayout";
import { HAS_PERMISSION, PARENT_MODULE_NAME, PERMISSIONS, SCREEN_PATH } from "./Constant";
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
import SpecificRole from "./components/Tabs/SettingTabs/Role/SpecificRole";
import { Navigate } from "react-router-dom";
import AccessDenied from "./Commons/AccesDenied";
import PageNotFound from "./Commons/PageNotfound";

const WITH_PERMISSION = (Component,PARENT_MODULE, MODULE, ACTION) => {
  return HAS_PERMISSION(PARENT_MODULE,MODULE, ACTION) ? <Component /> :<Navigate to={SCREEN_PATH.ACCESS_DENIED} />;
};
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

      {
        path: "*",
        element: <PageNotFound />,
      },

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

      { path: SCREEN_PATH.CUSTOMER_LIST, element: WITH_PERMISSION(CustomersList,PARENT_MODULE_NAME.CUSTOMER, PERMISSIONS.CUSTOMER.LIST.NAME, PERMISSIONS.CUSTOMER.LIST.ACTIONS.CUSTOMER_LIST) },
      { path: SCREEN_PATH.CUSTOMER_LIST_UNIQUE, element:WITH_PERMISSION(SpecificCustomer,PARENT_MODULE_NAME.CUSTOMER, PERMISSIONS.CUSTOMER.LIST.NAME, PERMISSIONS.CUSTOMER.LIST.ACTIONS.CUSTOMER_VIEW) },
      { path: SCREEN_PATH.ADD_NEW_CUSTOMER, element:WITH_PERMISSION(AddCustomer,PARENT_MODULE_NAME.CUSTOMER, PERMISSIONS.CUSTOMER.LIST.NAME, PERMISSIONS.CUSTOMER.LIST.ACTIONS.CUSTOMER_CREATE)},

      { path: SCREEN_PATH.PAYMENT_LIST_CUSTOMER, element: <CustomerPayment /> },

      { path: SCREEN_PATH.RATE_DECK_LIST_CUSTOMER, element:WITH_PERMISSION(RateDeckCustomer,PARENT_MODULE_NAME.CUSTOMER, PERMISSIONS.CUSTOMER.RATE_DECK.NAME, PERMISSIONS.CUSTOMER.RATE_DECK.ACTIONS.CUSTOMER_RATE_DECK_LIST) },
      { path: SCREEN_PATH.ADD_NEW_RATE_DECK_GENERATE, element: WITH_PERMISSION(GenerateRateDecks,PARENT_MODULE_NAME.CUSTOMER, PERMISSIONS.CUSTOMER.RATE_DECK.NAME, PERMISSIONS.CUSTOMER.RATE_DECK.ACTIONS.CUSTOMER_RATE_DECK_CREATE)},
      { path: SCREEN_PATH.RATE_DECK_GENERATE_VIEW, element:WITH_PERMISSION(SpecificRateDeck,PARENT_MODULE_NAME.CUSTOMER, PERMISSIONS.CUSTOMER.RATE_DECK.NAME, PERMISSIONS.CUSTOMER.RATE_DECK.ACTIONS.CUSTOMER_RATE_DECK_VIEW)  },


      { path: SCREEN_PATH.SIP_TRUNK_LIST, element:WITH_PERMISSION(SipTrunkList,PARENT_MODULE_NAME.CUSTOMER, PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME, PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS.CUSTOMER_SIP_TRUNK_LIST) },
      { path: SCREEN_PATH.ADD_NEW_SIP_TRUNK, element:WITH_PERMISSION(AddSipTrunk,PARENT_MODULE_NAME.CUSTOMER, PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME, PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS.CUSTOMER_SIP_TRUNK_CREATE)},
      { path: SCREEN_PATH.SIP_TRUNK_LIST_UNIQUE, element:WITH_PERMISSION(SpecificSipTrunk,PARENT_MODULE_NAME.CUSTOMER, PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME, PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS.CUSTOMER_SIP_TRUNK_VIEW)},

      { path: SCREEN_PATH.CARRIERS_LIST, element:WITH_PERMISSION(CarriersList,PARENT_MODULE_NAME.CARRIER, PERMISSIONS.CARRIER.LIST.NAME, PERMISSIONS.CARRIER.LIST.ACTIONS.CARRIER_LIST) },
      { path: SCREEN_PATH.CARRIERS_LIST_UNIQUE, element: WITH_PERMISSION(SpecificCarrier,PARENT_MODULE_NAME.CARRIER, PERMISSIONS.CARRIER.LIST.NAME, PERMISSIONS.CARRIER.LIST.ACTIONS.CARRIER_VIEW) },
      { path: SCREEN_PATH.ADD_NEW_CARRIER, element:WITH_PERMISSION(AddCarrier,PARENT_MODULE_NAME.CARRIER, PERMISSIONS.CARRIER.LIST.NAME, PERMISSIONS.CARRIER.LIST.ACTIONS.CARRIER_CREATE) },

      { path: SCREEN_PATH.SIP_TRUNK_LIST_CARRIER, element: WITH_PERMISSION(SipTrunkListCarrier,PARENT_MODULE_NAME.CARRIER, PERMISSIONS.CARRIER.SIP_TRUNK.NAME, PERMISSIONS.CARRIER.SIP_TRUNK.ACTIONS.CARRIER_SIP_TRUNK_LIST)},
      { path: SCREEN_PATH.ADD_NEW_SIP_TRUNK_CARRIER, element:WITH_PERMISSION(AddSipTrunkCarrier,PARENT_MODULE_NAME.CARRIER, PERMISSIONS.CARRIER.SIP_TRUNK.NAME, PERMISSIONS.CARRIER.SIP_TRUNK.ACTIONS.CARRIER_SIP_TRUNK_CREATE)},
      { path: SCREEN_PATH.SIP_TRUNK_LIST_UNIQUE_CARRIER, element:WITH_PERMISSION(SpecificSipTrunkCarrier,PARENT_MODULE_NAME.CARRIER, PERMISSIONS.CARRIER.SIP_TRUNK.NAME, PERMISSIONS.CARRIER.SIP_TRUNK.ACTIONS.CARRIER_SIP_TRUNK_VIEW) },
      
      { path: SCREEN_PATH.RATE_DECK_CARRIER, element:WITH_PERMISSION(RateDeckCarrier,PARENT_MODULE_NAME.CARRIER, PERMISSIONS.CARRIER.RATE_DECK.NAME, PERMISSIONS.CARRIER.RATE_DECK.ACTIONS.CARRIER_RATE_DECK_LIST)},


      { path: SCREEN_PATH.SETTINGS, element: <Settings /> },
      { path: SCREEN_PATH.ROLE_LIST_UNIQUE, element: <SpecificRole /> },
      { path: SCREEN_PATH.ACCESS_DENIED, element: <AccessDenied /> },


    ],
  },
];

export default routes;
