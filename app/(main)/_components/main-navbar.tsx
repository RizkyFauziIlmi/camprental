"use client";

import { Button } from "@/components/ui/button";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import { UserButton } from "./user-button";
import { User } from "next-auth";
import { NavbarItem } from "./navbar-item";
import Image from "next/image";
import logoImage from "@/public/logo.png";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/hooks/use-cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartDetails } from "./cart-details";
import { ItemCartNotFound } from "./item-cart-not-found";

export const MainNavbar = () => {
  const { items, itemsCount } = useCartStore();
  const role = useCurrentRole();

  return (
    <div className="flex justify-center sticky top-0 z-50">
      <nav className="w-11/12 flex items-center bg-background dark:border justify-between shadow-lg p-2 rounded-b-lg">
        <Image
          src={logoImage}
          alt="logo"
          className="hidden md:block"
          width={80}
          height={80}
        />
        <div className="hidden md:block">
          <NavbarItem />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              className="flex md:hidden"
            >
              <CiMenuBurger className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <NavbarItem isMobile />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-4">
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <CiSearch className="w-4 h-4" />
          </Button>
          {role !== "ADMIN" && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full relative"
                >
                  <PiShoppingCartLight className="w-4 h-4" />
                  {itemsCount > 0 && (
                    <Badge
                      variant={"destructive"}
                      className="absolute -top-2 -right-2 rounded-full h-5 w-5 items-center justify-center text-xs"
                    >
                      {itemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                className="overflow-auto w-full md:w-fit"
                side={"right"}
              >
                <SheetHeader>
                  <SheetTitle>Checkout Your Order</SheetTitle>
                  <SheetDescription>
                    Complete payment to rent items.
                  </SheetDescription>
                </SheetHeader>
                {itemsCount > 0 ? (
                  <>
                    <CartDetails items={items} />
                  </>
                ) : (
                  <ItemCartNotFound />
                )}
              </SheetContent>
            </Sheet>
          )}
          <UserButton />
        </div>
      </nav>
    </div>
  );
};
