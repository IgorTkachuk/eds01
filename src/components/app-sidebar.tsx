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
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

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
  const { data: session } = authClient.useSession();
  const [nav, setNav] = useState(navMain);

  useEffect(() => {
    async function getPermissions() {
      if (!session?.user?.id) return;

      const { data } = await authClient.admin.hasPermission({
        userId: session?.user.id,
        permission: { dictionary: ["hasAccess"] },
      });

      console.log("RES #####: ", data?.success);

      if (!data?.success) {
        // setNav([navMain[0]]);
        setNav(navMain.filter((item) => item.title !== "Довідники"));
      }
    }

    getPermissions();
  }, [session]);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={nav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
