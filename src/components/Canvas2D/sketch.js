import { drawCircle } from "./helpers/draw";

const sketch = (ctx, frameCount) => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "blue";
  ctx.beginPath();
  drawCircle(
    ctx,
    ctx.canvas.width / 2,
    ctx.canvas.height / 2,
    20 * Math.sin(frameCount * 0.05) ** 2
  );
  ctx.fill();
}

export default sketch;
