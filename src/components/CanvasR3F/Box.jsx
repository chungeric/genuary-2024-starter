import { useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CapturerContext, NUM_FRAMES } from "../../contexts/CapturerContext";

let capturedFrames = 0;

const Box = (props) => {
  const meshRef = useRef();
  const { recording, setRecording, capturer, scrubberFrame, useScrubber } = useContext(CapturerContext);
  useFrame((state, delta) => {
    if (!useScrubber) {
      if (recording && capturedFrames === 0) {
        capturer.start();
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.y = 0;
      }

      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;

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
      meshRef.current.rotation.x = 0.016 * scrubberFrame;
      meshRef.current.rotation.y = 0.016 * 0.5 * scrubberFrame;
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial wireframe />
    </mesh>
  );
};

export default Box;
