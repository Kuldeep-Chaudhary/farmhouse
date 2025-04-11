import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

import { gateWidth, wallHeight ,gateThickness ,gateOpenAngle,gatePosition} from "./constants";

const Gate: React.FC = () => {
  const leftGateRef = useRef<Group>(null);
  const rightGateRef = useRef<Group>(null);
  const [open, setOpen] = useState(false);
  const speed = 0.05;

  useFrame(() => {
    if (open) {
      if (leftGateRef.current && leftGateRef.current.rotation.y > -gateOpenAngle) {
        leftGateRef.current.rotation.y -= speed;
      }
      if (rightGateRef.current && rightGateRef.current.rotation.y < gateOpenAngle) {
        rightGateRef.current.rotation.y += speed;
      }
    } else {
      if (leftGateRef.current && leftGateRef.current.rotation.y < 0) {
        leftGateRef.current.rotation.y += speed;
      }
      if (rightGateRef.current && rightGateRef.current.rotation.y > 0) {
        rightGateRef.current.rotation.y -= speed;
      }
    }
  });

  return (
    <group position={[0, wallHeight / 2, -gatePosition]}>


      {/* Left Gate (Fixed Position) */}
      <group ref={leftGateRef} position={[-gateWidth, 0, 0]}>
        <mesh
          position={[gateWidth / 2, 0, 0]} // Shifted back to the correct position
          onClick={() => setOpen(!open)}
        >
          <boxGeometry args={[gateWidth, wallHeight, gateThickness]} />
          <meshStandardMaterial color="brown" />
        </mesh>
      </group>

      {/* Right Gate (Fixed Position) */}
      <group ref={rightGateRef} position={[gateWidth, 0, 0]}>
        <mesh
          position={[-gateWidth / 2, 0, 0]} // Shifted back to the correct position
          onClick={() => setOpen(!open)}
        >
          <boxGeometry args={[gateWidth, wallHeight, gateThickness]} />
          <meshStandardMaterial color="brown" />
        </mesh>
      </group>
    </group>
  );
};

export default Gate;
