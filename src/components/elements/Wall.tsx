import React, { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useBox } from "@react-three/cannon";

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
  repeatScale = [1, 1],
}) => {
  const loadedMap = useLoader(THREE.TextureLoader, map || wallTextureImg);
  const loadedAoMap = useLoader(THREE.TextureLoader, aoMap || wallArmTextureImg);
  const loadedNormalMap = useLoader(THREE.TextureLoader, normalMap || wallNormalTextureImg);

  useEffect(() => {
    [loadedMap, loadedAoMap, loadedNormalMap].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repeatScale[0], repeatScale[1]);
      tex.anisotropy = 16;
      tex.needsUpdate = true;
    });
  }, [loadedMap, loadedAoMap, loadedNormalMap, repeatScale]);

  const geometryRef = useRef<THREE.BufferGeometry>(null!);

  // Sync UV2 for aoMap
  useEffect(() => {
    if (geometryRef.current && geometryRef.current.attributes.uv) {
      geometryRef.current.setAttribute(
        "uv2",
        new THREE.BufferAttribute(
          geometryRef.current.attributes.uv.array,
          2
        )
      );
    }
  }, []);

  const [ref] = useBox(() => ({
    position,
    rotation,
    args: size,
    type: "Static",
    material: {
      friction: 0.8,
      restitution: 0.1,
    },
    mass:0
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size} ref={geometryRef} />
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
