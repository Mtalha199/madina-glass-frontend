"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Plus,
  Repeat,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
  Users,
  UserPlus,
  Box,
  Wrench,
  FileSpreadsheet,
  CreditCard,
  Ticket,
  UsersRound,
  Hash
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NAVIGATION} from "@/Constant"
export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={NAVIGATION.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAVIGATION.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={NAVIGATION.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
