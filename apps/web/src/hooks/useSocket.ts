import { config } from "@/config";
import { useEffect, useRef, useState } from "react";

export function useSocket(roomId: number, token?: string) {
  const [loading, setLoading] = useState(true);
  const socket = useRef<WebSocket | null>(null);
  
  useEffect(() => {
    if (typeof config.wsServerUrl !== "string") return;

    // pass the accessToken to query params in the url
    socket.current = new WebSocket(`${config.wsServerUrl}?accessToken=${token}&transport=websocket`);

    socket.current.onopen = () => {
      setLoading(false);
      console.log("WebSocket connection opened");
      socket.current?.send(JSON.stringify({
        type: "join-room",
        roomId
      }))
    }

    socket.current.onclose = (ev) => {
      console.log("WebSocket connection closed", ev);
    }

    socket.current.onerror = (err) => {
      console.log("WebSocket connection error", err);
    }

    return () => {
      socket.current?.close();
    }
    
  }, [])

  return {
    loading,
    socket,
  }
}