import React, { useEffect} from "react";
import { RepeatWrapping, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { useBox, useCylinder } from "@react-three/cannon";

import colorGroundImg from '/texture/roof/roof_tiles_diff_1k.jpg';
import armGroundImg from '/texture/roof/roof_tiles_arm_1k.jpg';
import normalGroundImg from '/texture/roof/roof_tiles_nor_gl_1k.jpg';

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

  const [roofRef] = useCylinder(() => ({
    args: [0, size[0], size[1]],
    mass: 0,
    material: {restitution: 0.4,friction: 0.6},
    position,
    type: 'Static',
  }));


  return (
    <>
      {/* Visible mesh (the actual roof) */}
      <mesh ref={roofRef}  rotation={[0, Math.PI / 4, 0]}>
       <cylinderGeometry args={[0, size[0], size[1], 64]} />
        <meshStandardMaterial
          color={color}
          map={colorTexture}
          aoMap={armTexture}
          metalness={0.2}
          normalMap={normalTexture}
        />
      </mesh>

      {/* Wireframe physics collider helper */}
      <mesh position={position} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0, size[0], size[1], 64]} />
        <meshBasicMaterial color="red" wireframe transparent opacity={0.5} />
      </mesh>
    </>
  );
};

export default Roof;
