"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { uk } from "react-day-picker/locale";

export function CalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSetRange() {
    const params = new URLSearchParams(searchParams)
    params.set('from', dateRange?.from?.toISOString()!)
    params.set('to', addDays(dateRange?.to!, 1).toISOString()!)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          locale={uk}
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          numberOfMonths={2}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          onSelect={setDateRange}
        />
      </CardContent>
      <Button onClick={handleSetRange}>Встановити</Button>
    </Card>
  );
}
