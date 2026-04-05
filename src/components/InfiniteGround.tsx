import React, { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";
import { ground } from "../config";
import colorGroundImg from "../assets/textures/ground/pavement_03_diff_1k.jpg";
import armGroundImg from "../assets/textures/ground/pavement_03_arm_1k.jpg";
import normalGroundImg from "../assets/textures/ground/pavement_03_nor_gl_1k.jpg";
import { usePlane } from "@react-three/cannon";
import * as THREE from "three";

const InfiniteGround: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null); // Ref for the mesh
  const [isLoaded, setIsLoaded] = useState(false);

  const colorTexture = useLoader(TextureLoader, colorGroundImg);
  const armTexture = useLoader(TextureLoader, armGroundImg);
  const normalTexture = useLoader(TextureLoader, normalGroundImg);

  useEffect(() => {
    [colorTexture, armTexture, normalTexture].forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(4, 4);
      texture.anisotropy = 16;
    });

    // Wait until all textures are loaded
    if (colorTexture && armTexture && normalTexture) {
      setIsLoaded(true);
    }

    if (meshRef.current) {
      const geometry = meshRef.current.geometry;
      if (!geometry.attributes.uv2) {
        geometry.setAttribute("uv2", geometry.attributes.uv.clone());
      }
    }
  }, [colorTexture, armTexture, normalTexture]);



  if (!isLoaded) {
    return null;
  }

  return (
    <mesh
      position={ground.position}
      rotation={ground.rotation}
      castShadow
      receiveShadow
      renderOrder={0}
    >
      <planeGeometry args={[2000, 2000]} />
      <meshStandardMaterial
        map={colorTexture}
        normalMap={normalTexture}
        aoMap={armTexture}
      />
    </mesh>
  );
};

export default InfiniteGround;
