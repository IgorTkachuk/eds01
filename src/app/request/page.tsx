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

export default async function RequestsPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

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
            <RequestForm userId={session?.user.id}/>
          </DialogContent>
        </Dialog>
      </div>
      <RequestsTable userId={session?.user.id!}/>
    </div>
  );
}
