const sketch = (s, frameCount) => {
  s.background(255);
  s.noStroke();
  s.fill('red');
  s.circle(s.width / 2, s.height / 2, 40 * s.sin(frameCount * 0.05) ** 2);
}

export default sketch;
