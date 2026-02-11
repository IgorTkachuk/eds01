import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import path from "path";
import { addDays } from "date-fns";
import { getUserRequests } from "@/app/request/action";

const TEMPLATE_PATH = path.join(process.cwd(), "templates", "templ01.xlsx");
const DATA_START_ROW = 2;
const REPORT_FILENAME = "report.xlsx";

function getDefaultDateRange() {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = addDays(new Date(now.getFullYear(), 0, 12), 30);
  return { from, to };
}

function parseDate(value: string | null, fallback: Date) {
  return value ? new Date(value) : fallback;
}

function fillRow(
  worksheet: ExcelJS.Worksheet,
  rowNumber: number,
  request: Awaited<ReturnType<typeof getUserRequests>>[number]
) {
  const row = worksheet.getRow(rowNumber);

  row.getCell(1).value = request.id;
  row.getCell(2).value = request.performer?.name ?? "";
  row.getCell(3).value = request.customerFullName ?? "";
  row.getCell(4).value = request.customerPhoneNumber ?? "";
  row.getCell(5).value = request.settlement?.name ?? "";
  row.getCell(6).value = request.street?.name ?? "";
  row.getCell(7).value = request.buildingNumber ?? "";
  row.getCell(8).value = request.rqCharacter?.name ?? "";
  row.getCell(9).value = request.inputdate ?? "";
  row.getCell(9).numFmt = "dd.mm.yyyy";
  row.getCell(10).value = request.finishdate ?? "";
  row.getCell(10).numFmt = "dd.mm.yyyy";
  row.getCell(11).value = request.diameter?.name ?? "";
  row.getCell(12).value = request.material?.name ?? "";
  row.getCell(13).value = request.pipeLayingType?.name ?? "";
  row.getCell(14).value = request.pressure?.name ?? "";
  row.getCell(15).value = request.completedWork ?? "";
  row.getCell(16).value = request.notes ?? "";
  row.getCell(17).value = request.user?.name ?? "";
  

  row.commit?.(); // безпечно навіть якщо streaming не використовується
}

function writePeriodRow(
  worksheet: ExcelJS.Worksheet,
  rowNumber: number,
  from: Date,
  to: Date
) {
  const row = worksheet.getRow(rowNumber);

  row.getCell(1).value = from;
  row.getCell(1).numFmt = "dd.mm.yyyy";

  row.getCell(2).value = to;
  row.getCell(2).numFmt = "dd.mm.yyyy";
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const defaults = getDefaultDateRange();

    const from = parseDate(searchParams.get("from"), defaults.from);
    const to = parseDate(searchParams.get("to"), defaults.to);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(TEMPLATE_PATH);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) throw new Error("Worksheet not found");

    const requests = await getUserRequests({ from, to });

    requests.forEach((req, i) => {
      fillRow(worksheet, DATA_START_ROW + i, req);
    });

    const periodRowIndex = DATA_START_ROW + requests.length + 1;
    writePeriodRow(worksheet, periodRowIndex, from, to);

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${REPORT_FILENAME}"`,
      },
    });
  } catch (error) {
    console.error("Report generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
