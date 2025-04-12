// components/nature/SmoothSky.tsx
import { useRef, useEffect } from "react";
import { Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SmoothSkyProps {
  targetPosition: [number, number, number];
  turbidity?: number;
}

const SmoothSky = ({ targetPosition, turbidity = 8 }: SmoothSkyProps) => {
  const currentPos = useRef(new THREE.Vector3(...targetPosition));
  const target = useRef(new THREE.Vector3(...targetPosition));

  useEffect(() => {
    target.current.set(...targetPosition);
  }, [targetPosition]);

  useFrame(() => {
    currentPos.current.lerp(target.current, 0.02); // 0.02 means smooth but not too slow
  });

  return <Sky sunPosition={currentPos.current.toArray()} turbidity={turbidity} />;
};

export default SmoothSky;
