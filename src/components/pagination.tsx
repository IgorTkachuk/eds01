'use client'

import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Pagination2({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageURL(currentPage - 1)} 
          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {allPages.map((page, index) => {
          return (
            <PaginationItem key={`${page}-${index}`}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
                className={currentPage === page ? "pointer-events-none opacity-50" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

        <PaginationItem>
          <PaginationNext href={createPageURL(currentPage + 1)} 
          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  //   return (
  //     <>
  //       <div className="inline-flex">
  //         <PaginationArrow
  //           direction="left"
  //           href={createPageURL(currentPage - 1)}
  //           isDisabled={currentPage <= 1}
  //         />

  //         <div className="flex -space-x-px">
  //           {allPages.map((page, index) => {
  //             let position: "first" | "last" | "single" | "middle" | undefined;

  //             if (index === 0) position = "first";
  //             if (index === allPages.length - 1) position = "last";
  //             if (allPages.length === 1) position = "single";
  //             if (page === "...") position = "middle";

  //             return (
  //               <PaginationNumber
  //                 key={`${page}-${index}`}
  //                 href={createPageURL(page)}
  //                 page={page}
  //                 position={position}
  //                 isActive={currentPage === page}
  //               />
  //             );
  //           })}
  //         </div>

  //         <PaginationArrow
  //           direction="right"
  //           href={createPageURL(currentPage + 1)}
  //           isDisabled={currentPage >= totalPages}
  //         />
  //       </div>
  //     </>
  //   );
}
