import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { hutCameraPositions, hutLookAtPositions } from "../constants";

// Types
interface FocusPosition {
  position: [number, number, number];
  lookAt: [number, number, number];
}

const defaultCameraPosition: [number, number, number] = [0, 100, 300];
const defaultLookAt: [number, number, number] = [0, 0, 0];

const CameraScroller: React.FC = () => {
  const { camera } = useThree();
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const lookAtRef = useRef({ x: 0, y: 0, z: 0 });
  const gui = useRef<GUI | null>(null);

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCamera;

    // Initial setup
    camera.position.set(...hutCameraPositions[0]);
    lookAtRef.current.x = hutLookAtPositions[0][0];
    lookAtRef.current.y = hutLookAtPositions[0][1];
    lookAtRef.current.z = hutLookAtPositions[0][2];

    // Debug GUI
    gui.current = new GUI();
    const folder = gui.current.addFolder("Camera LookAt");
    folder.add(lookAtRef.current, "x", -200, 200).listen();
    folder.add(lookAtRef.current, "y", -200, 200).listen();
    folder.add(lookAtRef.current, "z", -200, 200).listen();
    folder.open();

    const handleScroll = (e: WheelEvent) => {
      if (isAnimating.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      let newIndex = currentIndex.current + direction;

      // 🟥 If scroll exceeds max, reset camera to default
      if (newIndex >= hutCameraPositions.length) {
        const currentPos = camera.position.clone();
        const dir = new Vector3();
        camera.getWorldDirection(dir);
        const currentLookAt = currentPos.clone().add(dir.multiplyScalar(100));

        const dummy = {
          posX: currentPos.x,
          posY: currentPos.y,
          posZ: currentPos.z,
          lookX: currentLookAt.x,
          lookY: currentLookAt.y,
          lookZ: currentLookAt.z,
        };

        isAnimating.current = true;

        gsap.to(dummy, {
          posX: defaultCameraPosition[0],
          posY: defaultCameraPosition[1],
          posZ: defaultCameraPosition[2],
          lookX: defaultLookAt[0],
          lookY: defaultLookAt[1],
          lookZ: defaultLookAt[2],
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            camera.position.set(dummy.posX, dummy.posY, dummy.posZ);
            lookAtRef.current.x = dummy.lookX;
            lookAtRef.current.y = dummy.lookY;
            lookAtRef.current.z = dummy.lookZ;
          },
          onComplete: () => {
            isAnimating.current = false;
            currentIndex.current = 0;
          },
        });

        return;
      }

      // ⛔ Prevent scrolling before first index
      if (newIndex < 0) return;

      const targetPos = hutCameraPositions[newIndex];
      const targetLookAt = hutLookAtPositions[newIndex];

      const currentPos = camera.position.clone();
      const dir = new Vector3();
      camera.getWorldDirection(dir);
      const currentLookAt = currentPos.clone().add(dir.multiplyScalar(100));

      const dummy = {
        posX: currentPos.x,
        posY: currentPos.y,
        posZ: currentPos.z,
        lookX: currentLookAt.x,
        lookY: currentLookAt.y,
        lookZ: currentLookAt.z,
      };

      isAnimating.current = true;

      gsap.to(dummy, {
        posX: targetPos[0],
        posY: targetPos[1],
        posZ: targetPos[2],
        lookX: targetLookAt[0],
        lookY: targetLookAt[1],
        lookZ: targetLookAt[2],
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.position.set(dummy.posX, dummy.posY, dummy.posZ);
          lookAtRef.current.x = dummy.lookX;
          lookAtRef.current.y = dummy.lookY;
          lookAtRef.current.z = dummy.lookZ;
        },
        onComplete: () => {
          isAnimating.current = false;
          currentIndex.current = newIndex;
        },
      });
    };

    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      gui.current?.destroy();
    };
  }, [camera]);

  useFrame(() => {
    camera.lookAt(
      lookAtRef.current.x,
      lookAtRef.current.y,
      lookAtRef.current.z
    );
  });

  return null;
};

export default CameraScroller;
