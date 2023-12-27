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

import { useContext, useEffect, useRef } from 'react';
import { resizeCanvas } from './helpers/resizeCanvas';
import { CapturerContext, NUM_FRAMES } from '../../contexts/CapturerContext';

const Canvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);
  const { recording, setRecording, capturer, scrubberFrame, useScrubber } = useContext(CapturerContext);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!useScrubber) {
      let frameCount = 0;
      let capturedFrames = 0;
      let raf;
      const render = () => {
        if (recording && capturedFrames === 0) {
          capturer.start();
        }

        draw(context, frameCount);
        frameCount++;

        if (recording) {
          capturedFrames++;
          capturer.capture(canvas);
          if (capturedFrames >= NUM_FRAMES) {
            setRecording(false);
            capturedFrames = 0;
            capturer.stop();
            capturer.save();
          }
        }
        raf = requestAnimationFrame(render);
      };
      render();
      return () => {
        capturer.stop();
        cancelAnimationFrame(raf);
      };
    } else {
      draw(context, scrubberFrame);
    }
  }, [draw, capturer, recording, setRecording, useScrubber, scrubberFrame]);

  // Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const onResize = () => {
      resizeCanvas(canvas);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
