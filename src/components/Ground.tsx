import React, { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";
import { ground } from "../config";
import colorGroundImg from "../assets/textures/ground/pavement_03_diff_1k.jpg";
import armGroundImg from "../assets/textures/ground/pavement_03_arm_1k.jpg";
import normalGroundImg from "../assets/textures/ground/pavement_03_nor_gl_1k.jpg";

const Ground: React.FC = () => {
  const ref = useRef<THREE.Mesh>(null);
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

    if (ref.current) {
      const geometry = ref.current.geometry;
      if (!geometry.attributes.uv2) {
        geometry.setAttribute('uv2', geometry.attributes.uv.clone());
      }
    }
  }, [colorTexture, armTexture, normalTexture]);

  if (!isLoaded) {
    return null; // Or return a loading spinner if needed
  }

  return (
    <mesh
      ref={ref}
      position={ground.position}
      rotation={ground.rotation}
      castShadow
      receiveShadow
      renderOrder={0}
    >
      <planeGeometry args={[ground.width, ground.depth]} />
      <meshStandardMaterial
        map={colorTexture}
        normalMap={normalTexture}
        aoMap={armTexture}
      />
    </mesh>
  );
};

export default Ground;
