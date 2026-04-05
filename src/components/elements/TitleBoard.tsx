import { useRef, useEffect, useState, useCallback } from "react";
import { Group } from "three";
import { Text3D } from "@react-three/drei";
import GUI from "lil-gui";
import { titleBoard } from "../../config";

const TitleBoard: React.FC = () => {
  const boardRef = useRef<Group | null>(null);
  const guiRef = useRef<GUI | null>(null);

  const [params, setParams] = useState({
    color: titleBoard.textColor,
    textPosition: [...titleBoard.textPosition],
    leftPillarColor: titleBoard.leftPillarColor,
    rightPillarColor: titleBoard.rightPillarColor,
    boardColor: titleBoard.boardColor,
    groupPosition: [...titleBoard.groupPosition],
    directionalLightPosition: [...titleBoard.directionalLightPosition],
    intensity: titleBoard.intensity,
    pillarSize: [...titleBoard.pillarSize],
    boardSize: [...titleBoard.boardSize],
    boardPosition: [...titleBoard.boardPosition],
    leftPillarPosition: [...titleBoard.leftPillarPosition],
    rightPillarPosition: [...titleBoard.rightPillarPosition],
  });

  const updateParam = (key: keyof typeof params, value: any) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const posUpdate = useCallback(
    (key: keyof typeof params, index: number) => (v: number) => {
      setParams((prev) => {
        const updated = [...(prev[key] as number[])];
        updated[index] = v;
        return { ...prev, [key]: updated };
      });
    },
    []
  );

  useEffect(() => {
    if (import.meta.env.DEV) {
      const gui = new GUI();
      gui.title("TitleBoard Controls");
      gui.hide();
      guiRef.current = gui;

      const textFolder = gui.addFolder("Text3D");
      textFolder.addColor(params, "color").onChange((v: string) => updateParam("color", v));
      const textPos = textFolder.addFolder("Text Position");
      textPos.add(params.textPosition, 0, -50, 50, 1).name("X").onChange(posUpdate("textPosition", 0));
      textPos.add(params.textPosition, 1, -50, 50, 1).name("Y").onChange(posUpdate("textPosition", 1));
      textPos.add(params.textPosition, 2, -50, 50, 1).name("Z").onChange(posUpdate("textPosition", 2));

      const pillarFolder = gui.addFolder("Pillars");
      pillarFolder.addColor(params, "leftPillarColor").onChange((v: string) => updateParam("leftPillarColor", v));
      pillarFolder.addColor(params, "rightPillarColor").onChange((v: string) => updateParam("rightPillarColor", v));

      const boardFolder = gui.addFolder("Board");
      boardFolder.addColor(params, "boardColor").onChange((v: string) => updateParam("boardColor", v));

      const advancedFolder = gui.addFolder("Advanced Config");

      const groupPos = advancedFolder.addFolder("Group Position");
      groupPos.add(params.groupPosition, 0, -30, 30, 1).name("X").onChange(posUpdate("groupPosition", 0));
      groupPos.add(params.groupPosition, 1, -30, 30, 1).name("Y").onChange(posUpdate("groupPosition", 1));
      groupPos.add(params.groupPosition, 2, -30, 30, 1).name("Z").onChange(posUpdate("groupPosition", 2));

      const light = advancedFolder.addFolder("Directional Light");
      light.add(params.directionalLightPosition, 0, -50, 50, 1).name("X").onChange(posUpdate("directionalLightPosition", 0));
      light.add(params.directionalLightPosition, 1, -50, 50, 1).name("Y").onChange(posUpdate("directionalLightPosition", 1));
      light.add(params.directionalLightPosition, 2, -50, 50, 1).name("Z").onChange(posUpdate("directionalLightPosition", 2));
      light.add(params, "intensity", 0, 5, 0.1).name("Intensity").onChange((v: number) => updateParam("intensity", v));

      const pillarSize = advancedFolder.addFolder("Pillar Size");
      pillarSize.add(params.pillarSize, 0, 0.1, 10, 0.1).name("RadiusTop").onChange(posUpdate("pillarSize", 0));
      pillarSize.add(params.pillarSize, 1, 0.1, 10, 0.1).name("RadiusBottom").onChange(posUpdate("pillarSize", 1));
      pillarSize.add(params.pillarSize, 2, 1, 100, 1).name("Height").onChange(posUpdate("pillarSize", 2));
      pillarSize.add(params.pillarSize, 3, 1, 64, 1).name("RadialSegments").onChange(posUpdate("pillarSize", 3));

      const boardSize = advancedFolder.addFolder("Board Size");
      boardSize.add(params.boardSize, 0, 1, 100, 1).name("Width").onChange(posUpdate("boardSize", 0));
      boardSize.add(params.boardSize, 1, 1, 50, 1).name("Height").onChange(posUpdate("boardSize", 1));
      boardSize.add(params.boardSize, 2, 0.1, 10, 0.1).name("Depth").onChange(posUpdate("boardSize", 2));

      const boardPos = advancedFolder.addFolder("Board Position");
      boardPos.add(params.boardPosition, 0, -50, 50, 1).name("X").onChange(posUpdate("boardPosition", 0));
      boardPos.add(params.boardPosition, 1, -50, 50, 1).name("Y").onChange(posUpdate("boardPosition", 1));
      boardPos.add(params.boardPosition, 2, -50, 50, 1).name("Z").onChange(posUpdate("boardPosition", 2));

      const leftPos = advancedFolder.addFolder("Left Pillar Pos");
      leftPos.add(params.leftPillarPosition, 0, -50, 0, 1).name("X").onChange(posUpdate("leftPillarPosition", 0));
      leftPos.add(params.leftPillarPosition, 1, -10, 10, 1).name("Y").onChange(posUpdate("leftPillarPosition", 1));
      leftPos.add(params.leftPillarPosition, 2, -10, 10, 1).name("Z").onChange(posUpdate("leftPillarPosition", 2));

      const rightPos = advancedFolder.addFolder("Right Pillar Pos");
      rightPos.add(params.rightPillarPosition, 0, 0, 50, 1).name("X").onChange(posUpdate("rightPillarPosition", 0));
      rightPos.add(params.rightPillarPosition, 1, -10, 10, 1).name("Y").onChange(posUpdate("rightPillarPosition", 1));
      rightPos.add(params.rightPillarPosition, 2, -10, 10, 1).name("Z").onChange(posUpdate("rightPillarPosition", 2));

      return () => gui.destroy();
    }
  }, [params, posUpdate]);

  const handleBoardClick = () => {
    if (import.meta.env.DEV && guiRef.current) {
      guiRef.current._hidden ? guiRef.current.show() : guiRef.current.hide();
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={params.directionalLightPosition as any}
        intensity={params.intensity}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <group ref={boardRef} position={params.groupPosition as any}>
        <mesh position={params.leftPillarPosition as any} castShadow receiveShadow>
          <cylinderGeometry args={params.pillarSize as any} />
          <meshStandardMaterial color={params.leftPillarColor} />
        </mesh>

        <mesh position={params.rightPillarPosition as any} castShadow receiveShadow>
          <cylinderGeometry args={params.pillarSize as any} />
          <meshStandardMaterial color={params.rightPillarColor} />
        </mesh>

        <mesh
          position={params.boardPosition as any}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            if (e.altKey) handleBoardClick();
          }}
        >
          <boxGeometry args={params.boardSize as any} />
          <meshStandardMaterial color={params.boardColor} />
        </mesh>

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
          position={params.textPosition as any}
          castShadow
          receiveShadow
        >
          C H A U D H A R Y ' S   F A R M H O U S E
          <meshStandardMaterial color={params.color} metalness={0.3} roughness={0.4} />
        </Text3D>
      </group>
    </>
  );
};

export default TitleBoard;
