import { boundaryGate } from "./gateConfig";
import { ground } from "./groundConfig";
import { Vector3Tuple } from "three";


export const groundWall = {
  thickness: 1,
  height: 5,
  frontSpace: 60,

  get enclosedDepth() {
    return ground.depth - this.frontSpace;
  },

  get frontWallWidth() {
    return (ground.width - boundaryGate.width * 2) / 2;
  },

  get frontWallPosition() {
    return this.frontWallWidth / 2 + boundaryGate.width;
  },
};

type WallConfig = {
  name: string;
  position: Vector3Tuple;
  size: [number, number, number];
  repeatScale: [number,number];
};

export const boundaryWalls: WallConfig[] = [
  {
    name: "Left Front Wall",
    position: [
      groundWall.frontWallPosition,
      groundWall.height / 2,
      -ground.depth / 2 + groundWall.frontSpace,
    ],
    size: [groundWall.frontWallWidth, groundWall.height, groundWall.thickness],
    repeatScale: [3,1],
  },
  {
    name: "Right Front Wall",
    position: [
      -groundWall.frontWallPosition,
      groundWall.height / 2,
      -ground.depth / 2 + groundWall.frontSpace,
    ],
    size: [groundWall.frontWallWidth, groundWall.height, groundWall.thickness],
    repeatScale: [3,1],
  },
  {
    name: "Back Wall",
    position: [0, groundWall.height / 2, ground.depth / 2],
    size: [ground.width, groundWall.height, groundWall.thickness],
    repeatScale: [4,1],
  },
  {
    name: "Left Side Wall",
    position: [
      -ground.width / 2 + groundWall.thickness / 2,
      groundWall.height / 2,
      groundWall.frontSpace / 2,
    ],
    size: [
      groundWall.thickness,
      groundWall.height,
      groundWall.enclosedDepth,
    ],
    repeatScale: [6,1],
  },
  {
    name: "Right Side Wall",
    position: [
      ground.width / 2 - groundWall.thickness / 2,
      groundWall.height / 2,
      groundWall.frontSpace / 2,
    ],
    size: [
      groundWall.thickness,
      groundWall.height,
      groundWall.enclosedDepth,
    ],
    repeatScale: [6,1],
  },
];
