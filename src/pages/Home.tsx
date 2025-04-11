import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Ground from "../components/Ground";
import BoundaryWalls from "../components/BoundaryWalls";
import Gate from "../components/Gate";
import Hut from "../components/Hut";
import {hutOffsetX ,hutOffsetZ} from "../components/constants";
import TitleBoard from "../components/elements/TitleBoard";
import FovController from "../components/fov/FovController";
import CameraScroller from "../components/fov/CameraScroller";
import CameraLogger from "../components/fov/CameraLogger";


// gsap


const hutPositions: [number, number, number][] = [
  [-hutOffsetX, 0, -hutOffsetZ],
  [hutOffsetX, 0, -hutOffsetZ ],
  [-hutOffsetX, 0, hutOffsetZ - hutOffsetZ / 1.2],
  [hutOffsetX, 0, hutOffsetZ - hutOffsetZ / 1.2],
];
// hut details end

const Home: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        style={{ width: "100%", height: "100%", background: "skyblue" }}
        camera={{ position: [0, 40, 160], fov: 75 }}
      >
        {/* fov controller */}
        {/* <FovController/> */}
        <CameraScroller/>
        {/* <CameraLogger/> */}
        {/* Lights */}
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />

        {/* Scene */}
        <group rotation={[0, Math.PI, 0]}>
          <BoundaryWalls />
          <Ground />
          <Gate />
        </group>
        <TitleBoard/>

        {/* hut start */}
        {hutPositions.map((pos, index) => (
        <Hut key={index} position={pos} />
         ))}
        {/* hut start */}

        {/* Camera Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan
          enableRotate
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={1.5}
        />
      </Canvas>
    </div>
  );
};

export default Home;
