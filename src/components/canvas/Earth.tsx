import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";
import { asset } from "../../data";

const Earth = () => {
  const earth = useGLTF(asset("planet/scene.gltf"));
  return <primitive object={earth.scene} scale={2.1} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => (
  <Canvas
    shadows
    frameloop="demand"
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true }}
    camera={{ fov: 45, near: 0.1, far: 200, position: [-5, 3.5, 8] }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      <Earth />
      <Preload all />
    </Suspense>
  </Canvas>
);

export default EarthCanvas;
