"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { MainNavbar } from "./_components/main-navbar";
import { useEffect } from "react";
import { CartItem, useCartStore } from "@/hooks/use-cart";
import { useReadLocalStorage } from "usehooks-ts";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setItems } = useCartStore();
  const cartStorage = useReadLocalStorage<{
    items: CartItem[];
  }>("cart-storage");

  useEffect(() => {
    setItems(cartStorage?.items ?? []);
  }, [cartStorage, setItems]);

  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
}
