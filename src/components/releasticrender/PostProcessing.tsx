import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import * as THREE from 'three';
import GUI from 'lil-gui';

const TONE_MAPPING_MODES = {
  ACES_FILMIC: ToneMappingMode.ACES_FILMIC,
  REINHARD: ToneMappingMode.REINHARD,
  LINEAR: ToneMappingMode.LINEAR,
  CINEON: ToneMappingMode.CINEON,
};

const PostProcessing: React.FC = () => {
  // const [mode, setMode] = useState<ToneMappingMode>(ToneMappingMode.REINHARD);

  // useEffect(() => {
  //   const gui = new GUI();
  //   const params = { toneMapping: 'ACES_FILMIC' ,exposure: 10,};

  //   gui
  //     .add(params, 'toneMapping', Object.keys(TONE_MAPPING_MODES))
  //     .onChange((val: keyof typeof TONE_MAPPING_MODES) => {
  //       setMode(TONE_MAPPING_MODES[val]);
  //     });

  //   return () => gui.destroy();
  // }, []);

  return (
    <EffectComposer>
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
};
export default PostProcessing;
