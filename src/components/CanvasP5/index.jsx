/* setup ref: https://github.com/processing/p5.js/wiki/Global-and-instance-mode */
/* ref: https://p5js.org/reference/#/p5/p5 */

import { useContext, useEffect, useRef } from 'react';
import p5 from 'p5';
import { CapturerContext, NUM_FRAMES } from '../../contexts/CapturerContext';
import { draw, setup } from './sketch';

const CanvasP5 = () => {
  const ref = useRef(null);
  const sketchRef = useRef(null);
  const { recording, setRecording, capturer, scrubberFrame, useScrubber } = useContext(CapturerContext);
  useEffect(() => {
    const wrapper = ref.current;
    // p5 instance mode
    const p5Sketch = (s) => {
      let capturedFrames = 0;
      s.setup = () => {
        setup(s);
        if (useScrubber) {
          s.noLoop();
        }
      };
      s.draw = () => {
        if (!useScrubber) {
          if (recording && capturedFrames === 0) {
            capturer.start();
          }
  
          draw(s, s.frameCount);
  
          if (recording) {
            capturedFrames++;
            capturer.capture(s.canvas);
            if (capturedFrames >= NUM_FRAMES) {
              setRecording(false);
              capturedFrames = 0;
              capturer.stop();
              capturer.save();
            }
          }
        } else {
          draw(s, scrubberFrame);
        }
      };
    }
    sketchRef.current = new p5(p5Sketch, wrapper);
    return () => {
      sketchRef.current.remove();
    }
  }, [capturer, recording, setRecording, scrubberFrame, useScrubber]);
  return <div ref={ref} />;
};

export default CanvasP5;
