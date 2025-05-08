// StarterPack.tsx
import React from "react";
import { Environment } from "@react-three/drei";

const StarterPack: React.FC = () => {
    

  return (
    <Environment
      files="/realstic-render/environmentMaps/0/2k.hdr"   //for hdr 
      // path="/realstic-render/environmentMaps/0/"  // for images or cube
      // files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]} // for images or cube
      background
    //   backgroundIntensity={10}
      environmentIntensity={2}
    />
  );
};

export default StarterPack;
