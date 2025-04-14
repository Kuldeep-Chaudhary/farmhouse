import { MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// components/nature/WaterPlane.tsx
const WaterPlane = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef<any>();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Add more complex wave movement using sin/cos and time-based offsets
      const time = clock.getElapsedTime();
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;

      // Here we will modify the displacement of vertices to simulate waves
      const vertices = meshRef.current.geometry.attributes.position.array;
      const amplitude = 0.5; // wave height
      const frequency = 2; // wave speed

      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];

        // Apply both sine and cosine to make the waves look more realistic
        vertices[i + 2] = Math.sin(x * frequency + time) * amplitude + Math.cos(y * frequency + time) * amplitude;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true; // Update the geometry
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry rotation={[-Math.PI / 8, 0, 0]} args={[50, 50, 256, 256]} />

      <MeshDistortMaterial
        color="#4da6ff"
        distort={0.5}  // increase the distortion for more visible waves
        speed={2}      // speed of the wave motion
        roughness={0.1} // lower roughness to make it smoother (less matte)
        transparent={true} // make it semi-transparent for a water effect
        opacity={0.8} // adjust opacity for a more realistic water look
      />
    </mesh>
  );
};

export default WaterPlane;
