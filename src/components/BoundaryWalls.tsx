import React from "react";
import Wall from "./elements/Wall";
import { 
  gateWidth, wallThickness, wallHeight, plotWidth, plotDepth, frontSpace, enclosedDepth 
} from "./constants";

const BoundaryWalls: React.FC = () => {
  const frontWallWidth = (plotWidth - gateWidth * 2) / 2;
  const frontWallPosition = frontWallWidth / 2 + gateWidth;

  // ✅ Define boundary wall configurations with custom colors
  const walls = [
    { name: "Left Front Wall", position: [frontWallPosition, wallHeight / 2, -plotDepth / 2 + frontSpace], size: [frontWallWidth, wallHeight, wallThickness],repeatScale: 4 }, // Dark Red
    { name: "Right Front Wall", position: [-frontWallPosition, wallHeight / 2, -plotDepth / 2 + frontSpace], size: [frontWallWidth, wallHeight, wallThickness],repeatScale: 4 }, 
    { name: "Back Wall", position: [0, wallHeight / 2, plotDepth / 2], size: [plotWidth, wallHeight, wallThickness] ,repeatScale: 6}, // Brown
    { name: "Left Side Wall", position: [-plotWidth / 2 + wallThickness / 2, wallHeight / 2, frontSpace / 2], size: [wallThickness, wallHeight, enclosedDepth],repeatScale: 8}, // Firebrick
    { name: "Right Side Wall", position: [plotWidth / 2 - wallThickness / 2, wallHeight / 2, frontSpace / 2], size: [wallThickness, wallHeight, enclosedDepth],repeatScale: 8}, 
  ];

  return (
    <>
      {walls.map((wall, index) => (
        <Wall key={index} position={wall.position} size={wall.size} repeatScale={wall.repeatScale} />
      ))}
    </>
  );
};

export default BoundaryWalls;
