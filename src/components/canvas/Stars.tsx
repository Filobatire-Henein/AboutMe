import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { random } from "maath";
import type { Points as ThreePoints } from "three";

const Stars = () => {
  const ref = useRef<ThreePoints>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { radius: 1.2 }) as Float32Array);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color="#f272c8" size={0.002} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

// Fixed full-viewport starfield behind the whole page.
const StarsCanvas = () => (
  <div className="pointer-events-none fixed inset-0 z-0">
    <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
