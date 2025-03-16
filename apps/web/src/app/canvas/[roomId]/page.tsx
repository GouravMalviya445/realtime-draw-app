"use client";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState} from "react"

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { 
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;

      if (!ctx) return;
      
      initDraw(ctx, canvas);
    }
  }, [canvasRef.current]);
  
  return (
    <canvas ref={canvasRef} ></canvas>
  )
}