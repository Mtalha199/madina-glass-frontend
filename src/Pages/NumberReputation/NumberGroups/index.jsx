import BreadCrumbCommon from "@/Commons/BreadCrumbCommon";
import HeaderCommon from "@/Commons/HeaderCommon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MODULENAME, SCREEN_PATH } from "@/Constant";
import { ChevronDown, ChevronUp, EllipsisVertical, Home, Plus } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const NumberGroups = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false);
  const chartData = [
    { label: "16 June", clean: 1000, robboKiller: 20, scout: 10, tMobile: 10 },
    { label: "17 June", clean: 80, robboKiller: 25, scout: 5, tMobile: 10 },
    { label: "17 June", clean: 875, robboKiller: 22, scout: 8, tMobile: 15 },
    { label: "17 June", clean: 70, robboKiller: 148, scout: 7, tMobile: 220 },
    { label: "17 June", clean: 690, robboKiller: 15, scout: 5, tMobile: 10 },
    { label: "17 June", clean: 85, robboKiller: 20, scout: 180, tMobile: 15 },
    { label: "17 June", clean: 195, robboKiller: 310, scout: 5, tMobile: 20 },
    { label: "17 June", clean: 395, robboKiller: 10, scout: 5, tMobile: 320 },
    { label: "17 June", clean: 295, robboKiller: 10, scout: 5, tMobile: 20 },
    { label: "17 June", clean: 95, robboKiller: 10, scout: 5, tMobile: 20 },
  ];
  const actionButtons = [
    {
      label: "Create New Group",
      variant: "outline",
      onClick: () => navigate(SCREEN_PATH.NUMBER_REPUTATION_NEW_GROUPS),
      icon:<Plus />
    },
  ];
  return (
    <>
      <BreadCrumbCommon
      BREADCRUMBS={false}
        ITEMS={[
          { label: "Number Reputation", href: "#" },
          { label: MODULENAME.NUMBER_GROUP },
        ]}
        SHOW_BUTTONS={true}
        BUTTONS={actionButtons}
      />
      <HeaderCommon />
      <div
        className={`bg-background border border-primary p-5 rounded-lg mt-4 ${
          isOpen ? " bg-[#EFF6FF80]" : ""
        }`}
      >
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold underline">Contacts Group - 1</h2>
            <p className="text-sm">Last Checked: 3 Days Ago</p>
            <p className="font-bold">147 Contacts</p>
            <Badge>57 Clean</Badge>
            <Link to="/number-reputation/13524678" className="text-primary underline">
              Show Contacts
            </Link>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="mt-4">
              <div className="bg-muted/20 rounded-lg mt-4">
                <div className="flex mb-4 text-center gap-16">
                  <div>
                    <p className="text-sm ">Total Contacts</p>
                    <p className="text-2xl font-semibold">98</p>
                  </div>
                  <div>
                    <p className="text-sm">Clean</p>
                    <p className="text-2xl font-semibold">31</p>
                  </div>
                  <div>
                    <p className="text-sm ">Spam</p>
                    <p className="text-2xl font-semibold">67</p>
                  </div>
                </div>
                <div>
                  <BarChart
                    width={1000}
                    height={250}
                    data={chartData}
                    margin={{ top: 20, right: 20, bottom: 20 }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="clean"
                      stackId="a"
                      fill="#1E3A8A"
                      name="Clean"
                    />
                    <Bar
                      dataKey="robboKiller"
                      stackId="a"
                      fill="#2563EB"
                      name="Robbo Killer"
                    />
                    <Bar
                      dataKey="scout"
                      stackId="a"
                      fill="#60A5FA"
                      name="Scout"
                    />
                    <Bar
                      dataKey="tMobile"
                      stackId="a"
                      fill="#93C5FD"
                      name="T-Mobile"
                    />
                  </BarChart>
                  <div className="flex justify-end space-x-3">
                    <EllipsisVertical className="h-5" />
                    <Button variant="outline">Reschedule</Button>
                    <Button>Check Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
      </div>
      <div
        className={`bg-background border border-primary p-5 rounded-lg mt-4 ${
          isOpen ? " bg-[#EFF6FF80]" : ""
        }`}
      >
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold underline">Contacts Group - 1</h2>
            <p className="text-sm">Last Checked: 3 Days Ago</p>
            <p className="font-bold">147 Contacts</p>
            <Badge>57% Clean</Badge>
            <Link to="/number-reputation/13524678" className="text-primary underline">
              Show Contacts
            </Link>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="mt-4">
              <div className="bg-muted/20 rounded-lg mt-4">
                <div className="flex mb-4 text-center gap-16">
                  <div>
                    <p className="text-sm ">Total Contacts</p>
                    <p className="text-2xl font-semibold">98</p>
                  </div>
                  <div>
                    <p className="text-sm">Clean</p>
                    <p className="text-2xl font-semibold">31</p>
                  </div>
                  <div>
                    <p className="text-sm ">Spam</p>
                    <p className="text-2xl font-semibold">67</p>
                  </div>
                </div>
                <div>
                  {/* <BarChart
                    width={1200}
                    height={250}
                    data={chartData}
                    margin={{ top: 20, right: 20, bottom: 20 }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="clean"
                      stackId="a"
                      fill="#1E3A8A"
                      name="Clean"
                    />
                    <Bar
                      dataKey="robboKiller"
                      stackId="a"
                      fill="#2563EB"
                      name="Robbo Killer"
                    />
                    <Bar
                      dataKey="scout"
                      stackId="a"
                      fill="#60A5FA"
                      name="Scout"
                    />
                    <Bar
                      dataKey="tMobile"
                      stackId="a"
                      fill="#93C5FD"
                      name="T-Mobile"
                    />
                  </BarChart> */}
                  <div className="flex justify-end space-x-3">
                    <EllipsisVertical className="h-5" />
                    <Button variant="outline" type="button" onClick={()=>navigate(SCREEN_PATH.NUMBER_REPUTATION_NEW_GROUPS, {state: {group_name:"talha",editData:true}})}>Reschedule</Button>
                    <Button>Check Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
      </div>
      <div
        className={`bg-background border border-primary p-5 rounded-lg mt-4 ${
          isOpen ? " bg-[#EFF6FF80]" : ""
        }`}
      >
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold underline">Contacts Group - 1</h2>
            <p className="text-sm">Last Checked: 3 Days Ago</p>
            <p className="font-bold">147 Contacts</p>
            <Badge>57% Clean</Badge>
            <Link to="/number-reputation/13524678" className="text-primary underline">
              Show Contacts
            </Link>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="mt-4">
              <div className="bg-muted/20 rounded-lg mt-4">
                <div className="flex mb-4 text-center gap-16">
                  <div>
                    <p className="text-sm ">Total Contacts</p>
                    <p className="text-2xl font-semibold">98</p>
                  </div>
                  <div>
                    <p className="text-sm">Clean</p>
                    <p className="text-2xl font-semibold">31</p>
                  </div>
                  <div>
                    <p className="text-sm ">Spam</p>
                    <p className="text-2xl font-semibold">67</p>
                  </div>
                </div>
                <div>
                  {/* <BarChart
                    width={1200}
                    height={250}
                    data={chartData}
                    margin={{ top: 20, right: 20, bottom: 20 }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="clean"
                      stackId="a"
                      fill="#1E3A8A"
                      name="Clean"
                    />
                    <Bar
                      dataKey="robboKiller"
                      stackId="a"
                      fill="#2563EB"
                      name="Robbo Killer"
                    />
                    <Bar
                      dataKey="scout"
                      stackId="a"
                      fill="#60A5FA"
                      name="Scout"
                    />
                    <Bar
                      dataKey="tMobile"
                      stackId="a"
                      fill="#93C5FD"
                      name="T-Mobile"
                    />
                  </BarChart> */}
                  <div className="flex justify-end space-x-3">
                    <EllipsisVertical className="h-5" />
                    <Button variant="outline">Reschedule</Button>
                    <Button>Check Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
      </div>
      {/* <div
        className={`bg-background border border-primary p-5 rounded-lg mt-4 ${
          isOpen ? " bg-[#EFF6FF80]" : ""
        }`}
      >
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold underline">Contacts Group - 1</h2>
            <p className="text-sm">Last Checked: 3 Days Ago</p>
            <p className="font-bold">147 Contacts</p>
            <Badge>57% Clean</Badge>
            <Link to="/number-reputation/13524678" className="text-primary underline">
              Show Contacts
            </Link>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="mt-4">
              <div className="bg-muted/20 rounded-lg mt-4">
                <div className="flex mb-4 text-center gap-16">
                  <div>
                    <p className="text-sm ">Total Contacts</p>
                    <p className="text-2xl font-semibold">98</p>
                  </div>
                  <div>
                    <p className="text-sm">Clean</p>
                    <p className="text-2xl font-semibold">31</p>
                  </div>
                  <div>
                    <p className="text-sm ">Spam</p>
                    <p className="text-2xl font-semibold">67</p>
                  </div>
                </div>
                <div>
                  <BarChart
                    width={1200}
                    height={250}
                    data={chartData}
                    margin={{ top: 20, right: 20, bottom: 20 }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="clean"
                      stackId="a"
                      fill="#1E3A8A"
                      name="Clean"
                    />
                    <Bar
                      dataKey="robboKiller"
                      stackId="a"
                      fill="#2563EB"
                      name="Robbo Killer"
                    />
                    <Bar
                      dataKey="scout"
                      stackId="a"
                      fill="#60A5FA"
                      name="Scout"
                    />
                    <Bar
                      dataKey="tMobile"
                      stackId="a"
                      fill="#93C5FD"
                      name="T-Mobile"
                    />
                  </BarChart>
                  <div className="flex justify-end space-x-3">
                    <EllipsisVertical className="h-5" />
                    <Button variant="outline">Reschedule</Button>
                    <Button>Check Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
      </div> */}
    </>
  );
};
export default NumberGroups;
