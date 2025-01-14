"use client";

import { useEffect, useState } from "react";
// import { useParams, useRouter } from 'next/navigation';
// import { customerService } from '@/lib/customerService';
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Car,
  MoreHorizontal,
  Lock,
  User,
  Phone,
  Mail,
  Key,
  ShieldCheck,
  Calendar,
  KeySquare,
  Edit,
  Plus,
  Ellipsis,
  Eye,
  Delete,
} from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { SCREEN_PATH } from "@/Constant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CardDetailCommon from "@/Commons/CardDetailCommon";
import DropdownMenuWithDrawer from "./dropDownmenu";
import HeaderCommon from "@/Commons/HeaderCommon";
import { Link } from "react-router-dom";
import TabsCommon from "@/Commons/TabsCommon";
import { ProfileCustomer } from "./SpecificCustomerTabs/ProfileCustomer";
import { CUSTOMER_LIST_TABS } from "@/components/Tabs/TabConfig";
const sipMapData = [
  { id: "1", name: "SIP Map 1", status: "Active", lastUpdated: "2023-06-01" },
  { id: "2", name: "SIP Map 2", status: "Inactive", lastUpdated: "2023-05-28" },
  { id: "3", name: "SIP Map 3", status: "Active", lastUpdated: "2023-06-02" },
  { id: "4", name: "SIP Map 4", status: "Pending", lastUpdated: "2023-05-30" },
  { id: "5", name: "SIP Map 5", status: "Active", lastUpdated: "2023-06-03" },
];

const columnsPayment = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
const dummyCustomers = [
  {
    id: 1,
    fullName: "John Doe",
    accountStatus: "Active",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Elm St, Springfield",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    accountStatus: "Suspended",
    email: "jane.smith@example.com",
    phoneNumber: "+1 (555) 987-6543",
    address: "456 Oak Ave, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },

    {
    id: 3,
    fullName: "Alice Johnson",
    accountStatus: "Active",
    email: "alice.johnson@example.com",
    phoneNumber: "+1 (555) 246-8135",
    address: "789 Pine Rd, Springfield",
  },
];

export default function SpecificCustomer() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const [activeTab, setActiveTab] = useState("details");
  const filteredCustomers = sipMapData;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State for selected customer
  const [activeTabtrunks, setActiveTabtrunks] = useState("settings"); // State for active tab

  const openDrawertrunks = (customer, action) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
    setActiveTab("settings"); // Default tab
  };

  const closeDrawertrunks = () => {
    setIsDrawerOpen(false);
    setActiveTab("sip-trunks")
  };
  const paymentTable = () => (
    <DataTable data={filteredCustomers} columns={columnsPayment} />
  );
  const renderSipMapTable = () => (
    <HeaderCommon DATA={dummyCustomers} COLUMNS={columns} />
  );
  const renderTabContent = (tabName) => {
    switch (tabName) {
      case "details":
        return renderCustomerDetails();
      case "SIP MAP":
        return paymentTable();
      case "sip-trunks":
        return renderSipMapTable();
      case "communication":
        return <p>Communication logs will be displayed here.</p>;
      case "preferences":
        return <p>Customer preferences will be displayed here.</p>;
      default:
        return null;
    }
  };
  const columns = [
    { header: "ID", accessorKey: "id" },
    {
      header: "Name",
      accessorKey: "fullName",
      cell: ({ row }) => {
        const fullName = row.getValue("fullName");
        const id = row.getValue("id");
        return (
          <Link
            to={`/customer/${id}`}
            className="text-primary hover:underline"
          >
            {fullName}
          </Link>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "accountStatus",
      cell: ({ row }) => {
        const status = row.getValue("accountStatus");
        return (
          <Badge variant={status === "Active" ? "success" : "destructive"}>
            {status}
          </Badge>
        );
      },
    },
    { header: "Email", accessorKey: "email" },
    { header: "Phone", accessorKey: "phoneNumber" },
    { header: "Address", accessorKey: "address" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const customer = row.original; // Get customer data for current row
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => openDrawertrunks(customer, "view")}>
                <Eye className="w-4 h-4 mr-2 text-gray-500" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2 text-gray-500" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Delete className="w-4 h-4 mr-2 text-gray-500" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="w-4 h-4 mr-2 text-gray-500" />
                Option 1
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="w-4 h-4 mr-2 text-gray-500" />
                Option 2
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <div className="p-6">
      <Button
        variant="ghost"
        onClick={() => navigate(SCREEN_PATH.CUSTOMER_LIST)}
        className="mb-4"
      >
        <ArrowLeft />
        Customers List
      </Button>

      <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src="/images/avatar-placeholder.png"
              alt="User Avatar"
            />
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">Charlie Romance</h2>
            <Badge>Active</Badge>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          {/* <Button variant="outline" onClick={openDrawer}>
           <Ellipsis />
          </Button> */}
          <DropdownMenuWithDrawer />
        </div>
      </div>
      {/* setting(Cards),IP AUTH(Table), Routing (check box), Rate Deck(Table) */}

      {/* Filters, Limits  */}
      {/* <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList>
          <TabsTrigger value="details">Profile</TabsTrigger>
          <TabsTrigger value="setting">Setting</TabsTrigger>
          <TabsTrigger value="SIP MAP">Payments</TabsTrigger>
          <TabsTrigger value="sip-trunks">SIP Trunks</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="flex justify-between items-center mb-4"></div>
          {renderTabContent(activeTab)}
        </TabsContent>
      </Tabs> */}
      <TabsCommon TABS={CUSTOMER_LIST_TABS} DEFAULT_TAB={CUSTOMER_LIST_TABS[0].value}  />
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[700px] ">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Edit Profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile information here.
              </DrawerDescription>
            </DrawerHeader>

            {/* Drawer Body */}
            <div className="p-4 ">
              {/* Add form or content here */}
              <p>This is where the profile editing form will go.</p>
            </div>

            {/* Drawer Footer */}
            <DrawerFooter>
              <Button variant="outline" onClick={closeDrawer}>
                Cancel
              </Button>
              <Button onClick={() => alert("Saved!")}>Save changes</Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>


      {/* <Drawer open={isDrawerOpen} onOpenChange={closeDrawertrunks}>
        <DrawerContent className="h-[700px] ">
          <DrawerHeader>
            <DrawerClose />
          </DrawerHeader>
          <div className="p-4">
          <Tabs value={activeTabtrunks} onValueChange={setActiveTabtrunks}>
            <TabsList>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="ip-auth">IP AUTH</TabsTrigger>
              <TabsTrigger value="routing">Routing</TabsTrigger>
              <TabsTrigger value="rate-deck">Rate Deck</TabsTrigger>
            </TabsList>
            <TabsContent value="settings">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 mt-6   ">
        <CardDetailCommon
          HEADING_NAME={"Filter"}
          DATA={data}
          IS_TWO_COLUMNS={false}
        />
        <CardDetailCommon
          HEADING_NAME={"Limits"}
          DATA={data}
          IS_TWO_COLUMNS={false}
        />
      </div>
            </TabsContent>
            <TabsContent value="ip-auth">
            <HeaderCommon DATA={dummyCustomers} COLUMNS={columns} />

            </TabsContent>
            <TabsContent value="routing">
              <p>Routing content for {selectedCustomer?.fullName}</p>
            </TabsContent>
            <TabsContent value="rate-deck">
            <HeaderCommon DATA={dummyCustomers} COLUMNS={columns} />

            </TabsContent>
          </Tabs>
          </div>
        </DrawerContent>
      </Drawer> */}
    </div>
  );
}
