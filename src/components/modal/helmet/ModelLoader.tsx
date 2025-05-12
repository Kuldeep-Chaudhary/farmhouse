// ModelLoader.tsx
import React, { Suspense } from "react";
import { useGLTF } from "@react-three/drei";

const ModelLoader: React.FC = () => {
  const gltf = useGLTF("/realstic-render/models/FlightHelmet/glTF/FlightHelmet.gltf");

  return <primitive object={gltf.scene} scale={10} position={[0, -1, 0]}/>;
};

export default ModelLoader;

// Required for GLTF preloading optimization
useGLTF.preload("/realstic-render/models/FlightHelmet/glTF/FlightHelmet.gltf");
