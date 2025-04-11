import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { plotWidth, plotDepth } from "./constants";
import ground from '../assets/textures/grass/rocky_terrain_02_diff_1k.jpg'

const Ground: React.FC = () => {
  const texture = useLoader(TextureLoader, ground); // Ensure the texture is inside the public folder

  return (
    <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <planeGeometry args={[plotWidth, plotDepth]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Ground;
