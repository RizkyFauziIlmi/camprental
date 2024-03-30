"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useDebounceValue } from "usehooks-ts";
export const ExploreHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [debouncedSearch, setValue] = useDebounceValue(
    searchParams.get("search") || "",
    500
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    router.push(
      `/explore?sort=${
        searchParams.get("sort") || "all"
      }&search=${debouncedSearch}&page=${searchParams.get("page") || "1"}`,
      {
        scroll: false,
      }
    );
  }, [debouncedSearch, router, searchParams]);

  return (
    <div className="w-11/12 bg-background p-4 -mt-16 rounded-t-lg flex justify-between">
      <h3 className="hidden md:block scroll-m-20 text-2xl font-semibold tracking-tight">
        Give All You Need
      </h3>
      <div className="flex w-full md:max-w-sm items-center space-x-2 px-2 py-1 rounded-full border-[1px]">
        <div className="flex items-center w-full">
          <CiSearch className="w-6 h-6 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Search on Camprental"
            className="border-none focus-visible:ring-0"
            defaultValue={debouncedSearch}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
};
