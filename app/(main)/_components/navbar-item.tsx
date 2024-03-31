"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavbarItemProps {
  isMobile?: boolean;
}

export const NavbarItem = ({ isMobile = false }: NavbarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";
  const isExplore = pathname === "/explore";
  const isGuide = pathname === "/guide";

  return (
    <div className={cn(isMobile ? "flex-col mt-4" : "flex-row", "flex gap-2")}>
      <Button
        variant={isMobile ? "ghost" : "link"}
        className={cn(
          isHome ? "text-primary" : "text-muted-foreground",
          isHome && isMobile ? "bg-accent" : "",
          "font-semibold hover:no-underline hover:text-primary"
        )}
      >
        Blog
      </Button>
      <Button
        variant={isMobile ? "ghost" : "link"}
        onClick={() => router.push("/explore")}
        className={cn(
          isExplore ? "text-primary" : "text-muted-foreground",
          isExplore && isMobile ? "bg-accent" : "",
          "font-semibold hover:no-underline hover:text-primary"
        )}
      >
        Explore
      </Button>
      <Button
        variant={isMobile ? "ghost" : "link"}
        className={cn(
          isGuide ? "text-primary" : "text-muted-foreground",
          isGuide && isMobile ? "bg-accent" : "",
          "font-semibold hover:no-underline hover:text-primary"
        )}
      >
        Guide
      </Button>
    </div>
  );
};
