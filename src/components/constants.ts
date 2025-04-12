
// ground details
export const ground = {
    width: 200,
    depth: 250,
};

// wall details
export const groundWall = {
    thickness : 1,
    height:5,
    frontSpace:60,
    get enclosedDepth(){
        return ground.depth - this.frontSpace
    },
    get frontWallWidth() {
        return (ground.width - boundaryGate.width * 2) / 2;
      },
      get frontWallPosition() {
        return this.frontWallWidth / 2 + boundaryGate.width;
      } 
}


// gate details
export const boundaryGate = {
    width : 10,
    thickness:1,
    angle : Math.PI /2, // 90 degree
    position : ground.depth / 2 - groundWall.frontSpace
}


// hut details
export const hut = {
    width: 30,
    depth:30,
    height:15,
    roofHeight:10,
    offsetX:ground.width / 3.5,
    offsetZ:ground.depth / 3,
    wallThickness: 0.5,
    wallHeight:5,
    doorWidth:6,
    doorHeight:10,
}
// hut position (typescript)
export const hutPositions: [number, number, number][] = [
    [-hut.offsetX, 0, hut.offsetZ - hut.offsetZ / 1.2],
    [hut.offsetX, 0, hut.offsetZ - hut.offsetZ / 1.2],
    [-hut.offsetX, 0, -hut.offsetZ],
    [hut.offsetX, 0, -hut.offsetZ ],
];

