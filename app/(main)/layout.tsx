import { useCurrentUser } from "@/hooks/use-current-user";
import { MainNavbar } from "./_components/main-navbar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await useCurrentUser();
  return (
    <div>
      <MainNavbar user={user} />
      {children}
    </div>
  );
}
