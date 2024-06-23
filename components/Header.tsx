import React from "react";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Bad_Script } from "next/font/google";
import { cn } from "@/lib/utils";

const badScript = Bad_Script({ weight: "400", subsets: ["latin"] });

const Header = () => {
  return (
    <header className="shadow-sm">
      <div className="py-6 max-w-5xl px-4 lg:px-0 mx-auto flex flex-row items-center justify-between">
        <h1 className={cn("text-2xl font-bold tracking-wide", badScript.className)}>
          FirstIssues.dev
        </h1>
        <ModeToggle />
      </div>
    </header>
  );
};

const LinkButton = ({ label, url }: { label: string; url: string }) => (
  <Link href={url}>
    <p className="text-md md:text-lg hover:underline cursor-pointer">{label}</p>
  </Link>
);

export default Header;
