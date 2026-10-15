import { lazy, Suspense } from "react";

// Loaded only when a scene URL is configured, so the Spline runtime
// never ships to visitors otherwise.
const Spline = lazy(() => import("@splinetool/react-spline"));

const SplineScene = ({ url, className = "" }: { url: string; className?: string }) => (
  <div className={className}>
    <Suspense fallback={<div className="flex h-full items-center justify-center"><span className="canvas-loader" /></div>}>
      <Spline scene={url} />
    </Suspense>
  </div>
);

export default SplineScene;
