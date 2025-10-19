import { Field, FieldLabel } from "@/components/ui/field";
import React from "react";

export default function ProfileFieldInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {value}
      </p>
    </Field>
  );
}
