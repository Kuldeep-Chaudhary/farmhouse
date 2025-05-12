import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import StarterPack from '../components/releasticrender/StarterPack'
import { OrbitControls } from '@react-three/drei'
import ModelLoader from '../components/modal/helmet/ModelLoader'
import PostProcessing from '../components/releasticrender/PostProcessing'

const RealsticRender: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 15, 20], fov: 75 }}
      >
        {/* Lights */}
        {/* <ambientLight intensity={1} /> */}
        <directionalLight intensity={10} position={[10,2,2]} />
        <OrbitControls
          enableZoom
          enablePan
          enableRotate
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={1.5}
        />
        

        {/* Modal and map */}
        <Suspense fallback={null}>
          <StarterPack />
          <ModelLoader />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default RealsticRender;
