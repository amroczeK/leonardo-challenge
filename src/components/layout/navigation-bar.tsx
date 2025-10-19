import Link from "next/link";
import React from "react";

export default function NavigationBar() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
