import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import GUI from "lil-gui";
import { hutCameraPositions, hutLookAtPositions } from "../constants";

// Helper functions
const lerpArray = (a: number[], b: number[], t: number) =>
  a.map((val, i) => val + (b[i] - val) * t);

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

const CameraScroller: React.FC = () => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const targetPosition = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  const gui = useRef<GUI | null>(null);
  const currentPos = useRef(new Vector3());
  const currentLookAt = useRef(new Vector3());
  // 👇 Add isPanning flag to track panning state
  const isPanning = useRef(false);

  const totalPoints = hutCameraPositions.length;
  const sensitivity = 0.0015;

  useEffect(() => {
    // Initialize camera
    camera.position.set(...hutCameraPositions[0]);
    currentPos.current.copy(camera.position);
    currentLookAt.current.set(...hutLookAtPositions[0]);
    targetLookAt.current.copy(currentLookAt.current);

    // Setup GUI for debugging
    gui.current = new GUI();
    const folder = gui.current.addFolder("Camera LookAt");
    folder.add(targetLookAt.current, "x", -200, 200).listen();
    folder.add(targetLookAt.current, "y", -200, 200).listen();
    folder.add(targetLookAt.current, "z", -200, 200).listen();
    folder.open();

    // Scroll handler
    const handleScroll = (e: WheelEvent) => {
      scrollProgress.current += e.deltaY * sensitivity;

      // Loop-back logic
      if (scrollProgress.current >= totalPoints - 1) {
        scrollProgress.current = 0;
      }

      scrollProgress.current = clamp(scrollProgress.current, 0, totalPoints - 1);
    };

    // 👇 Add mouse event listeners for panning
    const handleMouseDown = () => {
      isPanning.current = true;
    };

    const handleMouseUp = () => {
      isPanning.current = false;
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      gui.current?.destroy();
    };
  }, [camera]);

  useFrame(() => {
    // 👇 Skip camera updates if panning
    if (isPanning.current) return;

    const progress = scrollProgress.current;
    const index = Math.floor(progress);
    const t = progress - index;

    if (index >= totalPoints - 1) return;

    const posArr = lerpArray(hutCameraPositions[index], hutCameraPositions[index + 1], t);
    const lookArr = lerpArray(hutLookAtPositions[index], hutLookAtPositions[index + 1], t);

    targetPosition.current.set(...posArr);
    targetLookAt.current.set(...lookArr);

    // Lerp camera position and lookAt smoothly
    currentPos.current.lerp(targetPosition.current, 0.1);
    currentLookAt.current.lerp(targetLookAt.current, 0.1);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export default CameraScroller;