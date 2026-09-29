import type { ChangeEventHandler } from "react";

import { MaterialIcon, type MaterialIconName } from "@/components/ui/material-icon";

export type CourseFilterOption = Readonly<{
  label: string;
  value: string;
}>;

export type CourseFilterSelectProps = {
  ariaLabel: string;
  icon: Extract<MaterialIconName, "category" | "level" | "sort">;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: readonly CourseFilterOption[];
  value: string;
};

export function CourseFilterSelect({
  ariaLabel,
  icon,
  onChange,
  options,
  value,
}: CourseFilterSelectProps) {
  return (
    <label className="bs-discovery-select">
      <MaterialIcon height={24} name={icon} width={24} />
      <span className="sr-only">{ariaLabel}</span>
      <select aria-label={ariaLabel} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
