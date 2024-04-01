import { MainNavbar } from "./_components/main-navbar";
import { currentUser } from "@/lib/auth";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  return (
    <div>
      <MainNavbar user={user} />
      {children}
    </div>
  );
}
