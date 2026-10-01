"use client";

import { useId, type InputHTMLAttributes } from "react";

import { MaterialIcon } from "@/components/ui/material-icon";
import { classNames } from "@/lib/class-names";

export type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export function SearchField({
  className,
  id,
  label = "Search courses",
  placeholder = "Search",
  ...props
}: SearchFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label className={classNames("bs-search-field", className)} htmlFor={inputId}>
      <span className="sr-only">{label}</span>
      <MaterialIcon height={24} name="search" width={24} />
      <input id={inputId} placeholder={placeholder} type="search" {...props} />
    </label>
  );
}
