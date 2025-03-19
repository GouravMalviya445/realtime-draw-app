"use client";
import { ShapeBar, ShapeBarIcon } from "@/components/Shapbar";
import { Draw } from "@/draw/draw";
import { Tool } from "@/draw/types"
import { Circle, Minus, MoveRight, PencilLine, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Canvas({ roomId, socket }: { roomId: number, socket: WebSocket }) {
  const [selectedTool, setSelectedTool] = useState<Tool>("none");
  const [draw, setDraw] = useState<Draw>();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { 
    if (selectedTool === "none") return;
    draw?.setTool(selectedTool);
    draw?.init();
    draw?.initSocketHandlers();
    draw?.initMouseHandlers();
  }, [selectedTool, draw])

  useEffect(() => { 
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const d = new Draw(canvas, roomId, socket);
      setDraw(d);
    }
  }, [canvasRef.current]);  

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <canvas width={window.innerWidth} height={window.innerHeight}  ref={canvasRef} ></canvas>
      <ShapeBar>
        <ShapeBarIcon
          isActive={selectedTool === "circle"}
          onClick={() => {
            setSelectedTool("circle");
          }}
          shape={<Circle size={18} />}
        />
        <ShapeBarIcon
          isActive={selectedTool === "rectangle"}
          onClick={() => {
            setSelectedTool("rectangle");
          }}
          shape={<Square size={18} />}
        />
        <ShapeBarIcon
          isActive={selectedTool === "line"}
          onClick={() => {
            setSelectedTool("line");
          }}
          shape={<Minus size={18} />}
        />
        <ShapeBarIcon
          isActive={selectedTool === "arrow"}
          onClick={() => {
            setSelectedTool("arrow");
          }}
          shape={<MoveRight size={18} />}
        />
        <ShapeBarIcon
          isActive={selectedTool === "pencil"}
          onClick={() => {
            setSelectedTool("pencil");
          }}
          shape={<PencilLine size={18} />}
        />
      </ShapeBar>

      {/* <Button onClick={() => {
        socket.send(JSON.stringify({
          type: "leave-room",
          roomId
        }));
        
      }} className="absolute top-10 right-5" variant="danger">Exit Room</Button> */}
    </div>
  )
}