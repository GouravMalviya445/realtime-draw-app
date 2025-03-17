"use client";
import { Button } from "./Button"

export function ShapeBar({ children, className = "" }: {children: React.ReactNode, className?: string}) {

  return (
    <div className={`flex bg-cyan-300/40 rounded-lg px-3 py-1.5 items-center justify-center space-x-2 absolute top-14 left-1/2 -translate-1/2 ${className}`}>
      {children}
    </div>
  )  
}


export function ShapeBarIcon({ shape, shortcut, onClick }: { shape: React.ReactNode, shortcut?: number, onClick?: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Button onClick={onClick} className="text-white hover:bg-cyan-200/40 rounded-lg px-2 py-2 " variant="simple">
        {shape}
      </Button>
      {shortcut && <span className="text-[13px] leading-2 text-black">{shortcut}</span>}
    </div>
  )  
}