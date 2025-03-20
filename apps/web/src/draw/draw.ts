import { ContrastIcon } from "lucide-react";
import { getExistingShapes } from "./httpRequest";
import type {Tool, Shape, Point} from "./types";


class Draw {

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D
  private roomId: number;
  private socket: WebSocket;
  private existingShapes: Shape[];
  private clicked: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private selectedShape: Tool = "none";
  private pencilPath: Point[] = [];

  constructor(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = socket;
    this.existingShapes = [];


    this.ctx.fillStyle = "#121212";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.init();
    this.initSocketHandlers();
    this.initMouseHandlers();
  }

  setTool(tool: Tool) {
    this.selectedShape = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initSocketHandlers() {
    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "chat") {
          const parsedMessage = JSON.parse(message.message);
          this.existingShapes?.push(parsedMessage);
          this.clearCanvas();
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  // Mouse Down
  handleMouseDown = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  }

  // Mouse Up
  handleMouseUp = (e: MouseEvent) => { 
    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;



    let shape: Shape | undefined;
    console.log("shape:", this.selectedShape);
    if (this.selectedShape === "rectangle") {
      shape = {
        type: "rectangle",
        x: this.startX,
        y: this.startY,
        width,
        height
      }
    } else if (this.selectedShape === "circle") {
      shape = {
        type: "circle",
        centerX: (width / 2) + this.startX,
        centerY: (height / 2) + this.startY,
        radius: Math.max(height, width) / 2
      }
    } else if (this.selectedShape === "line") {
      shape = {
        type: "line",
        startX: this.startX,
        startY: this.startY,
        endX: e.clientX,
        endY: e.clientY
      }
    } else if (this.selectedShape === "pencil") {
      shape = {
        type: "pencil",
        path: this.pencilPath
      }

      // make sure you clear the old paths otherwise drawing will be start where you last left off
      this.pencilPath = [];
    }

    // console.log(shape)

    if (!shape) return;
    this.existingShapes.push(shape);


    try {
      const parsedMessage = JSON.stringify({
        type: "chat",
        roomId: this.roomId,
        message: JSON.stringify(shape)
      })
      this.socket.send(parsedMessage);
    } catch (err) {
      console.log("Error while sending shape: ", err);
    }

  }

  // Mouse Move
  handleMouseMove = (e: MouseEvent) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;

      this.ctx.strokeStyle = "#E0E0E0";

      this.clearCanvas();

      if (this.selectedShape === "rectangle") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (this.selectedShape === "circle") {
        const centerX = (width / 2) + this.startX;
        const centerY = (height / 2) + this.startY;
        const radius = Math.abs(Math.max(height, width) / 2);
        console.log(radius)
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (this.selectedShape === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(e.clientX, e.clientY);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (this.selectedShape === "pencil") {
        const newPath = { x: e.offsetX, y: e.offsetY };
        this.pencilPath.push(newPath);
        this.drawPencil(this.pencilPath);
      }
    }
  }

  // Draw Pencil
  drawPencil(points: Point[]) {
    if (points.length === 0) return;
        
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#E0E0E0";
    if (points.length > 0) {
      this.ctx.moveTo(points?.[0]?.x as number, points?.[0]?.y as number);
      points.map(point => {
        this.ctx.lineTo(point.x, point.y);
      })
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }

  // init mouse handlers
  initMouseHandlers() {
    if (this.selectedShape === "none") return;

    this.canvas.addEventListener("mousedown", this.handleMouseDown);

    this.canvas.addEventListener("mouseup", this.handleMouseUp);

    this.canvas.addEventListener("mousemove", this.handleMouseMove);
  }
  
  // destroy event handlers 
  destroy() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
  }

  // clear canvas
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  
    this.ctx.fillStyle = "#121212";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.forEach((shape: Shape) => {
      if (shape.type === "rectangle") {
        this.ctx.strokeStyle = "#E0E0E0";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
        this.ctx.strokeStyle = "#E0E0E0";
        this.ctx.stroke();
      } else if (shape.type === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.strokeStyle = "#E0E0E0";
        this.ctx.stroke();
      } else if (shape.type === "pencil") {
        this.drawPencil(shape.path);
      }
    })
  }
}

export { Draw };