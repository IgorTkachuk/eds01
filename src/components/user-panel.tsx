"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { downloadExcel } from "@/lib/utils";
import { addDays } from "date-fns";
import { FileText, LogOut } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { type DateRange } from "react-day-picker";

export default function UserPanel({ userName }: { userName?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateRange: DateRange = {
    from: new Date(searchParams.get("from") ?? new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
    to: new Date(searchParams.get("to") ?? addDays(new Date(new Date().getFullYear(), 0, 12), 30)),
  }
  

  return (
    <div className='flex gap-2 items-center'>
      <p>{userName}</p>
      <Button
        variant='outline'
        onClick={() => {
          signOut({
            fetchOptions: {
              onSuccess: () => {
                // router.push("/login");
                window.location.href = "/api/auth/logout";
              },
            },
          });
        }}
      >
        Вийти <LogOut className="size-4" />
      </Button>
      <Button onClick={()=>downloadExcel({dateRange})}> Звіт в Excel<FileText className="size-4"/></Button>
    </div>
  );
}


