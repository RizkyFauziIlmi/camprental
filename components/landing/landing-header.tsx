"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LandingNavbar } from "./landing-navbar";
import { CiMenuFries } from "react-icons/ci";

export const LandingHeader = () => {
  return (
    <nav className="flex items-center justify-between">
      <Image src={logo} alt="Camprental" width={100} height={100} />
      <LandingNavbar />
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <CiMenuFries className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <LandingNavbar isMobile />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
