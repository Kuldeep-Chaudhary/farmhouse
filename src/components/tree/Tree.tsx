import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import gsap from 'gsap';

interface TreeProps {
  position: [number, number, number];
  isStorm?: boolean;
}

const Tree: React.FC<TreeProps> = ({ position, isStorm = false }) => {
  const { scene } = useGLTF('/modal/scene.gltf');
  const treeRef = useRef<Group>(null);

  useEffect(() => {
    if (!treeRef.current) return;

    if (isStorm) {
      // Sway animation
      gsap.to(treeRef.current.rotation, {
        z: 0.2,
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    } else {
      // Reset tree rotation
      gsap.to(treeRef.current.rotation, {
        z: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [isStorm]);

  return (
    <group ref={treeRef} position={position}>
      <primitive object={scene.clone()} />
    </group>
  );
};

export default Tree;
