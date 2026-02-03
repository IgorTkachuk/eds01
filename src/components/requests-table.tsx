import { getRequests } from "@/app/actions/requests";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { uk } from "react-day-picker/locale";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { DeleteRequestButton } from "./delete-request-button";
import RequestForm from "./forms/request-form";
import { getUserRequests } from "@/app/request/action";
import { DateRange } from "react-day-picker";

export default async function RequestsTable({
  dateRange,
}: {
  dateRange?: DateRange;
}) {
  // const requests = await getRequests(userId);
  const requests = await getUserRequests(dateRange);
  return (
    <Table>
      <TableCaption>Перелік заявок</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-25'>Виконавець</TableHead>
          <TableHead>Надходження</TableHead>
          <TableHead>Завершено</TableHead>
          <TableHead>ПІБ заявника</TableHead>
          <TableHead>Тел. # з-ка</TableHead>
          <TableHead>Населенний п-т</TableHead>
          <TableHead>Вулиця</TableHead>
          <TableHead>Буд.</TableHead>
          <TableHead className='text-right'>Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req) => (
          <TableRow key={req.id}>
            <TableCell>{req.performer?.name}</TableCell>
            <TableCell>
              {format(req.inputdate!, "Pp", { locale: uk })}
            </TableCell>
            <TableCell>
              {format(req.finishdate!, "Pp", { locale: uk })}
            </TableCell>
            <TableCell>{req.customerFullName}</TableCell>
            <TableCell>{req.customerPhoneNumber}</TableCell>
            <TableCell>{req.settlement?.name}</TableCell>
            <TableCell>{req.street?.name}</TableCell>
            <TableCell>{req.buildingNumber}</TableCell>
            <TableCell className='text-right'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='ghost'>
                    <Pencil className='size-4' />
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-fit'>
                  <DialogHeader>
                    <DialogTitle>Редагування заявки</DialogTitle>
                    <RequestForm request={req} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <DeleteRequestButton requestId={req.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
