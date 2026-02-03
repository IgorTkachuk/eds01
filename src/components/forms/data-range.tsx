"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker";
import { Button } from "../ui/button";

interface CalendarRangeProps {
  onSetRange: (range: DateRange) => void;
}

export function CalendarRange({ onSetRange }: CalendarRangeProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });

  return (
    <Card className='mx-auto w-fit p-0'>
      <CardContent className='p-0'>
        <Calendar
          mode='range'
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </CardContent>
      <Button
        onClick={() => {
          onSetRange(dateRange!);
        }}
      >
        Встановити
      </Button>
    </Card>
  );
}
