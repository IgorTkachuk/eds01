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

const dictionariesBasePath = "/admin/dictionaries/";

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
        url: `${dictionariesBasePath}settlement`,
      },
      {
        title: "Вулиця",
        url: `${dictionariesBasePath}street`,
      },
      {
        title: "Характер заявки",
        url: `${dictionariesBasePath}rqType`,
      },
      {
        title: "Фактична причина заявки",
        url: `${dictionariesBasePath}rqFact`,
      },
      {
        title: "Діаметер",
        url: `${dictionariesBasePath}diameter`,
      },
      {
        title: "Матеріал",
        url: `${dictionariesBasePath}material`,
      },
      {
        title: "Тиск",
        url: `${dictionariesBasePath}pressure`,
      },
      {
        title: "Розташування газопроводу",
        url: `${dictionariesBasePath}pipeLayingType`,
      },
      {
        title: "Виконавці",
        url: `${dictionariesBasePath}performer`,
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
