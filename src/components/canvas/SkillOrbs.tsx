import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Decal, Float, OrbitControls } from "@react-three/drei";
import { CanvasTexture, Group, sRGBEncoding } from "three";

import CanvasLoader from "./Loader";

const palette = ["#915eff", "#f272c8", "#38bdf8", "#34d399", "#facc15", "#fb923c"];

// Draws a label onto a canvas so every skill gets a decal without image files.
const makeLabel = (text: string, color: string) => {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, 256, 256);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  const size = text.length > 5 ? 54 : text.length > 3 ? 70 : 92;
  ctx.font = `800 ${size}px Poppins, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 136);
  const tex = new CanvasTexture(c);
  tex.encoding = sRGBEncoding;
  tex.anisotropy = 8;
  return tex;
};

const Orb = ({ label, color, position }: { label: string; color: string; position: [number, number, number] }) => {
  const tex = useMemo(() => makeLabel(label, color), [label, color]);
  return (
    <Float speed={1.75} rotationIntensity={0.25} floatIntensity={1.4} position={position}>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1.15} map={tex} />
      </mesh>
    </Float>
  );
};

const Cloud = ({ skills }: { skills: string[] }) => {
  const group = useRef<Group>(null);
  // Even spread on a sphere (Fibonacci lattice).
  const points = useMemo(() => {
    const n = skills.length;
    const r = 3.3;
    return skills.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return [Math.cos(theta) * rad * r, y * r * 0.85, Math.sin(theta) * rad * r] as [number, number, number];
    });
  }, [skills]);

  useFrame((_s, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      {skills.map((s, i) => (
        <group key={s} position={points[i]}>
          {/* labels always face the viewer */}
          <Billboard>
            <Orb label={s} color={palette[i % palette.length]} position={[0, 0, 0]} />
          </Billboard>
        </group>
      ))}
    </group>
  );
};

const SkillOrbsCanvas = ({ skills }: { skills: string[] }) => (
  <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 3, 6]} intensity={1.1} />
    <pointLight position={[-4, -2, 4]} intensity={0.6} color="#915eff" />
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Cloud skills={skills} />
    </Suspense>
  </Canvas>
);

export default SkillOrbsCanvas;
