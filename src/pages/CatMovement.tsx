import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Rope from "../components/modal/Rope";

const CatMovement: React.FC = () => {
  const [isNight, setIsNight] = useState(false); // 🌙 Night toggle


  const skySunPosition = isNight ? [100, -5, 100] : [100, 10, -300];
  const backgroundColor = isNight ? "#0a0a1a" : "skyblue"; // optional bg color change

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* 🎨 Canvas */}
      <Canvas
        style={{ width: "100%", height: "100%", background: backgroundColor }}
        camera={{ position: [0, 40, 160], fov: 75 }}
      >
        
        {/* 💡 Lights */}
        <ambientLight intensity={isNight ? 0.3 : 1} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={isNight ? 0.1 : 1.5}
        />
        <Physics gravity={[0, -9.82, 0]} fixedTimeStep={1 / 60} maxSubSteps={10}> 

        <Rope/>

       


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

export default CatMovement;
