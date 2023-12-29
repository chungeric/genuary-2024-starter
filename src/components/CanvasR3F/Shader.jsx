import { useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CapturerContext, NUM_FRAMES } from "../../contexts/CapturerContext";

let capturedFrames = 0;

const Shader = (props) => {
  const customShaderRef = useRef();
  const { recording, setRecording, capturer, scrubberFrame, useScrubber } = useContext(CapturerContext);
  useFrame((state, delta) => {
    if (!useScrubber) {
      if (recording && capturedFrames === 0) {
        capturer.start();
        customShaderRef.current.uTime = 0;
      }

      customShaderRef.current.uTime += delta;

      if (recording) {
        capturedFrames++;
        capturer.capture(state.gl.domElement);
        if (capturedFrames >= NUM_FRAMES) {
          setRecording(false);
          capturedFrames = 0;
          capturer.stop();
          capturer.save();
        }
      }
    } else {
      // approximating delta as 0.016
      customShaderRef.current.uTime = 0.016 * scrubberFrame;
    }
  });
  return (
    <mesh {...props}>
      <planeGeometry args={[2, 2, 6, 6]} />
      <customShaderMaterial ref={customShaderRef} />
    </mesh>
  );
};

export default Shader;
