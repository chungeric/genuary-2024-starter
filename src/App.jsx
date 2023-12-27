import { CapturerProvider } from "./contexts/CapturerContext";
import reactLogo from "./assets/react.svg";
import Canvas2D from "./components/Canvas2D";
import CaptureButton from "./components/CaptureButton";
import FrameScrubber from "./components/FrameScrubber";
import FrameScrubberToggleButton from "./components/FrameScrubberToggleButton";
import { drawCircle, drawGrid } from "./helpers/canvas2d/draw";
import "./App.scss";

function App() {
  const draw = (ctx, frameCount) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.strokeStyle = 'black';
    drawGrid(ctx, 20, 20, 0.2);
    ctx.beginPath();
    drawCircle(
      ctx,
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      20 * Math.sin(frameCount * 0.05) ** 2
    );
    ctx.fill();
  };

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
        <Canvas2D draw={draw} />
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
