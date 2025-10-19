import React from "react";

type MainContainerProps = {
  children: React.ReactNode;
};

function MainContainer({ children }: MainContainerProps) {
  return <main className="container-layout">{children}</main>;
}

export default MainContainer;
