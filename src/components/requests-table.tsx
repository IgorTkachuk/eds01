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

export default async function RequestsTable() {
  const requests = await getRequests();
  return (
    <Table>
      <TableCaption>Перелік заявок</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-25'>Performer</TableHead>
          <TableHead>Customer Full Name</TableHead>
          <TableHead>Customer Phone Number</TableHead>
          <TableHead className='text-right'>Completed work</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req) => (
          <TableRow key={req.id}>
            <TableCell className='font-medium'>{req.performer}</TableCell>
            <TableCell>{req.customerFullName}</TableCell>
            <TableCell>{req.customerPhoneNumber}</TableCell>
            <TableCell className='text-right'>{req.completedWork}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
