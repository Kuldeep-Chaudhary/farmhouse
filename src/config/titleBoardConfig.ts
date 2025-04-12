import { ground } from "./groundConfig";
import { groundWall } from "./wallConfig";

export const titleBoard = {
  textColor: "#ffffff",
  textPosition: [-21, 9, 2],
  boardColor: "#05a5a8",
  leftPillarColor: "#888888",
  rightPillarColor: "#888888",
  directionalLightPosition: [10, 10, 10],
  intensity: 1.2,
  pillarSize:[1, 1, 20, 32],
  boardSize:[50, 5, 0.5],
  leftPillarPosition:[-20, 0, 0],
  rightPillarPosition:[20, 0, 0],
  boardPosition:[0, 10, 1],
  get groupPosition(): [number, number, number] {
    return [0, 10, ground.depth / 2 - groundWall.frontSpace /2];
  },
};
