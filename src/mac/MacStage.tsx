import { useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

import LockScreen from "./LockScreen";
import { clamp, lerp, quadToMatrix3d, range, smooth, type Pt } from "./homography";
import { profile } from "../data";

// MacBook scene made in Spline. Object names come from the scene file.
const SCENE = "https://prod.spline.design/Xwh3UKOvgTEVXcCp/scene.splinecode";
const LID_OPEN = -Math.PI / 2;

// Layout size of the HTML shown on the 3D screen (MacBook Pro aspect).
const SCREEN_W = 1512;
const SCREEN_H = 982;

// ox/oy place the laptop as a fraction of the visible width/height
// (+ox = right, +oy = lower) so poses read the same on any screen. `d` is the distance to the screen, null = fill.
type Pose = { rx: number; ry: number; lid: number; ox: number; oy: number; d: number | null };

const introPoses = (wide: boolean): [number, Pose][] => [
  [0, { rx: 0.62, ry: -0.62, lid: -0.05, ox: wide ? 0.22 : 0, oy: wide ? 0.02 : 0.2, d: wide ? 470 : 780 }],
  [0.34, { rx: 0.2, ry: -0.3, lid: -1.66, ox: wide ? 0.16 : 0, oy: wide ? 0 : 0.1, d: wide ? 420 : 680 }],
  [0.6, { rx: 0, ry: 0, lid: LID_OPEN, ox: 0, oy: 0, d: 300 }],
  [0.86, { rx: 0, ry: 0, lid: LID_OPEN, ox: 0, oy: 0, d: null }],
];

const outroPoses = (wide: boolean): [number, Pose][] => [
  [0.08, { rx: 0, ry: 0, lid: LID_OPEN, ox: 0, oy: 0, d: null }],
  [0.38, { rx: 0, ry: 0, lid: LID_OPEN, ox: 0, oy: 0, d: 300 }],
  [0.66, { rx: 0.22, ry: 0.42, lid: -1.66, ox: wide ? -0.22 : 0, oy: wide ? 0 : -0.2, d: wide ? 440 : 720 }],
  [0.95, { rx: 0.5, ry: 0.55, lid: -0.32, ox: wide ? -0.22 : 0, oy: wide ? 0.02 : -0.2, d: wide ? 470 : 760 }],
];

const samplePose = (keys: [number, Pose][], t: number, fillD: number): Pose & { d: number } => {
  const D = (p: Pose) => p.d ?? fillD;
  if (t <= keys[0][0]) return { ...keys[0][1], d: D(keys[0][1]) };
  for (let i = 0; i < keys.length - 1; i++) {
    const [ta, a] = keys[i];
    const [tb, b] = keys[i + 1];
    if (t <= tb) {
      const k = smooth(t, ta, tb);
      return {
        rx: lerp(a.rx, b.rx, k),
        ry: lerp(a.ry, b.ry, k),
        lid: lerp(a.lid, b.lid, k),
        ox: lerp(a.ox, b.ox, k),
        oy: lerp(a.oy, b.oy, k),
        // interpolate distance in log space so zooms feel linear
        d: Math.exp(lerp(Math.log(D(a)), Math.log(D(b)), k)),
      };
    }
  }
  const last = keys[keys.length - 1][1];
  return { ...last, d: D(last) };
};

const trackProgress = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return 0;
  const r = el.getBoundingClientRect();
  const len = r.height - window.innerHeight;
  return len <= 0 ? 0 : clamp(-r.top / len);
};

type Phase = "intro" | "desktop" | "outro";

const setPhase = (p: Phase) => {
  if (document.documentElement.dataset.phase !== p) document.documentElement.dataset.phase = p;
};

