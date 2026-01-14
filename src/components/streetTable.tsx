import { getStreets } from "@/server/street";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function StreetTable(){
    const streets = await getStreets();

    return (
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableCaption>A list of streets.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25 font-bold bg-pink-100">Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {streets.map((street) => (
              <TableRow key={street.id}>
                <TableCell className="font-medium">{street.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
}