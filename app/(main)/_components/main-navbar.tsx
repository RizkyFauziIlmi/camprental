"use client";

import { Button } from "@/components/ui/button";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import { UserButton } from "./user-button";
import { User } from "next-auth";
import { NavbarItem } from "./navbar-item";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import logoImage from "@/public/logo.png";

export const MainNavbar = ({ user }: { user: User | null | undefined }) => {
  return (
    <div className="flex justify-center sticky top-0 z-50">
      <nav className="w-11/12 flex items-center bg-background justify-between shadow-lg p-2 rounded-b-lg">
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
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <PiShoppingCartLight className="w-4 h-4" />
          </Button>
          <UserButton user={user} />
        </div>
      </nav>
    </div>
  );
};
