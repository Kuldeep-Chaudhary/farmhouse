import React, { useEffect, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { TextureLoader } from 'three'

const EnvirmentMap = () => {
  const [envMap, setEnvMap] = useState<any>(null)

  // Try loading the HDR environment map
  useEffect(() => {
    const loadEnvironmentMap = async () => {
      try {
        const loader = new RGBELoader()
        const map = await loader.loadAsync('path/to/your/environment-map.hdr') // Update path to your file
        setEnvMap(map)
      } catch (error) {
        console.error('Error loading HDR environment map:', error)
      }
    }

    loadEnvironmentMap()
  }, [])

  if (!envMap) {
    return <div>Loading...</div> // Show a loading message until the environment map is ready
  }

  return (
    <div className='w-full' style={{ height: '100vh' }}>
      <Canvas>
        {/* Apply the custom environment map */}
        <Environment
          background
          files={envMap}
        />
        
        {/* Add a simple object to interact with */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Enable mouse controls */}
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default EnvirmentMap
