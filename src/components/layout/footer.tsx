"use client";

import { useUserProfile } from "@/features/profile/context/profile-context";
import React from "react";

function Footer() {
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return null;
  }

  return (
    <footer className="container-layout py-4">
      <div className="flex justify-between items-center">
        <p>Version 3.5</p>
        <p>© 2025 Leonardo Challenge. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
