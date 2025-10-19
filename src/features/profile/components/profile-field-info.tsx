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
      <p className="text-sm leading-none">
        {value}
      </p>
    </Field>
  );
}
