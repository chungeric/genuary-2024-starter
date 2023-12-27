import { useContext } from "react";
import { CapturerContext } from "../../contexts/CapturerContext";

const CaptureButton = () => {
  const { recording, setRecording } = useContext(CapturerContext);
  return (
    <button type="button" onClick={() => setRecording(!recording)} disabled={recording}>
      {recording ? "Recording frames..." : "Record frames"}
    </button>
  );
};

export default CaptureButton;
