import { MaterialIcon } from "@/components/ui/material-icon";

export type RatingProps = {
  value: number;
};

export function Rating({ value }: RatingProps) {
  const formatted = Number.isInteger(value) ? value.toFixed(1) : String(value);

  return (
    <span aria-label={`${formatted} out of 5 stars`} className="bs-rating" role="img">
      <MaterialIcon height={24} name="star" width={24} />
      <span aria-hidden="true">{formatted}</span>
    </span>
  );
}
