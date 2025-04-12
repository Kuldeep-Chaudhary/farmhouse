import React from "react";

interface SingleDoorProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}

const SingleDoor: React.FC<SingleDoorProps> = ({ position, size, color = "#5d6d7e" }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default SingleDoor;
