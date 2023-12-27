import { createContext, useState } from 'react';

export const FPS = 60;
export const NUM_FRAMES = 60;

export const CapturerContext = createContext(null);

const getNewCapturer = () => {
  const { CCapture } = window;
  let capturer = new CCapture({
    format: 'gif',
    workersPath: 'src/ccapture/',
    verbose: true,
    framerate: FPS,
  });
  return capturer;
};

export const CapturerProvider = ({ children }) => {
  const [recording, setRecording] = useState(false);
  const [useScrubber, setUseScrubber] = useState(false);
  const [scrubberFrame, setScrubberFrame] = useState(0);
  return (
    <CapturerContext.Provider
      value={{
        capturer: getNewCapturer(),
        recording,
        setRecording,
        useScrubber,
        setUseScrubber,
        scrubberFrame,
        setScrubberFrame,
      }}>
      {children}
    </CapturerContext.Provider>
  );
};
