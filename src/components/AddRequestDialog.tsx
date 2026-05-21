"use client";

import { useState } from "react";
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

type Props = {
  userId: string;
};

export default function AddRequestDialog({ userId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <RequestForm userId={userId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
