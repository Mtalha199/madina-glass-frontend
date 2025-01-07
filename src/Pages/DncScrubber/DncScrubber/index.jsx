import MultiColorStackedBarChart from "@/Auth/chart";
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
import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Home,
  Plus,
} from "lucide-react";
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
import { LineChart } from "./LineChart";

const DncScrubber = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false);
  const chartData = [
    { label: "16 June", clean: 1000, InternelDnc: 20, scout: 10, tMobile: 10 },
    { label: "17 June", clean: 80, InternelDnc: 25, scout: 5, tMobile: 10 },
    { label: "17 June", clean: 875, InternelDnc: 22, scout: 8, tMobile: 15 },
    { label: "17 June", clean: 70, InternelDnc: 148, scout: 7, tMobile: 220 },
    { label: "17 June", clean: 690, InternelDnc: 15, scout: 5, tMobile: 10 },
    { label: "17 June", clean: 85, InternelDnc: 20, scout: 180, tMobile: 15 },
    { label: "17 June", clean: 195, InternelDnc: 310, scout: 5, tMobile: 20 },
    { label: "17 June", clean: 395, InternelDnc: 10, scout: 5, tMobile: 320 },
    { label: "17 June", clean: 295, InternelDnc: 10, scout: 5, tMobile: 20 },
    { label: "17 June", clean: 95, InternelDnc: 10, scout: 5, tMobile: 20 },
  ];
  const actionButtons = [
    {
      label: "Scrub New File",
      variant: "outline",
      onClick: () => navigate(SCREEN_PATH.NUMBER_REPUTATION_NEW_GROUPS),
      icon: <Plus />,
    },
  ];
  const carriers = [
    { name: "T-Mobile", color: "rgb(34, 197, 94)" },
    { name: "Robbo Killer", color: "rgb(239, 68, 68)" },
    { name: "Verizon", color: "rgb(59, 130, 246)" },
    { name: "AT&T", color: "rgb(99, 102, 241)" },
    { name: "Cricket", color: "rgb(234, 179, 8)" },
    { name: "Checker", color: "rgb(147, 51, 234)" },
  ];
  return (
    <>
      <BreadCrumbCommon
        BREADCRUMBS={false}
        ITEMS={[
          { label: "DNC Scrubber", href: "#" },
          { label: MODULENAME.DNC_SCRUBBER },
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
            {/* <Badge>57% Clean</Badge> */}
            <div className={`inline-flex overflow-hidden`}>
              <div className="bg-[#DCFCE7] px-3 py-2 text-xs rounded-l-full">
                81
              </div>
              <div className="bg-[#FEE2E2] px-3 py-2 text-xs text-destructive rounded-r-full">
                53
              </div>
            </div>
            <Link
              to="/number-reputation/13524678"
              className="text-primary underline"
            >
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
                  <div className="h-[200px] mt-4">
                    <LineChart />
                  </div>
                  {/* <div className="flex justify-between mt-4"> */}
                    {/* <div className=" flex gap-2">
                      {carriers.map((carrier) => (
                        <div
                          key={carrier.name}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <span
                            className="mr-1 h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: carrier.color }}
                          />
                          {carrier.name}
                        </div>
                      ))}
                    </div> */}
                    <div className="flex justify-end space-x-3">
                      <div>
                        <EllipsisVertical className="h-5 mt-2" />
                      </div>
                      <Button variant="outline">Reschedule</Button>
                      <Button>Check Now</Button>
                    </div>
                  {/* </div> */}
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
            <div className={`inline-flex overflow-hidden`}>
              <div className="bg-green-500 text-white px-2 py-1 text-xs rounded-l-full">
                81
              </div>
              <div className="bg-red-500 text-white px-2 py-1 text-xs rounded-r-full">
                53
              </div>
            </div>
            <Link
              to="/number-reputation/13524678"
              className="text-primary underline"
            >
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
            <div className={`inline-flex overflow-hidden`}>
              <div className="bg-green-500 text-white px-2 py-1 text-xs rounded-l-full">
                81
              </div>
              <div className="bg-red-500 text-white px-2 py-1 text-xs rounded-r-full">
                53
              </div>
            </div>
            <Link
              to="/number-reputation/13524678"
              className="text-primary underline"
            >
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
export default DncScrubber;
