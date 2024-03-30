"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useOrigin } from "@/hooks/use-origin";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface ExplorePaginationProps {
  totalPages: number;
}

export const ExplorePagination = ({ totalPages }: ExplorePaginationProps) => {
  const origin = useOrigin();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const getPageUrl = (page: number) => {
    const url = new URL(`${origin}/explore`);
    const params = new URLSearchParams();
    params.set("sort", searchParams.get("sort") || "all");
    params.set("search", searchParams.get("search") || "");
    params.set("page", page.toString());
    url.search = params.toString();
    return url.toString();
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (currentPage > totalPages || currentPage < 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              isFirstPage &&
                "cursor-not-allowed text-muted-foreground hover:text-muted-foreground"
            )}
            href={!isFirstPage ? getPageUrl(currentPage - 1) : undefined}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={getPageUrl(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={getPageUrl(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage !== 1 && currentPage !== totalPages && (
          <PaginationItem>
            <PaginationLink href={getPageUrl(currentPage)} isActive={true}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={getPageUrl(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              href={getPageUrl(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={cn(
              isLastPage &&
                "cursor-not-allowed text-muted-foreground hover:text-muted-foreground"
            )}
            href={!isLastPage ? getPageUrl(currentPage + 1) : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
