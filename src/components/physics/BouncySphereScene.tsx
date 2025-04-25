import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, useSphere, usePlane } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'

const Ground = () => {
  usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: {
      restitution: 0.9, // 💥 Add bounce to ground
    }
  }))
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="lightgreen" />
    </mesh>
  )
}

const BouncySphere = () => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 10, 0],
    args: [1],
    material: {
      restitution: 0.9, // 💥 Add bounce to sphere
    }
  }))

  useEffect(() => {
    // Optional: give it some initial velocity for better bounce
    api.velocity.set(0, -10, 0)
  }, [api])

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export const BouncySphereScene: React.FC = () => {
  return (
    <Canvas shadows camera={{ position: [0, 15, 25], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} castShadow />
      <Physics gravity={[0, -9.82, 0]}>
        <Ground />
        <BouncySphere />
      </Physics>
      <OrbitControls />
    </Canvas>
  )
}
