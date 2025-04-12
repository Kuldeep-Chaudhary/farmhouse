import React, { useEffect } from "react";
import colorGroundImg from '/texture/roof/roof_tiles_diff_1k.jpg'
import armGroundImg from '/texture/roof/roof_tiles_arm_1k.jpg'
import normalGroundImg from '/texture/roof/roof_tiles_nor_gl_1k.jpg'
// import dispGroundImg from '/texture/roof/roof_tiles_disp_1k.jpg'
import { RepeatWrapping, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
interface RoofProps {
  position: [number, number, number];
  size: [number, number];
  color?: string;
}

const Roof: React.FC<RoofProps> = ({ position, size, color = "yellow" }) => {
  
  const colorTexture = useLoader(TextureLoader, colorGroundImg); 
  const armTexture = useLoader(TextureLoader, armGroundImg); 
  const normalTexture = useLoader(TextureLoader, normalGroundImg); 
  useEffect(() => {
    [colorTexture, armTexture, normalTexture].forEach(tex => {
      tex.repeat.set(3, 1);
      tex.wrapS = RepeatWrapping;
      tex.wrapT = RepeatWrapping;
    });
  }, [colorTexture, armTexture, normalTexture]);
  
  return (
    <mesh position={position} rotation={[0, Math.PI / 4, 0]}>
      <coneGeometry args={[size[0], size[1],32]} />
      <meshStandardMaterial color={color} map={colorTexture} aoMap={armTexture} metalness={0.2} normalMap={normalTexture} />
    </mesh>
  );
};

export default Roof;
