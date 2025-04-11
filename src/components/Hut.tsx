import React from "react";
import Wall from "./elements/Wall";
import Roof from "./elements/Roof";
import SingleDoor from "./elements/SingleDoor";
import { hutWidth, hutDepth, hutHeight, roofHeight, doorWidth, doorHeight, hutWallThickness } from "./constants";

interface HutProps {
  position: [number, number, number];
}

const Hut: React.FC<HutProps> = ({ position }) => {
  const hutFrontWallWidth = (hutWidth - doorWidth) / 2;
  const hutFrontWallPosition = hutWidth / 2 - doorWidth;

  // Wall configurations: [name, position, rotation, size]
  const walls = [
    { name: "Front Left Wall", position: [-hutFrontWallPosition, hutHeight / 2, hutDepth / 2], rotation: [0, 0, 0], size: [hutFrontWallWidth, hutHeight, hutWallThickness] },
    { name: "Front Right Wall", position: [hutFrontWallPosition, hutHeight / 2, hutDepth / 2], rotation: [0, 0, 0], size: [hutFrontWallWidth, hutHeight, hutWallThickness] },
    { name: "Back Wall", position: [0, hutHeight / 2, -hutDepth / 2], rotation: [0, 0, 0], size: [hutWidth, hutHeight, hutWallThickness] },
    { name: "Left Side Wall", position: [-hutWidth / 2, hutHeight / 2, 0], rotation: [0, Math.PI / 2, 0], size: [hutDepth, hutHeight, hutWallThickness] },
    { name: "Right Side Wall", position: [hutWidth / 2, hutHeight / 2, 0], rotation: [0, Math.PI / 2, 0], size: [hutDepth, hutHeight, hutWallThickness] },
  ];

  return (
    <group position={position}>
      {/* Walls using map */}
      {walls.map((wall, index) => (
        <Wall key={index} position={wall.position} rotation={wall.rotation} size={wall.size} />
      ))}

      {/* Roof */}
      <Roof position={[0, hutHeight + roofHeight / 2, 0]} size={[hutWidth / 1.2, roofHeight]} />

      {/* Door */}
      <SingleDoor position={[0, doorHeight / 2, hutDepth / 2 + 0.01]} size={[doorWidth, doorHeight, 0.2]} />
    </group>
  );
};

export default Hut;
