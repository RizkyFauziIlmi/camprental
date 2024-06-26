"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { toast } from "sonner"
import { IoIosConstruct } from "react-icons/io";

interface NavbarItemProps {
  isMobile?: boolean;
}

export const NavbarItem = ({ isMobile = false }: NavbarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const role = useCurrentRole();

  const isHome = pathname === "/";
  const isExplore = pathname === "/explore";
  const isGuide = pathname === "/guide";
  const isBooking = pathname === "/bookings";

  return (
    <div className={cn(isMobile ? "flex-col mt-4" : "flex-row", "flex gap-2")}>
      <Button
        variant={isMobile ? "ghost" : "link"}
        className={cn(
          isHome ? "text-primary" : "text-muted-foreground",
          isHome && isMobile ? "bg-accent" : "",
          "font-semibold hover:no-underline hover:text-primary"
        )}
        onClick={() => toast("This feature under development", {
          icon: <IoIosConstruct className="h-4 w-4" />,
        })}
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
        onClick={() => toast("This feature under development", {
          icon: <IoIosConstruct className="h-4 w-4" />,
        })}
      >
        Guide
      </Button>
      {role === "USER" && (
        <Button
          variant={isMobile ? "ghost" : "link"}
          onClick={() => router.push("/bookings")}
          className={cn(
            isBooking ? "text-primary" : "text-muted-foreground",
            isBooking && isMobile ? "bg-accent" : "",
            "font-semibold hover:no-underline hover:text-primary"
          )}
        >
          Bookings
        </Button>
      )}
    </div>
  );
};
