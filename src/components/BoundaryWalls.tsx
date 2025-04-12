import React from "react";
import Wall from "./elements/Wall";
import {boundaryWalls } from "../config";
import colorGroundImg from '/texture/roof/roof_tiles_diff_1k.jpg'
import armGroundImg from '/texture/roof/roof_tiles_arm_1k.jpg'
import normalGroundImg from '/texture/roof/roof_tiles_nor_gl_1k.jpg'

const BoundaryWalls: React.FC = () => {

  return (
    <>
      {boundaryWalls.map((wall, index) => (
        <Wall key={index} 
        position={wall.position} 
        size={wall.size} 
        repeatScale={wall.repeatScale} 
        map={colorGroundImg}
        aoMap={armGroundImg}
        normalMap={normalGroundImg}/>
      ))}
    </>
  );
};

export default BoundaryWalls;
