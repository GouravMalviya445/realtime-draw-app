import { apiClient } from "@/lib/apiClient";

type Shape = {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
} | {
  type: "circle";
  centerX: number;
  centerY: number;
  radius: number;
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#242424";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const existingShapes: (Shape[] | null) = await getExistingShapes(roomId);
  clearCanvas(existingShapes as Shape[], ctx, canvas);


  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === "chat") {
        const parsedMessage = JSON.parse(message.message);
        existingShapes?.push(parsedMessage);
        if (existingShapes) {
          clearCanvas(existingShapes, ctx, canvas);
        }
      }
    } catch (err) {
      
    }
  }
    
  let clicked = false;
  let startX = 0;
  let startY = 0;

  // handle mouse down
  function handleMouseDown(e: MouseEvent) {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
    console.log(e.clientX, e.clientY);
  }

  // handle mouse up
  function handleMouseUp(e: MouseEvent) {
    clicked = false;
    console.log(e.clientX, e.clientY);
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    
    const shape: Shape = {
      type: "rectangle",
      x: startX,
      y: startY,
      width,
      height
    }
    existingShapes && existingShapes.push(shape);

    try {
      const message = JSON.stringify({
        type: "chat",
        roomId,
        message: JSON.stringify(shape)
      })
      socket.send(message);  
    } catch (err) {
      console.log("Error while sending shape", err);      
    }

  }

  // handle mouse move
  function handleMouseMove(e: MouseEvent) {
    if (clicked) {
      console.log(e.clientX, e.clientY);
      const height = e.clientY - startY;
      const width = e.clientX - startX;
      if (!ctx) return;
      
 
      if (existingShapes) {
        clearCanvas(existingShapes, ctx, canvas)
      }
      ctx.strokeStyle = "white"
      ctx?.strokeRect(startX, startY, width, height);
    }
  }
  
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
  }
}

function clearCanvas(existingShapes: Shape[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  ctx.fillStyle = "#242424";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === "rectangle") {
      ctx.strokeStyle = "white";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  })
}

async function getExistingShapes(roomId: number): (Promise<Shape[] | null>) {
  try {
    const res = await apiClient(`/rooms/chat/${roomId}`);
    if (res.data.success) {
      const chats = res.data.data.chats.map((chat: any) => JSON.parse(chat.message));
      return chats;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error in getting existing shapes", err);
    return null;
  }
}