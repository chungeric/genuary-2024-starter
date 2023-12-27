const sketch = (s, frameCount) => {
  s.background(255);
  s.strokeWeight(1.3);
  s.stroke('red');
  s.circle(s.width / 2, s.height / 2, 40 * s.sin(frameCount * 0.05) ** 2);

  // WEBGL must be set as p5 renderer to use below
  // s.rotateX(frameCount * 0.01);
  // s.rotateY(frameCount * 0.01);
  // s.box(50);
}

export default sketch;
