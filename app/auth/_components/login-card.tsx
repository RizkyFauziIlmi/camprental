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
    <div className="flex flex-col gap-4">
      <Button onClick={() => login("google")}>
        Login with Google <FaGoogle className="w-4 h-4 ml-2" />
      </Button>
      <Button onClick={() => login("github")}>
        Login with Github <FaGithub className="w-4 h-4 ml-2" />
      </Button>
      <Button onClick={() => login("discord")}>
        Login with Discord <FaDiscord className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
