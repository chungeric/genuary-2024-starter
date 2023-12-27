import { useContext } from 'react';
import { CapturerContext } from '../../contexts/CapturerContext';

const FrameScrubberToggleButton = () => {
  const { useScrubber, setUseScrubber, recording } = useContext(CapturerContext);
  return (
    <button type="button" onClick={() => setUseScrubber(!useScrubber)} disabled={recording}>
      Toggle Scrubber
    </button>
  );
};

export default FrameScrubberToggleButton;
