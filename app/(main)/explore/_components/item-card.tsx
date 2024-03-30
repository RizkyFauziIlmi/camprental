"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { convertFloatToIDR } from "@/lib/string";
import { cn } from "@/lib/utils";
import { Item } from "@prisma/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  const searchParams = useSearchParams();
  const searchInput = searchParams.get("search");

  const highlightMatch = (text: string) => {
    if (!searchInput) return text;
    const regex = new RegExp(`(${searchInput})`, "gi");
    return text.split(regex).map((part, index) => {
      return regex.test(part) ? (
        <span key={index} className="bg-blue-400">
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const isAvailable = item.stock > 0 && item.available;

  return (
    <div
      className={cn(
        !isAvailable && "opacity-50 cursor-not-allowed",
        "flex flex-col gap-2 justify-start"
      )}
    >
      <div className="relative overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          className="h-52 object-contain rounded-2xl w-full"
          width={100}
          height={100}
        />
        <Badge variant="secondary" className="absolute top-3 right-2">
          {item.category}
        </Badge>
        {!isAvailable && (
          <Badge variant="destructive" className="absolute bottom-3 left-2">
            Not Available
          </Badge>
        )}
      </div>
      <div className="text-sm font-semibold">{highlightMatch(item.name)}</div>
      <p className="text-xs text-muted-foreground py-1">
        {convertFloatToIDR(item.price)}/day
      </p>
      <div className="flex gap-1">
        <Button
          variant={"outline"}
          className="rounded-full w-1/2"
          size={"sm"}
          disabled={!isAvailable}
        >
          Add to Cart
        </Button>
        <Button
          className="rounded-full w-1/2"
          size={"sm"}
          disabled={!isAvailable}
        >
          Rent Now
        </Button>
      </div>
    </div>
  );
};
