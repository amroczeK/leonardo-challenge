import React from "react";

type MainContainerProps = {
  children: React.ReactNode;
};

function MainContainer({ children }: MainContainerProps) {
  return <main className="container-layout flex-1">{children}</main>;
}

export default MainContainer;
