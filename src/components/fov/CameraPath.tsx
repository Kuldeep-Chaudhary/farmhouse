import * as THREE from "three";
import { CatmullRomCurve3 } from "three";
import { useMemo } from "react";
import { hutCameraPositions } from "../constants"; // Import dynamic camera positions

export const useCameraPath = () => {
  const curve = useMemo(() => {
    const points = hutCameraPositions.map(
      (pos) => new THREE.Vector3(pos[0], pos[1], pos[2])
    );

    return new CatmullRomCurve3(points, false, "catmullrom", 0.5);
  }, []);

  return curve;
};

// Optional: Visual Debug Helper
export const PathHelper = ({ curve }: { curve: THREE.Curve<THREE.Vector3> }) => {
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial attach="material" color="hotpink" />
    </line>
  );
};
