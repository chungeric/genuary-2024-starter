import Canvas from "./Canvas";
import reactLogo from "./assets/react.svg";
import "./App.scss";

function App() {
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      20 * Math.sin(frameCount * 0.05)**2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  };

  return (
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
    </div>
  );
}

export default App;
