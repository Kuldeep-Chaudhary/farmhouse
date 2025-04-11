// CameraLogger.tsx
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

interface Props {
  controlsRef: React.RefObject<any>;
}

const CameraLogger: React.FC<Props> = ({ controlsRef }) => {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "l") {
        console.log("📸 Camera Position:", camera.position);
        console.log("🎯 Look At Target:", controlsRef.current?.target);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera, controlsRef]);

  return null;
};

export default CameraLogger;
