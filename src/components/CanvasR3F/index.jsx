import { useContext, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import { CapturerContext, NUM_FRAMES } from '../../contexts/CapturerContext';
import "./CustomShaderMaterial";

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

const Shader = (props) => {
  const meshRef = useRef();
  return (
    <mesh {...props} ref={meshRef}>
      <planeGeometry args={[2, 2, 6, 6]} />
      <customShaderMaterial />
    </mesh>
  );
}

const CanvasR3F = () => {
  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Canvas
        gl={{
          preserveDrawingBuffer: true,
        }}
      >
        <color attach="background" args={['white']} />
        {/* <OrbitControls /> */}
        {/* <OrthographicCamera
          makeDefault
          left={-1}
          right={1}
          top={1}
          bottom={-1}
          near={-1}
          far={1}
        /> */}
        <Box />
        {/* <Shader /> */}
      </Canvas>
    </div>
  );
};

export default CanvasR3F;
