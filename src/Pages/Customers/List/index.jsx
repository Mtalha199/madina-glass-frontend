// customers-list.jsx
"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Headers } from "@tanstack/react-table";
import HeaderCommon from "@/Commons/HeaderCommon";

// Dummy data for customers
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
];

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setCustomers(dummyCustomers);
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customers List</h1>
        <Button>Add New Customer</Button>
      </div>
      <HeaderCommon DATA={filteredCustomers} COLUMNS={columns} />
    </div>
  );
}
