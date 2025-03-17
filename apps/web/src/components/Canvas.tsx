"use client";
import { ShapeBar, ShapeBarIcon } from "@/components/Shapbar";
import { initDraw } from "@/draw";
import { Circle, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";

export function Canvas({ roomId, socket }: { roomId: number, socket: WebSocket }) {
  const [size, _] = useState({ width: window.innerWidth, height: window.innerHeight });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { 
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      
      initDraw(canvas, roomId, socket);
    }
  }, [canvasRef.current]);  

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <canvas width={size.width} height={size.height}  ref={canvasRef} ></canvas>
      <ShapeBar>
        <ShapeBarIcon shape={<Circle size={18} />} />
        <ShapeBarIcon shape={<Square size={18} />} />
      </ShapeBar>

      <Button onClick={() => {
        socket.send(JSON.stringify({
          type: "leave-room",
          roomId
        }));
        
      }} className="absolute top-10 right-5" variant="danger">Exit Room</Button>
    </div>
  )
}