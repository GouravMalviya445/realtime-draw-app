"use client";

import { Canvas } from "./Canvas";
import { useSocket } from "@/hooks/useSocket";

export default function RoomCanvas({ roomId, token }: { roomId: number;  token: string}) {
  const { loading, socket } = useSocket(roomId, token);

  if (loading) {
    return (
      <div className="text-blue-400 grid h-screen w-screen place-content-center">creating websocket connection...</div>
    )
  }

  if (!socket.current) {
    return (
      <div className="text-red-500 grid h-screen w-screen place-content-center">WebSocket connection failed</div>
    )
  }
  
  return (
    <Canvas roomId={roomId} socket={socket.current} />
  )
}