import { useContext } from 'react';
import { CapturerContext, NUM_FRAMES } from '../../contexts/CapturerContext';
import { clamp } from '../../helpers/math';
import './styles.scss';

const FrameScrubber = () => {
  const { useScrubber, scrubberFrame, setScrubberFrame } = useContext(CapturerContext);
  const handleChange = (e) => {
    setScrubberFrame(clamp(e.target.value, 0, NUM_FRAMES));
  };
  if (!useScrubber) return null;
  return (
    <div className="frame-scrubber">
      {/* Range slider */}
      <input
        type="range"
        min={0}
        max={NUM_FRAMES}
        step={1}
        value={scrubberFrame}
        onChange={handleChange}
        className="frame-scrubber__input"
      />
      <div>
        Frame: <input type="number" value={scrubberFrame} onChange={handleChange} className="frame-input" />
      </div>
    </div>
  );
};

export default FrameScrubber;
