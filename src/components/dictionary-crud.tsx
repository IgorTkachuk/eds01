"use client";

import { useEffect, useState, useTransition } from "react";
import {
  createDictionaryItem,
  updateDictionaryItem,
  deleteDictionaryItem,
} from "@/lib/dictionaries/service";

import { DictionaryType } from "@/lib/dictionaries/config";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { FilePlus2Icon, Loader, Trash2 } from "lucide-react";

import { toast } from "sonner";

type Props = {
  type: DictionaryType;
  label: string;
  initialData: { id: number; name: string }[];
};

export default function DictionaryCrud({ type, label, initialData }: Props) {
  const [items, setItems] = useState(initialData);
  const [newName, setNewName] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [pending, startTransition] = useTransition();

  async function handleCreate() {
    const [created] = await createDictionaryItem(type, newName);
    // setItems([...items, created]);
    setItems((prev) => [...prev, created]);
    toast.success("Елемент створено");
    setNewName("");
  }

  async function handleDelete(id: number) {
    startTransition(async () => {
      const result = await deleteDictionaryItem(type, id);

      if (!result.success) {
        toast.error(result.reason);
        return;
      }
      toast.success("Елемент видалено");
      // setIsOpen(false);
      setDeleteId(null);
      // setItems(items.filter((i) => i.id !== id));
      setItems((prev) => prev.filter((i) => i.id !== id));
    });
  }

  useEffect(() => {
    setItems(initialData);
  }, [initialData]);

  return (
    <div className='flex flex-col gap-4 max-w-fit mx-auto p-4 md:p-24'>
      <h1 className='text-2xl font-bold'>{label} (довідник)</h1>

      {/* <div>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <button onClick={handleCreate}>Додати</button>
      </div> */}

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Додати
            <FilePlus2Icon />
          </Button>
        </DialogTrigger>
        <DialogContent className='w-175'>
          <DialogHeader>
            <DialogTitle>Додати елемент довідника</DialogTitle>
            <DialogDescription>
              Додає новий елемент в базу даних
            </DialogDescription>
          </DialogHeader>
          {/* <RequestForm userId={session?.user.id} /> */}
          <Input
            placeholder='Найменування'
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Відмінити</Button>
            </DialogClose>
            <Button onClick={handleCreate}>Зберегти</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption>Перелік. {label}</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            <TableHead className='w-25'>Найменування елемента</TableHead>
            <TableHead className='text-right'>Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              {/* <TableCell>{item.id}</TableCell> */}
              <TableCell className='font-normal'>{item.name}</TableCell>
              <TableCell className='text-right'>
                {/* <Dialog open={isOpen} onOpenChange={setIsOpen}> */}
                <Dialog
                  open={deleteId === item.id}
                  onOpenChange={(open) => setDeleteId(open ? item.id : null)}
                >
                  <DialogTrigger asChild>
                    {/* <Button variant='ghost'>
                      <Trash2 className='size-4' />
                    </Button> */}
                    <Button
                      variant='ghost'
                      onClick={() => setDeleteId(item.id)}
                    >
                      <Trash2 className='size-4' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ви дійсно впевнені?</DialogTitle>
                      <DialogDescription>
                        Цю дію не можна скасувати. Це призведе до остаточного
                        видалення інформації про елемент довідника.
                      </DialogDescription>
                      <Button
                        variant='destructive'
                        onClick={() => handleDelete(item.id)}
                        disabled={pending}
                      >
                        {pending ? (
                          <Loader className='size-4 animate-spin' />
                        ) : (
                          "Видалити"
                        )}
                      </Button>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
