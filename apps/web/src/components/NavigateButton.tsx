"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
  route: string;
  className?: string;
}

export const NavigateButton = ({ route, children, type = "button", className}: ButtonProps) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(route)}
      type={type}
      className={`cursor-pointer ${className ?? ""}`}
    >
      {children}
    </button>
  );
};
