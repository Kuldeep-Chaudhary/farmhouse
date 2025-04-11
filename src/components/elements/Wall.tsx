import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader, RepeatWrapping, SRGBColorSpace } from "three";

// Import Textures
import wallTextureImg from "../../assets/textures/wall/plaster_brick_pattern_diff_1k.jpg";
import wallArmTextureImg from "../../assets/textures/wall/plaster_brick_pattern_arm_1k.jpg";
import wallNormalTextureImg from "../../assets/textures/wall/plaster_brick_pattern_nor_gl_1k.jpg";

interface WallProps {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
  color?: string; // Optional color prop
}

const Wall: React.FC<WallProps> = ({ position, size, rotation = [0, 0, 0], color }) => {
  // ✅ Load Textures
  const wallTexture = useLoader(TextureLoader, wallTextureImg);
  const aoTexture = useLoader(TextureLoader, wallArmTextureImg);
  const normalTexture = useLoader(TextureLoader, wallNormalTextureImg);

  // ✅ Configure Textures
  useMemo(() => {
    const setupTexture = (texture: THREE.Texture, colorSpace = SRGBColorSpace) => {
      texture.colorSpace = colorSpace;
      texture.wrapS = texture.wrapT = RepeatWrapping;
    };

    setupTexture(wallTexture);
    setupTexture(aoTexture, THREE.NoColorSpace);
    setupTexture(normalTexture, THREE.NoColorSpace);
  }, [wallTexture, aoTexture, normalTexture]);

  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color || "white"} // If color is provided, use it; otherwise, use texture
        map={color ? undefined : wallTexture}
        aoMap={color ? undefined : aoTexture}
        normalMap={color ? undefined : normalTexture}
        metalness={0.2}
        roughness={0.8}
        transparent
        side={THREE.FrontSide}
      />
    </mesh>
  );
};

export default Wall;




/*

import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader, RepeatWrapping, SRGBColorSpace } from "three";

// Import Textures
import wallTextureImg from "../../assets/textures/wall/plaster_brick_pattern_diff_1k.jpg";
import wallArmTextureImg from "../../assets/textures/wall/plaster_brick_pattern_arm_1k.jpg";
import wallNormalTextureImg from "../../assets/textures/wall/plaster_brick_pattern_nor_gl_1k.jpg";

interface WallProps {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  repeatScale?: number; // ✅ Adjust tiling (default perfect)
}

const Wall: React.FC<WallProps> = ({ position, size, rotation = [0, 0, 0], color, repeatScale = 1 }) => {
  // ✅ Load Textures
  const wallTexture = useLoader(TextureLoader, wallTextureImg);
  const aoTexture = useLoader(TextureLoader, wallArmTextureImg);
  const normalTexture = useLoader(TextureLoader, wallNormalTextureImg);

  // ✅ Configure Textures
  useMemo(() => {
    const setupTexture = (texture: THREE.Texture, colorSpace = SRGBColorSpace) => {
      texture.colorSpace = colorSpace;
      texture.wrapS = texture.wrapT = RepeatWrapping;
    };

    setupTexture(wallTexture);
    setupTexture(aoTexture, THREE.NoColorSpace);
    setupTexture(normalTexture, THREE.NoColorSpace);

    // **🔥 Perfect Default Repeat Values 🔥**
    const defaultRepeatX = 2; // These are the values that looked **perfect** before
    const defaultRepeatY = 2;

    // **Scale based on repeatScale (1 = default size)**
    wallTexture.repeat.set(defaultRepeatX * repeatScale, defaultRepeatY * repeatScale);
    aoTexture.repeat.set(defaultRepeatX * repeatScale, defaultRepeatY * repeatScale);
    normalTexture.repeat.set(defaultRepeatX * repeatScale, defaultRepeatY * repeatScale);
  }, [wallTexture, aoTexture, normalTexture, repeatScale]);

  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color || "white"}
        map={color ? undefined : wallTexture}
        aoMap={color ? undefined : aoTexture}
        normalMap={color ? undefined : normalTexture}
        metalness={0.2}
        roughness={0.8}
        transparent
      />
    </mesh>
  );
};

export default Wall;


*/
