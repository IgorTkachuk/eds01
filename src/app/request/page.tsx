import RequestsTable from "@/components/requests-table";

export default async function RequestsPage() {
  return (
    <div className='flex flex-col gap-4 max-w-fit mx-auto p-4 md:p-24'>
      <h1 className='text-2xl font-bold'>Ремонтні заявки</h1>
      <RequestsTable />
    </div>
  );
}
