/* eslint-disable react/prop-types */
/* ref: https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258 */

/*
  Example usage:
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(200, 200, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }
  <Canvas draw={draw} />
*/

import { useEffect, useRef } from "react"
import { resizeCanvas } from "./helpers/resizeCanvas";

const Canvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null)

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frameCount = 0;
    let raf;
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      raf = requestAnimationFrame(render);
    }
    render();
    return () => {
      cancelAnimationFrame(raf)
    }
  }, [draw]);

  // Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const onResize = () => {
      resizeCanvas(canvas)
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);
  
  return <canvas ref={canvasRef} {...rest} />
}

export default Canvas;