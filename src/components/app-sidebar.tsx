"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { BookOpen, Wrench } from "lucide-react";

const navMain = [
  {
    title: "Ремонтні заявки",
    url: "/request",
    icon: Wrench,
  },
  {
    title: "Довідники",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Населенний пункт",
        url: "#",
      },
      {
        title: "Вулиця",
        url: "/dict/street",
      },
      {
        title: "Характер заявки",
        url: "#",
      },
      {
        title: "Фактична причина заявки",
        url: "#",
      },
      {
        title: "Діаметер",
        url: "#",
      },
      {
        title: "Матеріал",
        url: "#",
      },
      {
        title: "Тиск",
        url: "#",
      },
      {
        title: "Розташування газопроводу",
        url: "#",
      },
      {
        title: "Виконавці",
        url: "#",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
