import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Water } from 'three-stdlib';
import { ground } from '../../config';

export const WaterPlane: React.FC = () => {
  const waterRef = useRef<THREE.Group>(null);

  const waterNormals = useLoader(THREE.TextureLoader, '/texture/water/waternormals.jpg');

  useEffect(() => {
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    const waterGeometry = new THREE.PlaneGeometry(ground.width, ground.depth);

    const water = new Water(waterGeometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(1, 1, 1).normalize(),
      sunColor: 0xffffff,
      waterColor: 0x1f1f1f,
      distortionScale: 0.1,
      fog: false,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });

    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.14;
    water.renderOrder = 1;

    if (waterRef.current) {
      waterRef.current.clear();
      waterRef.current.add(water);
    }

  }, [waterNormals]);

  // Animate the water by updating its shader time uniform
  useFrame((_, delta) => {
    const water = waterRef.current?.children[0] as any;
    if (water?.material?.uniforms?.time) {
      water.material.uniforms.time.value += delta;
    }
  });

  return <group ref={waterRef} />;
};
