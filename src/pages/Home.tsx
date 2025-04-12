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

const Home: React.FC = () => {
  const [isRaining, setIsRaining] = useState(false);
  const [isNight, setIsNight] = useState(false); // 🌙 Night toggle

  const skySunPosition = isNight ? [100, 0, 100] : [100, 80, -300];
  const backgroundColor = isNight ? "#0a0a1a" : "skyblue"; // optional bg color change

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* ☀️🌧️ UI Buttons */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 100, display: "flex", gap: "10px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => setIsRaining(prev => !prev)}
        >
          {isRaining ? "☀️ Stop Rain" : "🌧️ Start Rain"}
        </button>

        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => setIsNight(prev => !prev)}
        >
          {isNight ? "🌞 Day" : "🌙 Night"}
        </button>
      </div>

      {/* 🎨 Canvas */}
      <Canvas
        style={{ width: "100%", height: "100%", background: backgroundColor }}
        camera={{ position: [0, 40, 160], fov: 75 }}
      >
        <CameraScroller />
        <Sky sunPosition={skySunPosition} turbidity={8} />
        {/* <SmoothSky targetPosition={skySunPosition} turbidity={8} /> */}


        <Rain isActive={isRaining} />

        {/* 💡 Lights */}
        <ambientLight intensity={isNight ? 0.3 : 1} />
        <directionalLight position={[10, 10, 10]} intensity={isNight ? 0.4 : 1.5} />

        {/* 🏗️ Scene */}
        <group rotation={[0, Math.PI, 0]}>
          <BoundaryWalls />
          <Ground />
          <Gate />
        </group>
        <TitleBoard />
        {hutPositions.map((pos, index) => (
          <Hut key={index} position={pos} />
        ))}

        <OrbitControls
          enableZoom={false}
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
