import { createContext, useState } from 'react';

export const FPS = 60;

export const CapturerContext = createContext(null);

const getNewCapturer = () => {
  // eslint-disable-next-line no-undef
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
  return (
    <CapturerContext.Provider
      value={{
        capturer: getNewCapturer(),
        recording,
        setRecording,
      }}>
      {children}
    </CapturerContext.Provider>
  );
};
