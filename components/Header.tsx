import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="py-6 max-w-4xl px-4 lg:px-0 mx-auto flex flex-col md:flex-row items-center justify-between">
        <Logo />
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-center">
            <li>
              <LinkButton label="About" url="/about" />
            </li>
            <li>
              <LinkButton label="Contributors" url="/contributors" />
            </li>
          </ul>
        </nav>
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
