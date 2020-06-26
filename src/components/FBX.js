// FBX.tsx
import * as React from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {
  Label,
  Group,
  GroupProps,
  GroupPropTypes,
  useViewContext,
} from "@standard/view";

const { useEffect, useMemo, useRef, memo } = React;

interface FBXProps extends GroupProps {
  fbxPath?: string;
  fbxURL: string;
}

function updateAllMaterials(
  color: string,
  children: any,
  materialProps: any
): void {
  if (children == null) {
    return;
  }

  const _children = Array.isArray(children) ? children : [children];

  _children.map(object => {
    // Recurse into Groups
    if (object.constructor.name === "Group" && object.children) {
      updateAllMaterials(color, object.children, materialProps);
    }

    // @ts-ignore:TS2339 material does not exist on Object3D
    if (object.material) {
      if (color) {
        // @ts-ignore:TS2339 material does not exist on Object3D
        object.material.color.set(color);
      }
      Object.entries(materialProps).map(([propName, value]) => {
        /* eslint-disable no-param-reassign */
        // @ts-ignore:TS2339 material does not exist on Object3D
        object.material[propName] = value;
        /* eslint-enable no-param-reassign */
        return null;
      });
    }

    return null;
  });
}

interface LoadFBXProps {
  group: React.MutableRefObject<any>;
  fbxPath: string;
  fbxURL: string;
  envMap: THREE.Texture;
  castShadow: boolean;
  receiveShadow: boolean;
  materialProps: any;
}

function loadFBX({
  group,
  fbxPath,
  fbxURL,
  envMap,
  castShadow,
  receiveShadow,
  materialProps,
}: LoadFBXProps): void {
  // No FBX
  if (fbxURL == null) {
    /* eslint-disable no-console */
    console.warn("[FBX] No fbxURL");
    /* eslint-enable no-console */
    return;
  }

  // FBX
  const fbxLoader = new FBXLoader();
  fbxLoader.setPath(fbxPath);
  fbxLoader.load(fbxURL, fbx => {
    if (group.current && fbx.scene && fbx.scene.children) {
      // Remove Loading Label or Previous OBJ
      if (group.current.children) {
        group.current.children.map(child => group.current.remove(child));
      }

      // Material Props
      if (materialProps) {
        const { color, ...otherMaterialProps } = materialProps;
        updateAllMaterials(color, fbx.scene.children, otherMaterialProps);
      }

      // Env Map + Shadows
      fbx.scene.traverse(mesh => {
        /* eslint-disable no-param-reassign */
        // @ts-ignore
        if (mesh.isMesh) {
          if (envMap) {
            // @ts-ignore
            mesh.material.envMap = envMap;
          }
          mesh.castShadow = castShadow;
          mesh.receiveShadow = receiveShadow;
        }
        /* eslint-enable no-param-reassign */
      });

      // Add FBX
      group.current.add(fbx.scene);
    }
  });
}

const FBX: React.FunctionComponent<FBXProps> = function FBX({
  fbxPath = "",
  fbxURL,
  view3DEnvMap = false,
  castShadow = false,
  receiveShadow = false,
  ...otherProps
}) {
  const group = useRef();
  const { envMap } = useViewContext();

  // Material Props
  const materialProps = useMemo(
    function updateMaterialProps() {
      // No Material Props
      if (!otherProps || Object.keys(otherProps).length === 0) {
        return undefined;
      }

      // Acceptable Material Props
      const materialPropsKeys = [
        "color",
        "wireframe",
        "opacity",
        "transparent",
        "side",
        "depthWrite",
        "depthTest",
      ];

      // Extract Acceptable Props
      const props = {};
      materialPropsKeys.map(propName => {
        if (otherProps[propName]) {
          props[propName] = otherProps[propName];
        }

        return null;
      });

      return Object.keys(props).length > 0 ? props : undefined;
    },
    [otherProps]
  );

  // Environment Map
  const _envMap = useMemo(
    function updateEnvMap() {
      if (view3DEnvMap) {
        return envMap;
      }

      return null;
    },
    [view3DEnvMap, envMap]
  );

  // Loading Text
  const loadingText = useMemo(
    function updateLoadText() {
      return fbxURL || "No fbxURL";
    },
    [fbxURL]
  );

  // Load FBX
  useEffect(
    function updateFBX() {
      if (group) {
        loadFBX({
          group,
          fbxPath,
          fbxURL,
          envMap: _envMap,
          castShadow,
          receiveShadow,
          materialProps,
        });
      }
    },
    [group, fbxPath, fbxURL, _envMap, castShadow, receiveShadow, materialProps]
  );

  return (
    <Group ref={group} {...otherProps}>
      <Label text={loadingText} textColor="red" />
    </Group>
  );
};

FBX.propTypes = exact({
  fbxPath: PropTypes.string,
  fbxURL: PropTypes.string,
  ...GroupPropTypes,
});

const FBXMemo = memo(FBX);
FBXMemo.displayName = "FBX";
export default FBXMemo;