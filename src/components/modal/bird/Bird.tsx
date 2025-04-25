import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'

type BirdProps = {
  isActive: boolean
}

const Bird = ({ isActive }: BirdProps) => {
  const birdRef = useRef<Group>(null)
  const { scene, animations } = useGLTF('/modal/bird/bird.glb')
  const { actions, names } = useAnimations(animations, birdRef)

  const radius = 150
  const speed = 0.05
  const angleRef = useRef(0)
  const height = 200

  const currentHeight = useRef(height)
  const targetHeight = useRef(height)

  useEffect(() => {
    if (actions && names.length > 0) {
      actions[names[0]]?.play()
    }
  }, [actions, names])

  useEffect(() => {
    targetHeight.current = isActive ? 50 : height
  }, [isActive])

  useFrame(() => {
    if (!birdRef.current) return

    // Smoothly adjust height
    currentHeight.current += (targetHeight.current - currentHeight.current) * 0.05

    angleRef.current += speed
    const x = radius * Math.cos(angleRef.current)
    const z = radius * Math.sin(angleRef.current)

    birdRef.current.position.set(x, currentHeight.current, z)
    birdRef.current.lookAt(0, currentHeight.current, 0)
  })

  return (
    <group ref={birdRef} scale={0.1}>
      <primitive object={scene} />
    </group>
  )
}

export default Bird
