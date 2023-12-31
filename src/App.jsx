import { CapturerProvider } from "./contexts/CapturerContext";
import reactLogo from "./assets/react.svg";
import Canvas2D from "./components/Canvas2D";
import CanvasP5 from "./components/CanvasP5";
import CanvasR3F from "./components/CanvasR3F";
import CaptureButton from "./components/CaptureButton";
import FrameScrubber from "./components/FrameScrubber";
import FrameScrubberToggleButton from "./components/FrameScrubberToggleButton";
import "./App.scss";

function App() {
  return (
    <CapturerProvider>
      <div className="wrapper">
        <div className="banner">
          <div>
            <img src={reactLogo} className="logo" alt="React logo" />
          </div>
          <div>
            <h1>Genuary Starter</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* <Canvas2D /> */}
          {/* <CanvasP5 /> */}
          <CanvasR3F />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <CaptureButton />
          <FrameScrubberToggleButton />
        </div>
        <FrameScrubber />
      </div>
    </CapturerProvider>
  );
}

export default App;
