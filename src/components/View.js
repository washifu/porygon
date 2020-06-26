import React from "react";
// import * as THREE from "three";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { View3D, Box, GLTF, Plane } from "@standard/view";
// import FBX from "./FBX";

const View = () => {
  // const loader = new FBXLoader();
  // loader.load("fbx/Samba Dancing.fbx", obj => {
  //   const mixer = new THREE.AnimationMixer(obj);
  //   const action = mixer.clipAction(obj.animation[0]);
  //   action.play();
  //   obj.traverse(child => {
  //     if (child.isMesh) {
  //       child.castShadow = true;
  //       child.receiveShadow = true;
  //     }
  //   });

  //   // scene.add(obj);
  // });

  return (
    <View3D orbitControls backgroundColor="red">
      <Box
        color="white"
        hoverColor="blue"
        onClick={() => console.log("clicked")}
        textureURL="gsball.png"
      />
      {/* <FBX fbxURL="fbx/Samba Dancing.fbx" /> */}
      <GLTF gltfURL="gltf/flamingo.glb" />
    </View3D>
  );
};

export default View;
