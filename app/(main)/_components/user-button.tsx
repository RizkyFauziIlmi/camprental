"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertUsernameToAvatarFallback } from "@/lib/string";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";
import { useTheme } from "next-themes";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBoxSeamFill } from "react-icons/bs";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useRouter } from "next/navigation";

export const UserButton = ({ user }: { user: User | null | undefined }) => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const role = useCurrentRole();

  const logout = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-9 w-9">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>
            {convertUsernameToAvatarFallback(user?.name ?? "")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {role === "ADMIN" && (
          <>
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <MdOutlineSpaceDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push("/manage-item")}>
                <BsBoxSeamFill className="w-4 h-4 mr-2" />
                Manage Item
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IoIosColorPalette className="w-4 h-4 mr-2" /> Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuItem
          onSelect={logout}
          className="bg-destructive/90 text-white focus:bg-destructive focus:text-white"
        >
          <CiLogout className="w-4 h-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
