import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  View3D,
  GLTF,
  Box,
  DirectionalLight,
  useViewContext,
  useAnimationFrame,
} from "@standard/view";
import FBX from "./FBX";

const View = () => {
  return (
    <View3D orbitControls camera={{ position: [0, 100, 300] }}>
      <DirectionalLight />
      <FBX fbxURL="fbx/Samba Dancing.fbx" />
      {/* <FBX /> */}
      {/* <Box /> */}
      {/* <GLTF gltfURL="gltf/flamingo.glb" /> */}
    </View3D>
  );
};

export default View;
