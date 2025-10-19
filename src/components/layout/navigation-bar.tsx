"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavigationBar() {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          <NavLink href="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground active:bg-accent/90 ${
        isActive ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      {children}
    </Link>
  );
}
