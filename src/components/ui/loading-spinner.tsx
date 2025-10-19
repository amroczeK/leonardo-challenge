import React from "react";
import { Spinner } from "./spinner";

export default function LoadingSpinner({
  label = "Loading...",
}: {
  label?: string;
}) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-8" />
        <p className="text-muted-foreground text-sm">{label}</p>
      </div>
    </div>
  );
}
