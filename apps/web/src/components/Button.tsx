"use client";

import { ButtonHTMLAttributes, HTMLProps, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "light" | "dark" | "link" | "simple";
  size?: "sm" | "md" | "lg" | "default";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void
}

const variants = {
  "primary": "bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:ring-blue-300",
  "secondary": "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 rounded-md focus:ring-gray-300",
  "danger": "bg-red-500 hover:bg-red-600 text-white rounded-md focus:ring-red-300",
  "success": "bg-green-500 hover:bg-green-600 text-white rounded-md focus:ring-green-300",
  "warning": "bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-md focus:ring-yellow-300",
  "light": "bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md focus:ring-gray-300",
  "dark": "bg-gray-800 hover:bg-gray-900 text-white rounded-md focus:ring-gray-700",
  "link": "text-blue-500 hover:text-blue-600 hover:underline focus:outline-none",
  "simple": "hover:underline focus:outline-none"
};

const defaultClasses = "font-semibold cursor-pointer focus:outline-none focus:ring focus:ring-opacity-50 transition-all ease-in flex items-center justify-center gap-2";

const sizes = {
  "sm": "px-2 py-1",
  "md": "px-4 py-2 text-md",
  "lg": "px-6 py-4 text-lg",
  "default": "px-1 py-1"
}

export const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "default",
  startIcon,
  endIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${defaultClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {startIcon && startIcon} {/* if user sends any icon at start */}
      {children}
      {endIcon && endIcon} {/* if user sends any icon at end */}
    </button>
  );
};
