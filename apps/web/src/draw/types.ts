
export type Tool = "circle" | "rectangle" | "line" | "arrow" | "pencil" | "none";

export type Point = { x: number, y: number };

export type Shape = {
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
} | {
  type: "pencil";
  path: Point[]
} | {
  type: "line";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}