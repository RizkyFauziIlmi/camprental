"use client";

import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { cn } from "@/lib/utils";
import useScroll from "@/hooks/use-scroll";

interface LandingNavbarProps {
  isMobile?: boolean;
}

export const LandingNavbar = ({ isMobile = false }: LandingNavbarProps) => {
  const { scrollTo } = useScroll();

  return (
    <div
      className={cn(
        isMobile
          ? "flex flex-col items-start pt-4 md:hidden"
          : "hidden md:flex items-center",
        " gap-4"
      )}
    >
      {isMobile && <ModeToggle />}
      <Button
        variant={"link"}
        className="uppercase font-light"
        onClick={() => scrollTo("")}
      >
        HOME
      </Button>
      <Button
        variant={"link"}
        className="uppercase font-light"
        onClick={() => scrollTo("features")}
      >
        FEATURES
      </Button>
      <Button
        variant={"link"}
        className="uppercase font-light"
        onClick={() => scrollTo("contact-us")}
      >
        CONTACT US
      </Button>
      {!isMobile && <ModeToggle />}
    </div>
  );
};
