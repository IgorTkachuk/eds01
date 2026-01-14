import { getStreetsByName } from "@/server/street"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") ?? ""

  if (q.length < 2) {
    return NextResponse.json([])
  }

//   // приклад — заміни на БД
//   const data = [
//     { id: 1, name: "Шевченка" },
//     { id: 2, name: "Шевченка Тараса" },
//     { id: 3, name: "Шевченка проспект" },
//   ]

  
//   const filtered = data.filter(s =>
//     s.name.toLowerCase().includes(q.toLowerCase())
// )
const streets = await getStreetsByName(q.toLowerCase());

  return NextResponse.json(streets)
}
