"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa6";
import { ModeToggle } from "@/components/mode-toggle";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";

export const LoginCard = () => {
  const router = useRouter();

  const login = async (provider: "github" | "google" | "discord") => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="space-y-4 rounded-md shadow-lg p-4 border-[1px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="group"
            onClick={() => router.push("/")}
          >
            <MdArrowBack className="w-4 h-4 group-hover:-translate-x-1 group-hover:scale-105 transition-all ease-in-out" />
          </Button>
          <Image src={logo} alt="logo" width={80} height={80} priority />
        </div>
        <ModeToggle />
      </div>
      <div className="space-y-2">
        <div className="text-lg font-semibold">Login to Camprental</div>
        <p className="text-sm text-muted-foreground">
          &quot;Navigate Nature with Confidence: Your Ultimate Camping
          Companion&quot;
        </p>
      </div>
      <div className="space-y-2 mt-2">
        <Button
          variant={"outline"}
          className="w-full rounded-md"
          size={"lg"}
          onClick={() => login("google")}
        >
          <FaGoogle className="w-4 h-4 mr-2" />
          Continue with Google
        </Button>
        <Button
          variant={"outline"}
          className="w-full rounded-md"
          size={"lg"}
          onClick={() => login("github")}
        >
          <FaGithub className="w-4 h-4 mr-2" />
          Continue with Github
        </Button>
        <Button
          variant={"outline"}
          className="w-full rounded-md"
          size={"lg"}
          onClick={() => login("discord")}
        >
          <FaDiscord className="w-4 h-4 mr-2" />
          Continue with Discord
        </Button>
      </div>
    </div>
  );
};
