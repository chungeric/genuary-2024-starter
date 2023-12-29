import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';
import Box from './Box';
import Shader from './Shader';

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
        {/* <OrthographicCamera makeDefault left={-1} right={1} top={1} bottom={-1} near={-1} far={1} /> */}
        <Box />
        {/* <Shader /> */}
      </Canvas>
    </div>
  );
};

export default CanvasR3F;
