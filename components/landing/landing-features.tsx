"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { LuCable } from "react-icons/lu";
import { Button } from "../ui/button";
import { GoArrowUpRight } from "react-icons/go";
import { FaBoxesPacking } from "react-icons/fa6";
import { GiSecretBook } from "react-icons/gi";

export const LandingFeatures = () => {
  const [features, setFeatures] = useState<"integrate" | "bundle" | "guide">(
    "integrate"
  );

  return (
    <div
      className="flex flex-col-reverse md:flex-row gap-4 h-screen items-center justify-center pt-12"
      id="features"
    >
      <div className="space-y-4 md:w-1/2 md:h-96 overflow-auto">
        <div
          className="flex rounded-lg shadow-lg h-fit md:h-1/2 cursor-pointer group"
          onClick={() => setFeatures("integrate")}
        >
          <div
            className={cn(
              features === "integrate"
                ? "bg-muted-foreground/30"
                : "bg-muted-foreground/20",
              "w-1/4 md:w-2/12 rounded-l-lg flex flex-col justify-center items-center gap-4 p-6 transition-colors"
            )}
          >
            <LuCable className="w-6 h-6" />
            <p className="text-xs text-center flex flex-col text-muted-foreground">
              Integrate{" "}
              <span
                className={cn(
                  features === "integrate" && "text-primary",
                  "text-base font-bold"
                )}
              >
                Booking
              </span>
            </p>
          </div>
          <div className="p-6 space-y-4 w-3/4 md:w-10/12">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                Booking and Checkout system
              </div>
              <Button
                size={"icon"}
                variant={"outline"}
                className={cn(
                  features === "integrate" ? "opacity-100" : "opacity-0",
                  "rounded-full group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                )}
              >
                <GoArrowUpRight
                  className={cn(
                    features === "integrate" && "-rotate-45 md:rotate-45",
                    "w-4 h-4 transition-all duration-300 ease-in-out"
                  )}
                />
              </Button>
            </div>
            <p className="leading-7 text-sm line-clamp-3">
              Ease of Booking and Payment Available at Your Fingertips! Our app
              is fully integrated with the web platform, allowing you to easily
              order your favorite camping gear without ever leaving the comfort
              of your device.
            </p>
          </div>
        </div>
        <div
          className="flex rounded-lg shadow-lg h-fit md:h-1/2 cursor-pointer group"
          onClick={() => setFeatures("bundle")}
        >
          <div
            className={cn(
              features === "bundle"
                ? "bg-muted-foreground/30"
                : "bg-muted-foreground/20",
              "w-1/4 md:w-2/12 rounded-l-lg flex flex-col justify-center items-center gap-4 p-6 transition-colors"
            )}
          >
            <FaBoxesPacking className="w-6 h-6" />
            <p className="text-xs text-center flex flex-col text-muted-foreground">
              Bundle{" "}
              <span
                className={cn(
                  features === "bundle" && "text-primary",
                  "text-base font-bold"
                )}
              >
                Items
              </span>
            </p>
          </div>
          <div className="p-6 space-y-4 w-3/4 md:w-10/12">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                Bundling and Packaging options
              </div>
              <Button
                size={"icon"}
                variant={"outline"}
                className={cn(
                  features === "bundle" ? "opacity-100" : "opacity-0",
                  "rounded-full group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                )}
              >
                <GoArrowUpRight
                  className={cn(
                    features === "bundle" && "-rotate-45 md:rotate-45",
                    "w-4 h-4 transition-all duration-300 ease-in-out"
                  )}
                />
              </Button>
            </div>
            <p className="leading-7 text-sm line-clamp-3">
              Don't Let Confusion Get in the Way of Your Adventure! With Bundle
              or Pack Purchase options, we have simplified the rental experience
              for you. Discover carefully curated packages that include
              everything you need for a successful camping adventure.
            </p>
          </div>
        </div>
        <div
          className="flex rounded-lg shadow-lg h-fit md:h-1/2 cursor-pointer group"
          onClick={() => setFeatures("guide")}
        >
          <div
            className={cn(
              features === "guide"
                ? "bg-muted-foreground/30"
                : "bg-muted-foreground/20",
              "w-1/4 md:w-2/12 rounded-l-lg flex flex-col justify-center items-center gap-4 p-6 transition-colors"
            )}
          >
            <GiSecretBook className="w-6 h-6" />
            <p className="text-xs text-center flex flex-col text-muted-foreground">
              guide{" "}
              <span
                className={cn(
                  features === "guide" && "text-primary",
                  "text-base font-bold"
                )}
              >
                Camping
              </span>
            </p>
          </div>
          <div className="p-6 space-y-4 w-3/4 md:w-10/12">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                Guide and Tips for Camping
              </div>
              <Button
                size={"icon"}
                variant={"outline"}
                className={cn(
                  features === "guide" ? "opacity-100" : "opacity-0",
                  "rounded-full group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                )}
              >
                <GoArrowUpRight
                  className={cn(
                    features === "guide" && "-rotate-45 md:rotate-45",
                    "w-4 h-4 transition-all duration-300 ease-in-out"
                  )}
                />
              </Button>
            </div>
            <p className="leading-7 text-sm line-clamp-3">
              Explore Nature with Confidence Thanks to Our Guides and Camping
              Tips Feature! With access to comprehensive guides and valuable
              tips, we help you plan an unforgettable camping adventure.
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full h-96 bg-muted-foreground/20 rounded-lg shadow-sm bottom-2 flex items-center justify-center">
        {features}
      </div>
    </div>
  );
};
