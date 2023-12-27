/* ref: https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258 */

import { useContext, useEffect, useRef } from 'react';
import { resizeCanvas } from './helpers/resizeCanvas';
import { CapturerContext, NUM_FRAMES } from '../../contexts/CapturerContext';
import sketch from './sketch';

const Canvas2D = () => {
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

        sketch(context, frameCount);
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
      sketch(context, scrubberFrame);
    }
  }, [capturer, recording, setRecording, useScrubber, scrubberFrame]);

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

  return <canvas ref={canvasRef} style={{ width: '400px', height: '400px' }} />;
};

export default Canvas2D;
