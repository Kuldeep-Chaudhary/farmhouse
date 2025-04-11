import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { hutOffsetX, hutOffsetZ } from "../constants";

// Hut positions
const hutPositions: [number, number, number][] = [
  [-hutOffsetX, 0, hutOffsetZ - hutOffsetZ / 1.2],
  [hutOffsetX, 0, hutOffsetZ - hutOffsetZ / 1.2],
  [-hutOffsetX, 0, -hutOffsetZ],
  [hutOffsetX, 0, -hutOffsetZ],
];

// Camera focus positions (position + lookAt)
interface FocusPosition {
  position: [number, number, number];
  lookAt: [number, number, number];
}

const hutFocusPositions: FocusPosition[] = hutPositions.map(([x, y, z]) => ({
  position: [x, y + 30, z + 60],
  lookAt: [x, y, z],
}));

// Default camera view (like on refresh)
const defaultCameraFocus: FocusPosition = {
  position: [0, 50, 200],
  lookAt: [0, 0, 0],
};

const CameraScroller: React.FC = () => {
  const { camera } = useThree();
  const currentIndex = useRef(-1); // Default index
  const isAnimating = useRef(false);
  const gui = useRef<GUI | null>(null);

  const lookAtRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCamera;

    // Set initial camera position and lookAt (refresh)
    camera.position.set(
      defaultCameraFocus.position[0],
      defaultCameraFocus.position[1],
      defaultCameraFocus.position[2]
    );
    lookAtRef.current = {
      x: defaultCameraFocus.lookAt[0],
      y: defaultCameraFocus.lookAt[1],
      z: defaultCameraFocus.lookAt[2],
    };

    // 🛠️ GUI setup
    gui.current = new GUI();
    const folder = gui.current.addFolder("Camera LookAt");
    folder.add(lookAtRef.current, "x", -200, 200).listen();
    folder.add(lookAtRef.current, "y", -200, 200).listen();
    folder.add(lookAtRef.current, "z", -200, 200).listen();
    folder.open();
    const handleScroll = (e: WheelEvent) => {
      if (isAnimating.current) return;
    
      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = currentIndex.current + direction;
    
      // ✅ Allow up to one step beyond last hut index
      if (newIndex < -1 || newIndex > hutFocusPositions.length) return;
    
      // ✅ Select correct target
      let targetPos: [number, number, number];
      let targetLookAt: [number, number, number];
    
      if (newIndex === -1 || newIndex === hutFocusPositions.length) {
        targetPos = defaultCameraFocus.position;
        targetLookAt = defaultCameraFocus.lookAt;
      } else {
        targetPos = hutFocusPositions[newIndex].position;
        targetLookAt = hutFocusPositions[newIndex].lookAt;
      }
    
      const currentPos = camera.position.clone();
    
      // Calculate current lookAt from camera direction
      const dir = new Vector3();
      camera.getWorldDirection(dir);
      const currentLookAt = currentPos.clone().add(dir.multiplyScalar(100));
    
      // Dummy object for GSAP animation
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
    
          // ✅ Reset to default index if we go beyond last hut
          currentIndex.current =
            newIndex === hutFocusPositions.length ? -1 : newIndex;
        },
      });
    };

    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      gui.current?.destroy();
    };
  }, [camera]);

  // Constantly update lookAt target
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




// old one
// const handleScroll = (e: WheelEvent) => {
//   if (isAnimating.current) return;

//   const direction = e.deltaY > 0 ? 1 : -1;
//   const newIndex = currentIndex.current + direction;

//   if (newIndex < -1 || newIndex >= hutFocusPositions.length) return;

//   const { position: targetPos, lookAt: targetLookAt } =
//     newIndex === -1 ? defaultCameraFocus : hutFocusPositions[newIndex];

//   const currentPos = camera.position.clone();

//   // Calculate current lookAt from camera direction
//   const dir = new Vector3();
//   camera.getWorldDirection(dir);
//   const currentLookAt = currentPos.clone().add(dir.multiplyScalar(100));

//   // Dummy object for GSAP animation
//   const dummy = {
//     posX: currentPos.x,
//     posY: currentPos.y,
//     posZ: currentPos.z,
//     lookX: currentLookAt.x,
//     lookY: currentLookAt.y,
//     lookZ: currentLookAt.z,
//   };

//   isAnimating.current = true;

//   gsap.to(dummy, {
//     posX: targetPos[0],
//     posY: targetPos[1],
//     posZ: targetPos[2],
//     lookX: targetLookAt[0],
//     lookY: targetLookAt[1],
//     lookZ: targetLookAt[2],
//     duration: 1.2,
//     ease: "power2.inOut",
//     onUpdate: () => {
//       camera.position.set(dummy.posX, dummy.posY, dummy.posZ);
//       lookAtRef.current.x = dummy.lookX;
//       lookAtRef.current.y = dummy.lookY;
//       lookAtRef.current.z = dummy.lookZ;
//     },
//     onComplete: () => {
//       isAnimating.current = false;
//       currentIndex.current = newIndex;
//     },
//   });
// };