import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Group, TextureLoader } from "three";
import { boundaryGate, groundWall } from "../config";
import { useScrollContext } from "../context/ScrollContext";
import gateImg from '/texture/gate/TCom_Wood_TavernDoor_header.jpg'
const Gate: React.FC = () => {
  const { enableScroll } = useScrollContext();
  const leftGateRef = useRef<Group>(null);
  const rightGateRef = useRef<Group>(null);
  const [open, setOpen] = useState(false);
  const gateTexture = useLoader(TextureLoader, gateImg);

  useFrame(() => {
    if (open) {
      if (
        leftGateRef.current &&
        leftGateRef.current.rotation.y > -boundaryGate.angle
      ) {
        leftGateRef.current.rotation.y -= boundaryGate.speed;
      }
      if (
        rightGateRef.current &&
        rightGateRef.current.rotation.y < boundaryGate.angle
      ) {
        rightGateRef.current.rotation.y += boundaryGate.speed;
      }
    } else {
      if (leftGateRef.current && leftGateRef.current.rotation.y < 0) {
        leftGateRef.current.rotation.y += boundaryGate.speed;
      }
      if (rightGateRef.current && rightGateRef.current.rotation.y > 0) {
        rightGateRef.current.rotation.y -= boundaryGate.speed;
      }
    }
    enableScroll();
  });

  return (
    <group position={boundaryGate.position}>
      {/* Left Gate (Fixed Position) */}
      <group ref={leftGateRef} position={boundaryGate.leftGatePosition}>
        <mesh
          position={boundaryGate.leftMeshOffset} // Shifted back to the correct position
          onClick={() => setOpen(!open)}
        >
          <boxGeometry
            args={[
              boundaryGate.width,
              groundWall.height,
              boundaryGate.thickness,
            ]}
          />
          <meshStandardMaterial map={gateTexture}/>
        </mesh>
      </group>

      {/* Right Gate (Fixed Position) */}
      <group ref={rightGateRef} position={boundaryGate.rightGatePosition}>
        <mesh
          position={boundaryGate.rightMeshOffset} // Shifted back to the correct position
          onClick={() => setOpen(!open)}
        >
          <boxGeometry
            args={[
              boundaryGate.width,
              groundWall.height,
              boundaryGate.thickness,
            ]}
          />
          <meshStandardMaterial map={gateTexture}/>
        </mesh>
      </group>
    </group>
  );
};

export default Gate;
