"use client";
import React from "react";
import NavigationBar from "./navigation-bar";
import { ModeToggle } from "../ui/mode-toggle";
import { useUserProfile } from "@/features/profile/context/profile-context";

function Header() {
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return null;
  }
  return (
    <header className="container-layout py-4 flex justify-between items-center">
      <NavigationBar />
      <ModeToggle />
    </header>
  );
}

export default Header;
