import { Skeleton } from "@/components/ui/skeleton";

export function DicSkeleton() {
  return (
    <div className='flex flex-col gap-4 max-w-fit mx-auto p-4 md:p-24'>
      <Skeleton className='h-8 w-72' />
      <Skeleton className='h-12 w-full bg-zinc-800/80' />

      <div className='flex justify-between border-b pb-3 mb-2'>
        <Skeleton className='h-4 w-40' />
        <Skeleton className='h-4 w-10' />
      </div>

      <div className='space-y-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className='flex justify-between items-center border-b pb-4'
          >
            <Skeleton className='h-4 w-80 mr-2' />

            <div className='flex gap-4'>
              <Skeleton className='h-5 w-5 rounded-sm' />
              <Skeleton className='h-5 w-5 rounded-sm' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DicSkeleton;
