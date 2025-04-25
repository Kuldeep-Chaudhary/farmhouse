import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import Ground from "../components/Ground";
import BoundaryWalls from "../components/BoundaryWalls";
import Gate from "../components/Gate";
import Hut from "../components/Hut";
import { hutPositions } from "../components/constants";
import TitleBoard from "../components/elements/TitleBoard";
import CameraScroller from "../components/fov/CameraScroller";
import Rain from "../components/nature/Rain";
import SmoothSky from "../components/nature/SmoothSky";
import {WaterPlane} from "../components/nature/WaterPlane";
import Tree from "../components/tree/Tree";
import { titleBoard } from "../config";
import HailStones from "../components/physics/HailStones";
import { Physics } from "@react-three/cannon";
import PhysicsGround from "../components/physics/PhysicsGround";
import InfiniteGround from "../components/InfiniteGround";
import Bird from "../components/modal/bird/Bird";

const Home: React.FC = () => {
  const [isRaining, setIsRaining] = useState(false);
  const [isNight, setIsNight] = useState(false); // 🌙 Night toggle
  const [isStorm, setIsStorm] = useState(false); // 🌪️ Storm state
  const [isHailstoneActive, setIsHailstoneActive] = useState(false);
  const [Phoenix,setPhoenix] = useState(false)


  const skySunPosition = isNight ? [100, -5, 100] : [100, 10, -300];
  const backgroundColor = isNight ? "#0a0a1a" : "skyblue"; // optional bg color change

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* ☀️🌧️ UI Buttons */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 100,
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsRaining((prev) => !prev);
            setIsStorm((prev) => !prev);
          }}
        >
          {isRaining ? "☀️" : "🌧️ "}
        </button>

        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => setIsNight((prev) => !prev)}
        >
          {isNight ? "🌞 " : "🌙 "}
        </button>
            
      <button
          onClick={() => setIsHailstoneActive((prev) => !prev)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}>
        ⚪
      </button>    <button
          onClick={() => setPhoenix((prev) => !prev)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}>
        🐦
      </button>
      </div>

      {/* 🎨 Canvas */}
      <Canvas
        style={{ width: "100%", height: "100%", background: backgroundColor }}
        camera={{ position: [0, 40, 160], fov: 75 }}
      >
        {/* <CameraScroller /> */}
        <Sky
          sunPosition={skySunPosition}
          turbidity={8}
          rayleigh={isNight ? 1 : 1.3}
          mieCoefficient={isNight ? 0 : 0.001}
          mieDirectionalG={isNight ? 0 : 0.8}
        />
        {/* <SmoothSky targetPosition={skySunPosition} turbidity={8} /> */}
        
        <Physics gravity={[0, -9.82, 0]} fixedTimeStep={1 / 60} maxSubSteps={10}> 

        <Rain isActive={isRaining} />
        <WaterPlane />

        {/* 💡 Lights */}
        <ambientLight intensity={isNight ? 0.3 : 1} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={isNight ? 0.1 : 1.5}
        />

      
        <TitleBoard />
        {hutPositions.map((pos, index) => (
          <Hut key={index} position={pos} />
        ))}
        {/* trees  */}
        <Tree key="tree1" position={[-80, -1, titleBoard.groupPosition[2]]} isStorm={isStorm}/>
        <Tree key="tree2" position={[80, -1, titleBoard.groupPosition[2]]} isStorm={isStorm}/>
        <Bird isActive={Phoenix} targetPosition={{ x: -80, y: -1, z: titleBoard.groupPosition[2] }} />

            {/* 🏗️ Scene */}
        <group rotation={[0, Math.PI, 0]}>
          <BoundaryWalls />
          <Ground />
          {/* <InfiniteGround/> */}
          <Gate />
        </group>
        <HailStones isActive={isHailstoneActive}/>
        </Physics>
        
        <OrbitControls
          enableZoom
          enablePan={true}
          enableRotate
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={1.5}
        />
      </Canvas>
    </div>
  );
};

export default Home;
