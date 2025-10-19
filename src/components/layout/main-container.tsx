import React from "react";

type MainContainerProps = {
  children: React.ReactNode;
};

function MainContainer({ children }: MainContainerProps) {
  return <main className="container mx-auto max-w-7xl">{children}</main>;
}

export default MainContainer;
