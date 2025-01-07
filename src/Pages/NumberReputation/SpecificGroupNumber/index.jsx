import React, { useState } from "react";
import BreadCrumbCommon from "@/Commons/BreadCrumbCommon";
import HeaderCommon from "@/Commons/HeaderCommon";
import { MODULENAME, SCREEN_PATH } from "@/Constant";
import { Plus, Play, Trash, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomTextarea from "../NewGroup/CustomTextArea";
import FileUpload from "../NewGroup/FileUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

const SpecificGroupNumber = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const actionButtons = [
    {
      label: "Add Numbers",
      variant: "outline",
      onClick: openDrawer,
      icon: <Plus />,
    },
  ];
  const data = [
    {
      phoneNumber: "+1 813 953 6659",
      lastCall: "2024-10-09, 23:14:57",
      country: "USA",
      detectedBy: ["Tool A", "Tool B", "Tool C"],
      status: "green",
    },
    {
      phoneNumber: "+1 813 953 6677",
      lastCall: "2024-10-09, 23:14:57",
      country: "Canada",
      detectedBy: [],
      status: "red",
    },
    // Additional data entries can be added here
  ];
  return (
    <>
      <BreadCrumbCommon
        ITEMS={[
          {
            label: "Number Reputation",
            href: SCREEN_PATH.NUMBER_REPUTATION_GROUPS,
          },
          { label: MODULENAME.NUMBER_GROUP, href: "#" },
          { label: "Group Name" },
        ]}
        SHOW_BUTTONS={true}
        BUTTONS={actionButtons}
      />
      <HeaderCommon />
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <Checkbox className="mt-4" />
            <TableHead>Phone Number</TableHead>
            <TableHead>Last Call</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Detected by</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <Checkbox />
              <TableCell>
                <div className="flex items-center">
                  {item.phoneNumber}
                  {/* <StatusIcon status={item.status} /> */}
                </div>
                <div>Created: {item.lastCall}</div>
              </TableCell>
              <TableCell>{item.lastCall}</TableCell>
              <TableCell>{item.country}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {item.detectedBy.length > 0 ? (
                    item.detectedBy.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="bg-gray-200 rounded-full px-2 py-1 text-xs"
                      >
                        {tool}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Play size={16} />
                </Button>
                <Button onClick={() => navigate(SCREEN_PATH.CALENDER)} size="sm" variant="outline">
                  <History size={16} />
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild></DialogClose>
          <div className="w-full">
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-2 w-[240px]">
                <TabsTrigger value="account">Enter Manually </TabsTrigger>
                <TabsTrigger value="password">Import</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <CustomTextarea />
              </TabsContent>
              <TabsContent value="password" className="">
                <FileUpload />
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button variant="outline" type="submit">
              Cancel
            </Button>
            <Button type="submit">Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpecificGroupNumber;
