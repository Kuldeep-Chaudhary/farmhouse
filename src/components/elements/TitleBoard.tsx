import { useRef, useEffect, useState } from "react";
import { Group } from "three";
import { Text3D } from "@react-three/drei";
import GUI from "lil-gui";
import { gatePosition, frontSpace } from "../constants";

const TitleBoard: React.FC = () => {
  const boardRef = useRef<Group | null>(null);
  const guiRef = useRef<GUI | null>(null); // 👈 GUI reference

  const [params, setParams] = useState({
    color: "#ffffff",
    posX: -21,
    posY: 9,
    posZ: 2,
    leftPillarColor: "#888888",
    rightPillarColor: "#888888",
    boardColor: "#05a5a8",
  });

  const paramsRef = useRef(params);

  useEffect(() => {
    const gui = new GUI();
    gui.title("TitleBoard Controls");
    gui.hide(); // 👈 Hide GUI initially
    guiRef.current = gui;

    const updateParam = (key: keyof typeof params, value: any) => {
      paramsRef.current = { ...paramsRef.current, [key]: value };
      setParams(paramsRef.current);
    };

    // Text controls
    const textFolder = gui.addFolder("Text3D");
    textFolder.addColor(paramsRef.current, "color").onChange((v) => updateParam("color", v));
    textFolder.add(paramsRef.current, "posX", -30, 30, 1).onChange((v) => updateParam("posX", v));
    textFolder.add(paramsRef.current, "posY", -10, 10, 1).onChange((v) => updateParam("posY", v));
    textFolder.add(paramsRef.current, "posZ", 0, 10, 1).onChange((v) => updateParam("posZ", v));

    // Pillar controls
    const pillarFolder = gui.addFolder("Pillars");
    pillarFolder.addColor(paramsRef.current, "leftPillarColor").onChange((v) => updateParam("leftPillarColor", v));
    pillarFolder.addColor(paramsRef.current, "rightPillarColor").onChange((v) => updateParam("rightPillarColor", v));

    // Board controls
    const boardFolder = gui.addFolder("Board");
    boardFolder.addColor(paramsRef.current, "boardColor").onChange((v) => updateParam("boardColor", v));

    return () => gui.destroy();
  }, []);

  // 👇 Toggle GUI on board click
  const handleBoardClick = () => {
    if (guiRef.current) {
      const isHidden = guiRef.current._hidden; // internal state of lil-gui
      isHidden ? guiRef.current.show() : guiRef.current.hide();
    }
  };

//   you want you open lil-gui click on board

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[10, 10, 10]} intensity={1.2} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

      <group ref={boardRef} position={[0, 10, gatePosition + frontSpace / 2]}>
        {/* Left Pillar */}
        <mesh position={[-20, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, 20, 32]} />
          <meshStandardMaterial color={params.leftPillarColor} />
        </mesh>

        {/* Right Pillar */}
        <mesh position={[20, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, 20, 32]} />
          <meshStandardMaterial color={params.rightPillarColor} />
        </mesh>

        {/* Board - click to toggle GUI */}
        <mesh
          position={[0, 10, 1]}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            if (e.altKey) {
              handleBoardClick(); // ✅ Now it works!
            }
          }}
        >
          <boxGeometry args={[50, 5, 0.5]} />
          <meshStandardMaterial color={params.boardColor} />
        </mesh>

        {/* Text */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[params.posX, params.posY, params.posZ]}
          castShadow
          receiveShadow
        >
          C H A U D H A R Y   F A R M H O U S E
          <meshStandardMaterial color={params.color} metalness={0.3} roughness={0.4} />
        </Text3D>
      </group>
    </>
  );
};

export default TitleBoard;
