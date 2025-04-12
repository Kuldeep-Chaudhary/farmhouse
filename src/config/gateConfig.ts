import { ground } from "./groundConfig";
import { groundWall } from "./wallConfig";

export const boundaryGate = {
    width: 10,
    thickness: 1,
    angle: Math.PI / 2,
    speed:0.05,
    get position(): [number, number, number] {
        return [0, groundWall.height / 2, -(ground.depth / 2 - groundWall.frontSpace)];
    },
    get leftGatePosition(): [number, number, number] {
        return [-this.width, 0, 0];
    },
    get rightGatePosition(): [number, number, number] {
        return [this.width, 0, 0];
    },
    get leftMeshOffset(): [number, number, number] {
        return [this.width / 2, 0, 0];
    },
    get rightMeshOffset(): [number, number, number] {
        return [-this.width / 2, 0, 0];
    },
}