import React, { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GUI from "lil-gui";

interface RainProps {
  isActive: boolean;
}

const Rain: React.FC<RainProps> = ({ isActive }) => {
  const rainRef = useRef<THREE.Points>(null);
  const [intensity, setIntensity] = useState(10000);
  const [speed, setSpeed] = useState(1);
  const [gui, setGui] = useState<GUI | null>(null);

  // GUI setup
  useEffect(() => {
    if (isActive && !gui) {
      const newGui = new GUI();
      newGui.add({ intensity }, "intensity", 100, 100000, 100)
        .onChange((val) => setIntensity(val))
        .name("Rain Intensity");

      newGui.add({ speed }, "speed", 0.1, 5, 0.1)
        .onChange((val) => setSpeed(val))
        .name("Rain Speed");

      setGui(newGui);
    }

    if (!isActive && gui) {
      gui.destroy();
      setGui(null);
    }
  }, [isActive]);

  const rainGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(intensity * 3);

    for (let i = 0; i < intensity; i++) {
      positions[i * 3 + 0] = Math.random() * 200 - 100;
      positions[i * 3 + 1] = Math.random() * 200;
      positions[i * 3 + 2] = Math.random() * 200 - 100;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [intensity]);

  useFrame(() => {
    if (!isActive) return;

    const positions = rainRef.current?.geometry.attributes.position;
    if (!positions) return;

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
