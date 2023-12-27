import { useContext } from "react";
import { CapturerContext } from "../../contexts/CapturerContext";

const CaptureButton = () => {
  const { recording, setRecording, useScrubber } = useContext(CapturerContext);
  return (
    <button type="button" onClick={() => setRecording(!recording)} disabled={recording || useScrubber}>
      {recording ? "Recording frames..." : "Record frames"}
    </button>
  );
};

export default CaptureButton;
