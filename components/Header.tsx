import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-slate-200">
      <div className="py-6 md:py-8 max-w-4xl px-4 lg:px-0 mx-auto flex flex-col md:flex-row items-center justify-between">
        <Logo />
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-center">
            <li>
              <Link href="/about">
                <p className="text-md md:text-lg hover:underline font-medium cursor-pointer">
                  About
                </p>
              </Link>
            </li>
            <li>
              <Link href="/contributors">
                <p className="text-md md:text-lg hover:underline font-medium cursor-pointer">
                  Contributors
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
