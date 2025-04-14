// components/nature/WaveShaderMaterial.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WaveShaderMaterial = () => {
  const materialRef = useRef<any>();

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float frequency = 2.0;
      float amplitude = 0.5;

      pos.z += sin(pos.x * frequency + uTime) * amplitude;
      pos.z += cos(pos.y * frequency + uTime * 1.5) * amplitude;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh>
      <planeGeometry  rotation={[-Math.PI / 2, 0, 0]} args={[50, 50, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        args={[
          {
            uniforms: {
              uTime: { value: 0 },
              color: { value: new THREE.Color('#4da6ff') },
            },
            vertexShader,
            fragmentShader,
          },
        ]}
      />
    </mesh>
  );
};

export default WaveShaderMaterial;
