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
      {/* <Box
        color="white"
        hoverColor="blue"
        onClick={() => console.log("clicked")}
        // textureURL="gsball.png"
      /> */}
      <Plane
        // textureURL="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/016cd9a5-7bee-44c1-b903-9a4867cfd9ea/d86jzvx-a4c98d43-1ea5-4f52-b830-54959f4ac788.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDE2Y2Q5YTUtN2JlZS00NGMxLWI5MDMtOWE0ODY3Y2ZkOWVhXC9kODZqenZ4LWE0Yzk4ZDQzLTFlYTUtNGY1Mi1iODMwLTU0OTU5ZjRhYzc4OC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.2oGIuzxsNV1yS0pTD7GjUJmgzotLTAW2m2RFwM1p0vM"
        textureURL="./gsball.png"
      />
      {/* <FBX fbxURL="fbx/Samba Dancing.fbx" /> */}
      {/* <GLTF gltfURL="gltf/flamingo.glb" /> */}
      <GLTF gltfURL="https://github.com/Standard-Cognition/standard-view-core/blob/master/stories/assets/gltf/flamingo.glb?raw=true" />
    </View3D>
  );
};

export default View;
