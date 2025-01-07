import { MODULENAME, SCREEN_PATH } from "@/Constant";
import { Home,Repeat, ShoppingCart, Users2 ,Contact,SquareUserRound, Plus, } from "lucide-react";

export const mainSideBar = [
  {
    key: 1,
    icon: <Home className="h-5 w-5" />,
    tooltip: "Dashboard",
    name: "Dashboard"
  },
  {
    key: 2,
    icon: <Repeat className="h-5 w-5" />,
    tooltip: "Number Reputation",
    name: "Number Reputation"
  },
  {
    key: 3,
    icon: <Users2 className="h-5 w-5" />,
    tooltip: "User",
    name: "User"
  },
  {
    key: 4,
    icon: <Plus className="h-7 w-7" />,
    tooltip: "Rotator",
    name: "rotator"
  }
];

export const menuSideBar = {
  2: [
    {
      icon: <Contact className="h-4 w-4"/>,
      name: MODULENAME.NUMBER_GROUP,
      route:SCREEN_PATH.NUMBER_REPUTATION_GROUPS,
      key: 1,
    },
    {
      icon: <SquareUserRound className="h-4 w-4"/>,
      name: "New Group",
      route: SCREEN_PATH.NUMBER_REPUTATION_NEW_GROUPS,
      key: 2,

    },
  ], 3: [
    {
      icon: <Home/>,
      name: "setting",
      route: "/setting",
      key: 3,
    },
  ]
}