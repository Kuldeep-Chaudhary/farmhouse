import React from "react";

interface RoofProps {
  position: [number, number, number];
  size: [number, number];
  color?: string;
}

const Roof: React.FC<RoofProps> = ({ position, size, color = "yellow" }) => {
  return (
    <mesh position={position} rotation={[0, Math.PI / 4, 0]}>
      <coneGeometry args={[size[0], size[1], 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Roof;
