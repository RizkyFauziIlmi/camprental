"use client";

import { Item } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CiCalendar, CiShoppingBasket, CiShoppingTag } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import { ItemCard } from "./item-card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ItemNotFound } from "./item-not-found";

interface ExploreContentProps {
  items: Item[];
}

export const ExploreContent = ({ items }: ExploreContentProps) => {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<"all" | "new" | "best" | "discount">(
    (searchParams.get("sort") as "all" | "new" | "best" | "discount") || "all"
  );
  const router = useRouter();

  const changeParams = (sort: "all" | "new" | "best" | "discount") => {
    setSort(sort);
    router.push(
      `/explore?sort=${sort}&search=${searchParams.get("search") || ""}&page=${searchParams.get("page") || "1"
      }`,
      { scroll: false }
    );
  };

  return (
    <div className="w-11/12 h-fit bg-background flex flex-col md:flex-row gap-2">
      <div className="flex flex-col gap-2 w-full md:w-2/5 lg:w-1/5">
        <div className="text-lg font-semibold">Category</div>
        <Button
          variant={"ghost"}
          className={cn(
            sort === "all" && "bg-accent text-accent-foreground",
            "pl-1 justify-start"
          )}
          onClick={() => changeParams("all")}
        >
          <CiShoppingBasket className="w-4 h-4 mr-2" /> All Product
        </Button>
        <Button
          variant={"ghost"}
          className={cn(
            sort === "new" && "bg-accent text-accent-foreground",
            "pl-1 justify-start"
          )}
          onClick={() => changeParams("new")}
        >
          <CiCalendar className="w-4 h-4 mr-2" /> New Arrival
        </Button>
        <Button
          variant={"ghost"}
          className={cn(
            sort === "best" && "bg-accent text-accent-foreground",
            "pl-1 justify-start"
          )}
          onClick={() => changeParams("all")}
        >
          <BsStars className="w-4 h-4 mr-2" /> Best Seller
        </Button>
        <Button
          variant={"ghost"}
          className={cn(
            sort === "discount" && "bg-accent text-accent-foreground",
            "pl-1 justify-start"
          )}
          onClick={() => changeParams("all")}
        >
          <CiShoppingTag className="w-4 h-4 mr-2" /> On Discount
        </Button>
      </div>
      {items.length > 0 ? (
        <div className="grid grid-rows-1 md:grid-rows-3 lg:grid-cols-3 gap-4 w-full">
          {items.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <ItemNotFound />
      )}
    </div>
  );
};
