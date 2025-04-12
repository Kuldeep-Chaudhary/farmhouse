import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Default textures
import wallTextureImg from "../../assets/textures/wall/plaster_brick_pattern_diff_1k.jpg";
import wallArmTextureImg from "../../assets/textures/wall/plaster_brick_pattern_arm_1k.jpg";
import wallNormalTextureImg from "../../assets/textures/wall/plaster_brick_pattern_nor_gl_1k.jpg";

interface WallProps {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
  map?: string;
  aoMap?: string;
  normalMap?: string;
  repeatScale?: [number, number];
}

const Wall: React.FC<WallProps> = ({
  position,
  size,
  rotation = [0, 0, 0],
  map,
  aoMap,
  normalMap,
  repeatScale = [1,1],
}) => {
  const loadedMap = useLoader(THREE.TextureLoader, map || wallTextureImg);
  const loadedAoMap = useLoader(THREE.TextureLoader, aoMap || wallArmTextureImg);
  const loadedNormalMap = useLoader(THREE.TextureLoader, normalMap || wallNormalTextureImg);

  useEffect(() => {
    [loadedMap, loadedAoMap, loadedNormalMap].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeatScale[0], repeatScale[1]);
      tex.anisotropy = 16; // Improves texture clarity at angles
      tex.needsUpdate = true;
    });
  }, [loadedMap, loadedAoMap, loadedNormalMap, repeatScale]);

  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        map={loadedMap}
        aoMap={loadedAoMap}
        normalMap={loadedNormalMap}
        metalness={0.2}
        roughness={0.8}
        transparent
        side={THREE.FrontSide}
      />
    </mesh>
  );
};

export default Wall;
