import React from "react";
import { useBox } from "@react-three/cannon";

const PhysicsGround: React.FC = () => {
  // Define the physics properties for the ground (static object)
  const [ref] = useBox(() => ({
    mass: 0, // Static, so mass is 0
    position: [0, -2, 0], // Place the ground at the bottom
    args: [10, 1, 10], // Size of the ground
    friction: 1, // Ground friction (you can adjust as needed)
    restitution: 0.2, // Bounciness (you can adjust this too)
  }));

  return (
    <mesh ref={ref} receiveShadow castShadow={false}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="transparent" opacity={0} />
    </mesh>
  );
};

export default PhysicsGround;
