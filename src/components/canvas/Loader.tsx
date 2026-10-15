import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html as="div" center className="flex flex-col items-center justify-center">
      <span className="canvas-loader" />
      <p className="mt-10 text-sm font-semibold text-[#f1f1f1]">{progress.toFixed(0)}%</p>
    </Html>
  );
};

export default CanvasLoader;
