import { useContext } from 'react';
import { CapturerContext } from '../../contexts/CapturerContext';

const FrameScrubberToggleButton = () => {
  const { useScrubber, setUseScrubber } = useContext(CapturerContext);
  return (
    <button type="button" onClick={() => setUseScrubber(!useScrubber)}>
      Toggle Scrubber
    </button>
  );
};

export default FrameScrubberToggleButton;
