"use client";

import { Loader, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeRequest } from "@/app/actions/requests";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteRequestButtonProps {
  requestId: number;
}

export function DeleteRequestButton({ requestId }: DeleteRequestButtonProps) {
  const [pending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await removeRequest(requestId);
        console.log(res);
        toast.success("Заявка видалена");
        setIsOpen(false);
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Помилка видалення заявки");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <Trash2 className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ви дійсно впевнені?</DialogTitle>
          <DialogDescription>
            Цю дію не можна скасувати. Це призведе до остаточного видалення
            інформації про заявку.
          </DialogDescription>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={pending}
          >
            {pending ? <Loader className='size-4 animate-spin' /> : "Видалити"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
