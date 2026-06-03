import { TooltipProvider } from "@/components/ui/tooltip";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full'>{children}</main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
