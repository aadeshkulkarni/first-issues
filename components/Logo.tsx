import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <p className="text-2xl font-bold italic hover:cursor-pointer tracking-wide">
          GoodFirstIssues.
        </p>
      </Link>
    </div>
  );
};

export default Logo;
