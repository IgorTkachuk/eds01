"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { downloadExcel } from "@/lib/utils";
import { addDays, lastDayOfMonth, startOfMonth, subSeconds } from "date-fns";
import { FileText, LogOut } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { type DateRange } from "react-day-picker";

import { authClient } from "@/lib/auth-client";
import Search from "./search";

export default function UserPanel({ userName }: { userName?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateRange: DateRange = {
    from: new Date(searchParams.get("from") ?? startOfMonth(new Date())),
    to: new Date(
      searchParams.get("to") ??
        subSeconds(addDays(lastDayOfMonth(new Date()), 1), 1),
    ),
  };

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  if (!session) return <div>Not authirized</div>;

  return (
    <div className='w-full flex gap-2 items-center'>
      {/* <p>{session.user.name}</p>
      <img
        src={`/api/user-photo/${session.user.email.split("@")[0]}`}
        alt="User avatar"
        className="rounded-full w-10 h-10 object-cover"
      />

      <Button
        variant="outline"
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
      </Button> */}
      <Button onClick={() => downloadExcel({ dateRange })}>
        {" "}
        Звіт в Excel
        <FileText className='size-4' />
      </Button>
      <Search placeholder='Замовник, Виконавець, ном. телефону, нас. пункт, вулиця ' />
    </div>
  );
}
