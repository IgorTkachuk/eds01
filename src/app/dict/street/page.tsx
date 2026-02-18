import { AsyncStreetSelect } from "@/components/searchStreet";
import StreetTable from "@/components/streetTable";

export default function DictStreet () {
    return (
    <div className='flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-4'>
      <h1 className='text-2xl font-bold'>Довідник вулиць</h1>
      <AsyncStreetSelect />
      <StreetTable />
    </div>
  );
}