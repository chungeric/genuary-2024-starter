import { useContext } from 'react';
import Slider from 'react-rangeslider';
import { CapturerContext, NUM_FRAMES } from '../../contexts/CapturerContext';
import { clamp } from '../../helpers/math';
import 'react-rangeslider/lib/index.css';
import './styles.scss';

const FrameScrubber = () => {
  const { useScrubber, scrubberFrame, setScrubberFrame } = useContext(CapturerContext);
  const handleChange = (value) => {
    setScrubberFrame(clamp(value, 0, NUM_FRAMES));
  };
  if (!useScrubber) return null;
  return (
    <div className="frame-scrubber">
      <Slider min={0} max={NUM_FRAMES} step={1} value={scrubberFrame} onChange={handleChange} className='frame-scrubber__input' />
      <div>
        Frame:{' '}
        <input
          type="number"
          value={scrubberFrame}
          onChange={(e) => handleChange(e.target.value)}
          className="frame-input"
        />
      </div>
    </div>
  );
};

export default FrameScrubber;