const MacStage = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"intro" | "outro">("intro");
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (reduce) {
      root.dataset.stage = "off";
      setStatus("failed");
      return;
    }
    root.dataset.stage = "on";

    let app: Application | null = null;
    let raf = 0;
    let disposed = false;
    let lastKey = "";
    let onResize: (() => void) | null = null;

    (async () => {
      try {
        const { Application } = await import("@splinetool/runtime");
        if (disposed || !canvasRef.current) return;
        const canvas = canvasRef.current;
        app = new Application(canvas, { renderMode: "manual", renderer: "webgl" });
        await app.load(SCENE);
        if (disposed) return;
        app.setBackgroundColor("rgba(0,0,0,0)");

        const mac = app.findObjectByName("Macbook")!;
        const lid = app.findObjectByName("Screen")!;
        const camObj = app.findObjectByName("Camera")!;
        // Internal three.js objects: used read-only to project the screen.
        const anyApp = app as unknown as { _scene: any; _camera: any };
        const cam = anyApp._camera;
        const mesh = anyApp._scene.getObjectByName("SCREEN IMAGE");
        const V = cam.position.constructor;
        const base = { x: mac.position.x, y: mac.position.y, z: mac.position.z };

        const resize = () => {
          app!.setSize(window.innerWidth, window.innerHeight);
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          lastKey = "";
        };
        resize();
        onResize = resize;
        window.addEventListener("resize", resize);

        // Four corners of the screen in the mesh's local space.
        const pos = mesh.geometry.attributes.position;
        const verts: any[] = [];
        for (let i = 0; i < pos.count; i++) verts.push(new V().fromBufferAttribute(pos, i));
        const mean = verts.reduce((a, v) => a.add(v), new V()).multiplyScalar(1 / verts.length);
        let cyz = 0;
        verts.forEach((v) => (cyz += (v.y - mean.y) * (v.z - mean.z)));
        const bb = mesh.geometry.boundingBox ?? (mesh.geometry.computeBoundingBox(), mesh.geometry.boundingBox);
        const dir = new V(0, bb.max.y - bb.min.y, (bb.max.z - bb.min.z) * Math.sign(cyz || 1)).normalize();
        const u = (v: any) => (v.y - mean.y) * dir.y + (v.z - mean.z) * dir.z;
        const pick = (sx: number, su: number) =>
          verts.reduce((best, v) => (sx * v.x + su * u(v) > sx * best.x + su * u(best) ? v : best));
        let corners = [pick(-1, 1), pick(1, 1), pick(1, -1), pick(-1, -1)];

        const world = (v: any) => v.clone().applyMatrix4(mesh.matrixWorld);
        const applyPose = (pose: { rx: number; ry: number; lid: number }) => {
          mac.rotation.x = pose.rx;
          mac.rotation.y = pose.ry;
          lid.rotation.x = pose.lid;
          mesh.updateWorldMatrix(true, false);
        };

        // Measure the open, front-facing screen once: its centre and size.
        applyPose({ rx: 0, ry: 0, lid: LID_OPEN });
        let w = corners.map(world);
        // make sure corner 0 is top-left as seen from the camera
        if (w[0].y < w[3].y) corners = [corners[3], corners[2], corners[1], corners[0]];
        if (w[0].x > w[1].x) corners = [corners[1], corners[0], corners[3], corners[2]];
        w = corners.map(world);
        const center = w.reduce((a: any, v: any) => a.add(v), new V()).multiplyScalar(0.25);
        const screenW = w[0].distanceTo(w[1]);
        const screenH = w[0].distanceTo(w[3]);

        const tick = () => {
          raf = requestAnimationFrame(tick);
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const p = trackProgress("intro");
          const q = trackProgress("outro");
          const phase: Phase = p < 1 ? "intro" : q > 0 ? "outro" : "desktop";
          setPhase(phase);

          const stage = stageRef.current!;
          if (phase === "desktop") {
            if (stage.style.visibility !== "hidden") stage.style.visibility = "hidden";
            return;
          }
          stage.style.visibility = "visible";

          const key = `${p.toFixed(4)}|${q.toFixed(4)}|${vw}x${vh}`;
          if (key === lastKey) return;
          lastKey = key;

          const wide = vw / vh > 1.1;
          const focal = (0.5 * vh) / Math.tan(((cam.fov ?? 45) * Math.PI) / 360);
          // distance at which the screen just covers the viewport
          const fillD = Math.max(85, Math.min((screenW * focal) / vw, (screenH * focal) / vh) * 0.985);

          const pose =
            phase === "intro" ? samplePose(introPoses(wide), p, fillD) : samplePose(outroPoses(wide), q, fillD);

          // Keep the camera on its axis (Spline aims it at a fixed target) and
          // move the laptop instead, so the projection below stays exact.
          const visW = (pose.d * vw) / focal;
          const visH = (pose.d * vh) / focal;
          mac.rotation.x = pose.rx;
          mac.rotation.y = pose.ry;
          lid.rotation.x = pose.lid;
          mac.position.x = base.x - center.x + pose.ox * visW;
          mac.position.y = base.y - center.y - pose.oy * visH;
          mac.position.z = base.z;
          mesh.updateWorldMatrix(true, false);
          const cz = center.z + pose.d;
          camObj.position.x = 0;
          camObj.position.y = 0;
          camObj.position.z = cz;
          cam.position.set(0, 0, cz);
          cam.updateMatrixWorld();

          // Project the screen and pin the HTML onto it.
          const quad = corners.map((c) => {
            const v = world(c).project(cam);
            return [((v.x + 1) / 2) * vw, ((1 - v.y) / 2) * vh] as Pt;
          }) as [Pt, Pt, Pt, Pt];
          const m = quadToMatrix3d(SCREEN_W, SCREEN_H, quad);
          const scr = screenRef.current!;
          if (m) scr.style.transform = m;
          const on = smooth(-pose.lid / (Math.PI / 2), 0.62, 0.97);
          scr.style.opacity = String(on);
          scr.style.filter = `brightness(${0.35 + 0.65 * on})`;

          const t = phase === "intro" ? 1 - range(p, 0.88, 1) : range(q, 0, 0.08);
          stage.style.opacity = String(t);
          stage.style.pointerEvents = phase === "outro" && q > 0.6 ? "auto" : "none";
          headRef.current!.style.opacity = String(phase === "intro" ? 1 - smooth(p, 0.1, 0.28) : 0);
          headRef.current!.style.transform = `translateY(${phase === "intro" ? -smooth(p, 0.1, 0.28) * 40 : 0}px)`;
          outroRef.current!.style.opacity = String(phase === "outro" ? smooth(q, 0.6, 0.8) : 0);
          outroRef.current!.style.transform = `translateY(${phase === "outro" ? (1 - smooth(q, 0.6, 0.8)) * 40 : 0}px)`;
          setVariant(phase === "outro" ? "outro" : "intro");

          app!.requestRender();
        };
        setStatus("ready");
        raf = requestAnimationFrame(tick);
      } catch (err) {
        console.warn("3D scene unavailable, showing the page without it.", err);
        root.dataset.stage = "off";
        setPhase("desktop");
        setStatus("failed");
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener("resize", onResize);
      app?.dispose();
    };
  }, []);

  if (status === "failed") return null;

  return (
    <div ref={stageRef} className="stage fixed inset-0 z-40" aria-hidden={false}>
      <div className="stage-bg absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        ref={screenRef}
        className="pointer-events-none absolute left-0 top-0 overflow-hidden rounded-[10px] opacity-0"
        style={{ width: SCREEN_W, height: SCREEN_H, transformOrigin: "0 0" }}
        aria-hidden
      >
        <LockScreen variant={variant} />
      </div>

      <div
        ref={headRef}
        className="absolute inset-x-0 top-0 px-6 pt-24 sm:px-12 md:inset-y-0 md:right-auto md:flex md:max-w-[46%] md:flex-col md:justify-center md:pt-0 lg:pl-20"
      >
        <p className="font-mono text-[13px] uppercase tracking-[0.22em] text-ink-500">{profile.location}</p>
        <p className="font-display mt-3 text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-900 sm:text-[64px] lg:text-[84px]">
          Filobatire
          <br />
          Henein<span className="text-accent">.</span>
        </p>
        <p className="mt-5 max-w-md text-[18px] leading-relaxed text-ink-600 sm:text-[21px]">
          Full-stack software engineer. I build reliable web apps, APIs and 3D games.
        </p>
        <p className="mt-8 hidden items-center gap-2 text-[14px] font-medium text-ink-500 md:flex">
          <span className="scroll-cue" /> Scroll to open the laptop
        </p>
        {status === "loading" && <p className="mt-4 text-sm text-ink-500">Loading 3D scene…</p>}
      </div>

      <div
        ref={outroRef}
        className="absolute inset-x-0 bottom-0 px-6 pb-20 opacity-0 sm:px-12 md:inset-y-0 md:left-auto md:right-0 md:flex md:w-[46%] md:flex-col md:justify-center md:pb-0 lg:pr-20"
      >
        <h2 className="font-display text-[38px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[56px]">
          Let's build something<span className="text-accent">.</span>
        </h2>
        <p className="mt-4 max-w-md text-[17px] text-ink-600">
          Open to full-stack and backend software engineering roles in the Seattle area and remote.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={`mailto:${profile.emails[0]}`} className="btn-primary">
            Email me
          </a>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-secondary">
            Résumé (PDF)
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
            LinkedIn
          </a>
        </div>
        <p className="mt-10 text-[12px] text-ink-500">
          © {new Date().getFullYear()} {profile.name} · MacBook scene built with Spline
        </p>
      </div>
    </div>
  );
};

export default MacStage;
