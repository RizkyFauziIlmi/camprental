"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  const logout = async () => {
    await signOut();
  };

  return <Button onClick={logout}>logout</Button>;
};
