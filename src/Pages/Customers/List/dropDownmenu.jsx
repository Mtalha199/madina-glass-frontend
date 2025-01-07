import { Button } from "@/components/ui/button"; // ShadCN Button
import { Plus, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // ShadCN Dropdown Menu
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
} from "@/components/ui/drawer"; // ShadCN Drawer
import { useState } from "react";

const DropdownMenuWithDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [selectedName, setSelectedName] = useState(""); // State for selected name

  const openDrawer = (name) => {
    setSelectedName(name);
    setIsDrawerOpen(true);
    setIsDropdownOpen(false); // Close dropdown when opening drawer
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const menuItems = [
    { label: "Add Sitemap", onClick: () => openDrawer("Add Sitemap") },
    { label: "Add Payment", onClick: () => openDrawer("Add Payment") },
    { label: "Option 3", onClick: () => openDrawer("Option 3") },
    { label: "Option 4", onClick: () => openDrawer("Option 4") },
  ];

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {menuItems.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.onClick}>
              <Plus className="w-4 h-4 mr-2 text-gray-500" />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={closeDrawer}>
        <DrawerContent className="h-[700px]">
          <DrawerHeader>
            <h2 className="text-lg font-semibold">Drawer Content</h2>
            <DrawerClose />
          </DrawerHeader>
          <p className="text-gray-700">You clicked: {selectedName}</p>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DropdownMenuWithDrawer;
