import { cn } from "@/lib/utils";
import React from "react";

const Button = ({
  children,
  className,
  onClick,
  type,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: any;
  disabled?: boolean;
  type: "submit" | "reset" | "button" | undefined;
}) => {
  return (
    <button
      className={cn(
        `px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer text-base outline-none transition-colors duration-200 hover:bg-black`,
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
