import React from "react";
import Wall from "./elements/Wall";
import Roof from "./elements/Roof";
import SingleDoor from "./elements/SingleDoor";
import { hut, hutWalls } from "../config";

interface HutProps {
  position: [number, number, number];
}

const Hut: React.FC<HutProps> = ({ position }) => {
  return (
    <group position={position}>
      {/* Walls using map */}
      {hutWalls.map((wall, index) => (
        <Wall
          key={index}
          position={wall.position}
          rotation={wall.rotation}
          size={wall.size}
        />
      ))}

      {/* Roof */}
      <Roof position={hut.roofPosition} size={hut.roofSize} />

      {/* Door */}
      <SingleDoor position={hut.doorPosition} size={hut.doorSize} />
    </group>
  );
};

export default Hut;
