import Image from "next/image";

import LoginImageSrc from "@/public/explore-banner.jpg";
import { LoginCard } from "../_components/login-card";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Select a provider to login into your account
            </p>
          </div>  
          <LoginCard />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={LoginImageSrc}
          alt="Banner"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
