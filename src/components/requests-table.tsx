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
import { format } from "date-fns";
import { uk } from "react-day-picker/locale";
import { Button } from "./ui/button";
import { Pencil, Trash, Trash2 } from "lucide-react";

export default async function RequestsTable() {
  const requests = await getRequests();
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
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map(({ request: req, street, settlement, performer }) => (
          <TableRow key={req.id}>
            <TableCell>{performer?.name}</TableCell>
            <TableCell>
              {format(req.inputdate!, "Pp", { locale: uk })}
            </TableCell>
            <TableCell>
              {format(req.finishdate!, "Pp", { locale: uk })}
            </TableCell>
            <TableCell>{req.customerFullName}</TableCell>
            <TableCell>{req.customerPhoneNumber}</TableCell>
            <TableCell>{settlement?.name}</TableCell>
            <TableCell>{street?.name}</TableCell>
            <TableCell>{req.buildingNumber}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost"><Pencil className="size-4"/></Button>
              <Button variant="ghost"><Trash2 className="size-4"/></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
