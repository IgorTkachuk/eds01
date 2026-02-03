import RequestsTable from "@/components/requests-table";
import { Button } from "@/components/ui/button";
import { FilePlus2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RequestForm from "@/components/forms/request-form";
import { auth } from "@/lib//auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { signOut } from "@/lib/auth-client";
import UserPanel from "@/components/user-panel";
import { getUserGroups } from "../actions/account";
import { CalendarRange } from "@/components/forms/data-range";

export default async function RequestsPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    const groups = await getUserGroups(session.user.id);
    console.log("SESSION, GROUPS ####: ", session, groups);
  } else {
    return <div>No session</div>;
  }

  return (
    <div className='flex flex-col gap-4 max-w-fit mx-auto p-4 md:p-24'>
      <h1 className='text-2xl font-bold'>Ремонтні заявки</h1>
      <div className='flex gap-2 items-center'>
        <UserPanel userName={session?.user.name} />
      </div>
      <div className='flex justify-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Додати заявку
              <FilePlus2Icon />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-fit'>
            <DialogHeader>
              <DialogTitle>Додати заявку</DialogTitle>
              <DialogDescription>
                Додає нову заявку в базу даних ремонтних заявок
              </DialogDescription>
            </DialogHeader>
            <RequestForm userId={session?.user.id} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Встановити період
              <FilePlus2Icon />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-fit'>
            <DialogHeader>
              <DialogTitle>Встановити періоду</DialogTitle>
              <DialogDescription>
                Встановлює період дат відображення заявок
              </DialogDescription>
            </DialogHeader>
            <CalendarRange onSetRange={(range) => console.log(range)} />
          </DialogContent>
        </Dialog>
      </div>
      <RequestsTable />
    </div>
  );
}
