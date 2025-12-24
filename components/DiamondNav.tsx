"use client";

export function DiamondButton({
  label,
  onClick,
  variant = "white",
}: {
  label: string;
  onClick: () => void;
  variant?: "white" | "black";
}) {
  return (
    <button type="button" onClick={onClick} className={`diamond-btn ${variant}`}>
      <span>{label}</span>
    </button>
  );
}

