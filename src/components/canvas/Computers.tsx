import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";
import { asset } from "../../data";

const MODEL = asset("desktop_pc/scene.gltf");

const Computers = ({ compact }: { compact: boolean }) => {
  const computer = useGLTF(MODEL);
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={compact ? 0.6 : 0.75}
        position={compact ? [0, -3.2, -1.6] : [0, -3.75, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = ({ compact }: { compact: boolean }) => (
  <Canvas
    frameloop="demand"
    shadows
    dpr={[1, 2]}
    camera={{ position: [20, 3, 5], fov: 25 }}
    gl={{ preserveDrawingBuffer: true }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      <Computers compact={compact} />
    </Suspense>
    <Preload all />
  </Canvas>
);

export default ComputersCanvas;
