
export type Tool = "circle" | "rectangle" | "line" | "arrow" | "pencil" | "none";

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
  startX: number;
  startY: number;
  endX: number;
  endY: number;
} | {
  type: "line";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}