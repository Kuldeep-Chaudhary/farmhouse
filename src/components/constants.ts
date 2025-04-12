
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


export const hutCameraPositions: [number, number, number][] = [
  [0, 40, 170],
  [0,20,150],
  [0,10,100],
  [0,5,70],
  // for first hut camera
  [0,5,50],
  [-hut.offsetX, 10, (hut.offsetZ - hut.offsetZ / 1.2) + 50],
  // for second hut camera
  [-hut.offsetX, 10, (hut.offsetZ - hut.offsetZ / 1.2) + 30],
  [hut.offsetX, 10, (hut.offsetZ - hut.offsetZ / 1.2) + 50],
  // for third hut camera
  [0, 10, (hut.offsetZ - hut.offsetZ / 1.2) + 30],
  [0, 10, -hut.offsetZ + 60],
  // for first hut camera
  [-hut.offsetX, 10, -hut.offsetZ + 50],
  [hut.offsetX, 10, -hut.offsetZ + 50],
  [hut.offsetX, 10, -hut.offsetZ + 50],
];
export const hutLookAtPositions: [number, number, number][] = [
  [0,0,0],
  [0,0,0],
  [0,0,0],
  [0,0,0],
  // for first hut look
  [-hut.offsetX,0,0],
  [-hut.offsetX, 0, hut.offsetZ - hut.offsetZ / 1.2],
  // for second hut look
  [hut.offsetX, 0, hut.offsetZ - hut.offsetZ / 1.2],
  [hut.offsetX, 0, hut.offsetZ - hut.offsetZ / 1.2],
  // for third hut look
  [0, 0, -hut.offsetZ],
  [-hut.offsetX, 0, -hut.offsetZ],
  // for forth hut
  [-hut.offsetX, 0, -hut.offsetZ],
  [hut.offsetX, 0, -hut.offsetZ],
  [hut.offsetX, 0, -hut.offsetZ],
];