import React, { useEffect, useState, useCallback } from 'react';
import { useSphere } from '@react-three/cannon';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid'; // Using UUID for ID generation

const Hailstone: React.FC<{ position: [number, number, number]; scale: [number, number, number]; onRemoveHailstone: (id: string) => void; id: string }> = ({ position, scale, onRemoveHailstone, id }) => {
  const [ref] = useSphere(() => ({
    mass: 5,
    position,
    material: { restitution: 0.4, friction: 0.4 },
    args: [1],
  }));

  return (
    <mesh ref={ref} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const Hailstones: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const MAX_HAILSTONES = 200;

  const [hailstones, setHailstones] = useState<{ id: string; position: [number, number, number]; scale: [number, number, number] }[]>([]);

  const getRandomPosition = useCallback(() => [Math.random() * 200 - 100, 100, Math.random() * 200 - 100] as [number, number, number], []);
  const getRandomScale = useCallback(() => {
    const s = Math.random() * (0.6 - 0.4) + 0.4;
    return [s, s, s] as [number, number, number];
  }, []);

  const handleRemoveHailstone = useCallback((id: string) => {
    setHailstones((prev) => prev.filter((hailstone) => hailstone.id !== id));
  }, []);

useEffect(() => {
  if (isActive) {
    const interval = setInterval(() => {
      setHailstones((prev) => {
        if (prev.length < MAX_HAILSTONES) {
          const newHailstone = {
            id: uuidv4(),
            position: getRandomPosition(),
            scale: getRandomScale(),
          };
          return [...prev, newHailstone];
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(interval);
  } else {
    setHailstones([]);
  }
}, [isActive, getRandomPosition, getRandomScale]);


  return (
    <>
      {hailstones.map((hailstone) => (
        <Hailstone
          key={hailstone.id}
          id={hailstone.id}
          position={hailstone.position}
          scale={hailstone.scale}
          onRemoveHailstone={handleRemoveHailstone}
        />
      ))}
    </>
  );
};

export default Hailstones;
