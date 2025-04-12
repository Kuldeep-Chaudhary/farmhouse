import { ground } from "./groundConfig";
import { Vector3Tuple } from "three";

export const hut = {
  width: 30,
  depth: 30,
  height: 15,
  roofHeight: 10,
  offsetX: ground.width / 3.5,
  offsetZ: ground.depth / 3,
  wallThickness: 0.5,
  wallHeight: 5,
  doorWidth: 6,
  doorHeight: 10,

  get frontWallWidth() {
    return (this.width - this.doorWidth) / 2;
  },

  get frontWallPosition() {
    return this.width / 2 - this.doorWidth;
  },
  get roofSize(): [number, number] {
    return [this.width / 1.2, this.roofHeight];
  },

  get roofPosition(): [number, number, number] {
    return [0, this.height + this.roofHeight / 2, 0];
  },
  get doorSize(): [number, number, number] {
    return [this.doorWidth, this.doorHeight, 0.2];
  },

  get doorPosition(): [number, number, number] {
    return [0, this.doorHeight / 2, this.depth / 2 + 0.01];
  }
};

export const hutPositions: [number, number, number][] = [
  [-hut.offsetX, 0, hut.offsetZ - hut.offsetZ / 1.2],
  [hut.offsetX, 0, hut.offsetZ - hut.offsetZ / 1.2],
  [-hut.offsetX, 0, -hut.offsetZ],
  [hut.offsetX, 0, -hut.offsetZ],
];

type HutWall = {
    name: string;
    position: [number, number, number];
    rotation: [number, number, number];
    size: [number, number, number];
  };

export const hutWalls: HutWall[] = [
  {
    name: "Front Left Wall",
    position: [-hut.frontWallPosition, hut.height / 2, hut.depth / 2],
    rotation: [0, 0, 0],
    size: [hut.frontWallWidth, hut.height, hut.wallThickness],
  },
  {
    name: "Front Right Wall",
    position: [hut.frontWallPosition, hut.height / 2, hut.depth / 2],
    rotation: [0, 0, 0],
    size: [hut.frontWallWidth, hut.height, hut.wallThickness],
  },
  {
    name: "Back Wall",
    position: [0, hut.height / 2, -hut.depth / 2],
    rotation: [0, 0, 0],
    size: [hut.width, hut.height, hut.wallThickness],
  },
  {
    name: "Left Side Wall",
    position: [-hut.width / 2, hut.height / 2, 0],
    rotation: [0, Math.PI / 2, 0],
    size: [hut.depth, hut.height, hut.wallThickness],
  },
  {
    name: "Right Side Wall",
    position: [hut.width / 2, hut.height / 2, 0],
    rotation: [0, Math.PI / 2, 0],
    size: [hut.depth, hut.height, hut.wallThickness],
  },
];
