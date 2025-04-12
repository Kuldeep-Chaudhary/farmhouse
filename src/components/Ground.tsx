import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";
import { ground } from "../config";
import colorGroundImg from '../assets/textures/ground/pavement_03_diff_1k.jpg'
import armGroundImg from '../assets/textures/ground/pavement_03_arm_1k.jpg'
import normalGroundImg from '../assets/textures/ground/pavement_03_nor_gl_1k.jpg'
import dispGroundImg from '../assets/textures/ground/pavement_03_disp_1k.jpg'

const Ground: React.FC = () => {
  const colorTexture = useLoader(TextureLoader, colorGroundImg); 
  const armTexture = useLoader(TextureLoader, armGroundImg); 
  const normalTexture = useLoader(TextureLoader, normalGroundImg); 
  const dispTexture = useLoader(TextureLoader, dispGroundImg); 

  useEffect(()=>{
    if(colorTexture){
      colorTexture.wrapS = RepeatWrapping
      colorTexture.wrapT = RepeatWrapping
      armTexture.wrapS = RepeatWrapping
      armTexture.wrapT = RepeatWrapping
      normalTexture.wrapS = RepeatWrapping
      normalTexture.wrapT = RepeatWrapping
      dispTexture.wrapS = RepeatWrapping
      dispTexture.wrapT = RepeatWrapping

      colorTexture.repeat.set(4,4)
      armTexture.repeat.set(4,4)
      normalTexture.repeat.set(4,4)
      dispTexture.repeat.set(4,4)
    }
  },[colorTexture, normalTexture, armTexture])

  return (
    <mesh position={ground.position} rotation={ground.rotation} castShadow receiveShadow>
      <planeGeometry args={[ground.width, ground.depth]} />
      <meshStandardMaterial map={colorTexture} aoMap={armTexture} normalMap={normalTexture} displacementMap={dispTexture} />
    </mesh>
  );
};

export default Ground;
