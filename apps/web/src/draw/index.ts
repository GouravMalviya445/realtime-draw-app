export function initDraw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.fillStyle = "#2424424";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
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
  }

  // handle mouse move
  function handleMouseMove(e: MouseEvent) {
    if (clicked) {
      console.log(e.clientX, e.clientY);
      const height = e.clientY - startY;
      const width = e.clientX - startX;
      if (!ctx) return;
      
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#2424424";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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