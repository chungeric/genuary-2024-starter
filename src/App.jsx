import { CapturerProvider } from "./contexts/CapturerContext";
import reactLogo from "./assets/react.svg";
import Canvas from "./components/Canvas";
import CaptureButton from "./components/CaptureButton";
import "./App.scss";

function App() {
  const draw = (ctx, frameCount) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
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
        <Canvas draw={draw} />
        <CaptureButton />
      </div>
    </CapturerProvider>
  );
}

export default App;
