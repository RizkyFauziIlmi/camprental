"use client";

import Image from "next/image";
import bannerImage from "@/public/banner.png";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const LandingBanner = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col-reverse gap-4 py-10 md:py-0 md:gap-0 md:flex-row items-center justify-between md:h-screen">
      <div className="space-y-6 md:w-1/2">
        <h1 className="scroll-m-20 text-3xl text-muted-foreground font-extrabold tracking-tight lg:text-5xl">
          Camprental
        </h1>
        <blockquote className="border-l-2 pl-6 italic">
          &quot;Enhance Your Camping Experience with Our Trusted Rental
          Services: Find Quality Gear, Get Comprehensive Guidance, and Start
          Your Adventure with Confidence and Unlimited Comfort!&quot;
        </blockquote>
        <Button
          onClick={() => router.push("/explore")}
          variant={"ghost"}
          size={"lg"}
          className="bg-muted-foreground/80 text-white hover:bg-muted-foreground hover:text-white uppercase font-bold py-5"
        >
          Get Started
        </Button>
      </div>
      <Image
        src={bannerImage}
        alt="banner image"
        className="md:w-1/2 object-contain"
        priority
      />
    </div>
  );
};
