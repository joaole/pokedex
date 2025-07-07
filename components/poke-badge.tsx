interface BadgeProps {
  type: string;
}

export function Badge({ type }: BadgeProps) {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold text-white rounded type-${type.toLowerCase()}`}
    >
      {type}
    </span>
  );
}
