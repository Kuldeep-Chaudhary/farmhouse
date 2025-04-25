import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RainProps {
  isActive: boolean;
}

const Rain: React.FC<RainProps> = ({ isActive }) => {
  const rainRef = useRef<THREE.Points>(null);
  const [intensity] = useState(100000); // Static intensity
  const [speed] = useState(1); // Static speed

  const rainGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(intensity * 3);

    for (let i = 0; i < intensity; i++) {
      positions[i * 3 + 0] = Math.random() * 400 - 200;
      positions[i * 3 + 1] = Math.random() * 200;
      positions[i * 3 + 2] = Math.random() * 400 - 200;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [intensity]);

  useFrame(() => {
    if (!isActive || !rainRef.current) return;

    const positions = rainRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < positions.count; i++) {
      let y = positions.getY(i) - speed;
      if (y < 0) y = 200;
      positions.setY(i, y);
    }

    positions.needsUpdate = true;
  });

  if (!isActive) return null;

  return (
    <points ref={rainRef} geometry={rainGeometry}>
      <pointsMaterial color="white" size={0.3} transparent opacity={0.6} />
    </points>
  );
};

export default Rain;
