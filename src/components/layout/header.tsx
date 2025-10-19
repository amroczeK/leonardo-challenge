import React from "react";
import NavigationBar from "./navigation-bar";
import { ModeToggle } from "../ui/mode-toggle";

function Header() {
  return (
    <header className="container-layout py-4 flex justify-between items-center">
      <NavigationBar />
      <ModeToggle />
    </header>
  );
}

export default Header;
