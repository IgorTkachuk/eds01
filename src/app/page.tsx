'use client'

import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Home() {
const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    redirect("/request")

  }, []);

   return (
    <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      Перенаправляємо на головну сторінку…
    </div>
  );
}


// import { AsyncStreetSelect } from "@/components/searchStreet";
// import StreetTable from "@/components/streetTable";

// export default function Home() {
//   return (
//     <div className='flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-4'>
//       <h1 className='text-2xl font-bold'>Street dictinary</h1>
//       <AsyncStreetSelect />
//       <StreetTable />
//     </div>
//   );
// }
