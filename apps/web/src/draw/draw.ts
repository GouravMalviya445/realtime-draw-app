import { getExistingShapes } from "./httpRequest";
import {Tool, Shape} from "./types";

class Draw {

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D
  private roomId: number;
  private socket: WebSocket;
  private existingShapes: Shape[];
  private clicked: boolean;
  private startX: number;
  private startY: number;
  private selectedShape: Tool;

  constructor(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = socket;
    this.existingShapes = [];
    this.clicked = false;
    this.startX = 0;
    this.startY = 0;
    this.selectedShape = "none";

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

  // mouse handlers
  initMouseHandlers() {
    if (this.selectedShape === "none") return;

    // MouseDown
    this.canvas.addEventListener("mousedown", (e) => {
      this.clicked = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
    })

    // MouseUp
    this.canvas.addEventListener("mouseup", (e) => { 
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
        // TODO: add for line
      } else if (this.selectedShape === "pencil") {
        // TODO: add for pencil
      }

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

    })

    // MouseMove
    this.canvas.addEventListener("mousemove", (e) => {
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
          const radius = Math.max(height, width) / 2;
          this.ctx.beginPath();
          this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          this.ctx.stroke();
          this.ctx.closePath();
        } else if (this.selectedShape === "line") {
          this.ctx.beginPath();
          this.ctx.moveTo(this.startX, this.startY);
          this.ctx.lineTo(e.clientX, e.clientY);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }
    })
    
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
        this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = "#E0E0E0";
        this.ctx.stroke();
      }
    })
  }
}

export { Draw };