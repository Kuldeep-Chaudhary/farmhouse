import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useBox, usePointToPointConstraint, useSphere } from '@react-three/cannon';
import * as THREE from 'three';

const SEGMENTS = 10;
const TOTAL_LENGTH = 20;
const SEGMENT_LENGTH = TOTAL_LENGTH / SEGMENTS;
const FIXED_Z = -2;

const Rope = () => {
  const { mouse } = useThree();
  const curveRef = useRef<any>(null);
  const segmentRefs = useRef<any[]>([]);

  // Top segment (kinematic)
  const [topRef, topApi] = useBox(() => ({
    type: 'Kinematic',
    position: [0, 40, FIXED_Z],
    args: [0.1, SEGMENT_LENGTH / 2, 0.1],
  }));

  // Rope segments
  const segmentBodies = Array.from({ length: SEGMENTS }, (_, i) =>
    useBox(() => ({
      mass: 0.2,
      position: [0, 40 - (i + 1) * SEGMENT_LENGTH, FIXED_Z],
      args: [0.05, SEGMENT_LENGTH / 2, 0.05],
      linearDamping: 0.05, // Reduced for more swing
      angularDamping: 0.05,
    }))
  );

  // Ball
  const [ballRef, ballApi] = useSphere(() => ({
    mass: 2,
    position: [0, 40 - (SEGMENTS + 1) * SEGMENT_LENGTH, FIXED_Z],
    args: [0.5],
    linearDamping: 0.05,
    angularDamping: 0.05,
  }));

  // Constraints
  segmentBodies.forEach(([refA], i) => {
    if (i === 0) {
      usePointToPointConstraint(topRef, refA, {
        pivotA: [0, -SEGMENT_LENGTH / 2, 0],
        pivotB: [0, SEGMENT_LENGTH / 2, 0],
      });
    } else {
      usePointToPointConstraint(segmentBodies[i - 1][0], refA, {
        pivotA: [0, -SEGMENT_LENGTH / 2, 0],
        pivotB: [0, SEGMENT_LENGTH / 2, 0],
      });
    }
  });
  usePointToPointConstraint(segmentBodies[SEGMENTS - 1][0], ballRef, {
    pivotA: [0, -SEGMENT_LENGTH / 2, 0],
    pivotB: [0, 0.5, 0],
  });

  // Initialize spline geometry
  useEffect(() => {
    const initialPoints = Array.from({ length: SEGMENTS + 2 }, (_, i) =>
      new THREE.Vector3(0, 40 - i * SEGMENT_LENGTH, FIXED_Z)
    );
    const initialCurve = new THREE.CatmullRomCurve3(initialPoints, false, 'catmullrom', 0.5);
    if (curveRef.current) {
      curveRef.current.geometry = new THREE.TubeGeometry(initialCurve, 64, 0.1, 8, false);
    }
  }, []);

  // Mouse movement and spline update
  useFrame(() => {
    // Simplified mouse-to-world conversion
    const mouseWorld = new THREE.Vector3(mouse.x * 10, mouse.y * 10 + 40, FIXED_Z);
    topApi.position.set(mouseWorld.x, mouseWorld.y, FIXED_Z);

    // Create spline points
    const points = segmentBodies.map((_, i) =>
      segmentRefs.current[i]?.position
        ? segmentRefs.current[i].position.clone()
        : new THREE.Vector3(0, 40 - (i + 1) * SEGMENT_LENGTH, FIXED_Z)
    );
    points.unshift(
      topRef.current?.position ? topRef.current.position.clone() : new THREE.Vector3(0, 40, FIXED_Z)
    );
    points.push(
      ballRef.current?.position
        ? ballRef.current.position.clone()
        : new THREE.Vector3(0, 40 - (SEGMENTS + 1) * SEGMENT_LENGTH, FIXED_Z)
    );

    // Update spline
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
    if (curveRef.current) {
      curveRef.current.geometry.dispose();
      curveRef.current.geometry = new THREE.TubeGeometry(curve, 64, 0.1, 8, false);
    }
  });

  // Initial swing
  useEffect(() => {
    ballApi.velocity.set(2, 0, 0);
  }, [ballApi]);

  return (
    <>
      {/* Invisible physics bodies */}
      <mesh ref={topRef} visible={false}>
        <boxGeometry args={[0.1, SEGMENT_LENGTH, 0.1]} />
        <meshStandardMaterial />
      </mesh>
      {segmentBodies.map((_, i) => (
        <mesh ref={(el) => { segmentRefs.current[i] = el; }} key={i} visible={false}>
          <boxGeometry args={[0.05, SEGMENT_LENGTH, 0.05]} />
          <meshStandardMaterial />
        </mesh>
      ))}
      {/* Ball */}
      <mesh ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Smooth rope */}
      <mesh ref={curveRef}>
        <tubeGeometry />
        <meshStandardMaterial color="brown" />
      </mesh>
    </>
  );
};

export default Rope;