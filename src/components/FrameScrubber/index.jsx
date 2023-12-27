import { useContext } from 'react';
import Slider from 'react-rangeslider';
import { CapturerContext, NUM_FRAMES } from '../../contexts/CapturerContext';
import 'react-rangeslider/lib/index.css';
import './styles.scss';

const FrameScrubber = () => {
  const { useScrubber, scrubberFrame, setScrubberFrame } = useContext(CapturerContext);
  const handleChange = (value) => {
    setScrubberFrame(value);
  };
  if (!useScrubber) return null;
  return (
    <div className="frame-scrubber">
      <Slider min={0} max={NUM_FRAMES} value={scrubberFrame} onChange={handleChange} />
      <div>Frame: {scrubberFrame}</div>
    </div>
  );
};

export default FrameScrubber;
