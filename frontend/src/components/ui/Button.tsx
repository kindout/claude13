import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export function Button({ isLoading, disabled, children, ...rest }: Props) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      style={{
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #ddd",
        background: isDisabled ? "#f3f3f3" : "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      {isLoading ? "..." : children}
    </button>
  );
}
