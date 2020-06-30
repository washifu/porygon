import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  View3D,
  GLTF,
  Box,
  OBJ,
  DirectionalLight,
  AmbientLight,
  SpotLight,
  Axis,
  useViewContext,
  useAnimationFrame,
} from "@standard/view";
import FBX from "./FBX";

const View = () => {
  return (
    <View3D
      orbitControls
      backgroundEquirectangularTextureURL="backgrounds/palace_watermarked.jpg"
      camera={{ position: [0, 2, 10] }}
      controls={{ enableZoom: false }}
    >
      <SpotLight intensity={0.7} color="cyan" position={[0, 0, 10]} />
      <SpotLight intensity={0.4} color="cyan" position={[0, 0, -10]} />
      <SpotLight intensity={0.7} color="snow" position={[0, 0, 10]} />
      <SpotLight intensity={0.4} color="sand" position={[0, 0, -10]} />
      <SpotLight intensity={0.6} color="tan" position={[0, 0, -10]} />
      <SpotLight intensity={0.3} color="tan" position={[0, 0, 10]} />
      <DirectionalLight intensity={0.3} position={[0, 1, 0]} />
      <AmbientLight intensity={0.2} />
      <FBX
        scale={[0.1, 0.1, 0.1]}
        position={[0, -12, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fbxURL="fbx/sophia.fbx"
      />
      <FBX
        scale={[0.1, 0.1, 0.1]}
        position={[0, -10, 50]}
        // rotation={[-Math.PI / 2, 0, 0]}
        fbxURL="fbx/samba.fbx"
      />
      {/* <Axis /> */}
      {/* <Box /> */}
      {/* <GLTF gltfURL="gltf/flamingo.glb" /> */}
    </View3D>
  );
};

export default View;
