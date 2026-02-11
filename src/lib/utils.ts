import { clsx, type ClassValue } from "clsx"
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const downloadExcel = async ({dateRange} : {dateRange: DateRange}) => {

  const params = new URLSearchParams()
  params.set("from", dateRange?.from?.toISOString()!);
  params.set("to", dateRange?.to?.toISOString()!);
  console.log(params.toString());

  const res = await fetch(`/api/export-excel?${params.toString()}`);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "report.xlsx";
  a.click();
  window.URL.revokeObjectURL(url);
};
