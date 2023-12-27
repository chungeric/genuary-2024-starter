/* ref: https://github.com/pmndrs/drei?tab=readme-ov-file#shadermaterial */
/* example: https://codesandbox.io/s/ni6v4 */

import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const CustomShaderMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(1.0, 0.0, 0.0) },
  // vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vUv, pow(sin(uTime), 2.0), 1.0);
    }
  `
);

// declaratively
extend({ CustomShaderMaterial });
