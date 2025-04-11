// FovController.tsx
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";

const FovController: React.FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCamera;

    const handleWheel = (event: WheelEvent) => {
      // You can change this multiplier to control how sensitive the zoom feels
      const delta = event.deltaY;

      // Zoom in or out
      const newFov = Math.min(90, Math.max(30, perspectiveCamera.fov + delta * 0.05));

      perspectiveCamera.fov = newFov;
      perspectiveCamera.updateProjectionMatrix();
      console.log("Wheel delta:", delta, "-> new FOV:", newFov);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [camera]);

  return null;
};

export default FovController;
