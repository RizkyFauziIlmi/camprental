"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { CartItem, useCartStore } from "@/hooks/use-cart";
import { convertFloatToIDR } from "@/lib/string";
import { addDays, differenceInDays, format, formatDate } from "date-fns";
import { useEffect, useState } from "react";
import { BsCopy } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { init } from "@paralleldrive/cuid2";
import Image from "next/image";
import { GoTrash } from "react-icons/go";

interface CartDetailsProps {
  items: CartItem[];
}

export const CartDetails = ({ items }: CartDetailsProps) => {
  const { clearCart, deleteItem } = useCartStore();

  const createId = init({
    // A custom random function with the same API as Math.random.
    random: Math.random,
    // the length of the id
    length: 7,
    // A custom fingerprint for the host environment. This is used to help
    // prevent collisions when generating ids in a distributed system.
    fingerprint: "booking-fingerprint",
  });

  const user = useCurrentUser();
  const [orderId, setOrderId] = useState(createId());

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOrderId(createId());
    }, 60000); // 60000 milidetik = 1 menit

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, [createId]);

  const daysDifference = differenceInDays(date?.to as Date, date?.from as Date);

  const maxBookingDays = items.sort((a, b) => a.maxDate - b.maxDate)[0].maxDate;

  const maxBookingDate = addDays(new Date(), maxBookingDays);

  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const subTotalDate = subTotal * daysDifference;

  const fee = 2_000;
  const total = subTotalDate + fee;

  const isDisabledCheckout = !date?.from || !date?.to || daysDifference === 0;

  return (
    <div className="py-4 space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            disabled={(date) =>
              addDays(date, 1) < new Date() ||
              addDays(date, -1) > maxBookingDate
            }
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Order ID: {orderId}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <BsCopy className="h-3 w-3" />
                <span className="sr-only">Copy Order ID</span>
              </Button>
            </CardTitle>
            <CardDescription>
              You will rent items in {daysDifference} days
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <IoMdMore className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setOrderId(createId())}>
                  Generate Order ID
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={clearCart}>
                  Clear Cart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Order Details</div>
            <ul className="grid gap-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 justify-between"
                >
                  <div className="flex items-center gap-1">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <span className="text-muted-foreground">
                      {item.name} x <span>{item.count}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{convertFloatToIDR(item.price * item.count)}</span>
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => deleteItem(item.id)}
                    >
                      <GoTrash className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal per day</span>
                <span>{convertFloatToIDR(subTotal)}/day</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{convertFloatToIDR(subTotalDate)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Application Fee</span>
                <span>{convertFloatToIDR(fee)}</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>{convertFloatToIDR(total)}</span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <div className="font-semibold">Pickup Information</div>
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>Rizky Fauzi Ilmi</span>
                <span>Bandung, Jawa Barat 40125.</span>
                <span>Jl. Cikutra No.204A</span>
              </address>
            </div>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold">Billing Information</div>
              <div className="text-muted-foreground">
                Application fee for managing demand and financing application
                infrastructure.
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Customer Information</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Customer</dt>
                <dd>{user?.name}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${user?.email}`}>{user?.email}</a>
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            You must return the items by{" "}
            <time dateTime="2023-11-23">
              {date?.to !== undefined
                ? formatDate(date?.to as Date, "MMMM dd, yyyy")
                : "(select date first!)"}
            </time>
          </div>
        </CardFooter>
      </Card>
      <Button
        className="mt-2 w-full"
        disabled={isDisabledCheckout}
      >
        {isDisabledCheckout ? "Invalid Date" : "Checkout"}
      </Button>
    </div>
  );
};
