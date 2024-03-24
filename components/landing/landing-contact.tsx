"use client";

import { BsWindow } from "react-icons/bs";
import { Button } from "../ui/button";
import { GoLinkExternal } from "react-icons/go";
import Link from "next/link";
import { FaBug, FaGithub, FaWhatsapp } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

export const LandingContact = () => {
  return (
    <div
      className="flex flex-col md:flex-row gap-6 mt-12 md:gap-16 px-4 pt-6 pb-5 bg-muted-foreground/20"
      id="contact-us"
    >
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">See Project</p>
        <p className="text-muted-foreground">see code and project detail.</p>
        <div className="flex flex-col">
          <Button variant={"link"} className="p-0 w-fit" asChild>
            <Link href={"https://www.camprental.vercel.app"} target="_blank">
              <BsWindow className="w-4 h-4 mr-2" />
              See Live Demo <GoLinkExternal className="h-3 w-3 ml-2" />
            </Link>
          </Button>
          <Button variant={"link"} className="p-0 w-fit" asChild>
            <Link
              href={"https://www.github.com/rizkyfauziilmi/camprental"}
              target="_blank"
            >
              <FaGithub className="w-4 h-4 mr-2" />
              See Github Repository <GoLinkExternal className="h-3 w-3 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">Connect with Us</p>
        <p className="text-muted-foreground">contact use whenever you want</p>
        <div className="flex flex-col">
          <Button variant={"link"} className="p-0 w-fit" asChild>
            <Link href={"https://wa.link/bfew0j"} target="_blank">
              <FaWhatsapp className="w-4 h-4 mr-2" />
              +62 89627030604
            </Link>
          </Button>
          <Button variant={"link"} className="p-0 w-fit" asChild>
            <Link href={"mailto:rizkyfauziilmi@gmail.com"} target="_blank">
              <CiMail className="w-4 h-4 mr-2" />
              rizkyfauziilmi@gmail.com
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">Sees some Issues</p>
        <p className="text-muted-foreground">report any issues or feedback.</p>
        <div className="flex flex-col">
          <Button variant={"link"} className="p-0 w-fit" asChild>
            <Link
              href={"https://github.com/RizkyFauziIlmi/camprental/issues"}
              target="_blank"
            >
              <FaBug className="w-4 h-4 mr-2" />
              Issues or Feedback
              <GoLinkExternal className="h-3 w-3 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
