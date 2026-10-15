import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { orbSkills, skillGroups, softSkills, technicalLevels } from "../data";
import Window, { Eyebrow, H, Tag } from "../desktop/Window";

const SkillOrbsCanvas = lazy(() => import("./canvas/SkillOrbs"));

// Only mount the WebGL orbs while they're near the viewport.
const useNear = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "300px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, near] as const;
};

const Meter = ({ title, items, color }: { title: string; items: { name: string; level: number }[]; color: string }) => (
  <div className="rounded-xl border border-white/[0.07] bg-black/25 p-5">
    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted">{title}</h4>
    <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((s) => (
        <li key={s.name}>
          <div className="flex justify-between text-[13px]">
            <span className="text-white/90">{s.name}</span>
            <span className="font-mono tabular-nums text-muted">{s.level}%</span>
          </div>
          <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="h-full rounded-full"
              style={{ background: color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${s.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Skills = () => {
  const [ref, near] = useNear();
  return (
    <Window id="skills" title="Skills — System Information">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>Toolbox</Eyebrow>
          <H>Languages, frameworks and platforms I ship with.</H>
          <div className="mt-7 space-y-5">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <h4 className="mb-2 text-[13px] font-semibold text-white/70">{g.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={ref} className="relative h-[340px] cursor-grab active:cursor-grabbing sm:h-[440px]" aria-label="3D cloud of skills you can drag to spin">
          {near && (
            <Suspense fallback={null}>
              <SkillOrbsCanvas skills={orbSkills} />
            </Suspense>
          )}
          <p className="pointer-events-none absolute bottom-1 w-full text-center text-[12px] text-muted">Drag to spin</p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Meter title="Technical proficiency" items={technicalLevels} color="linear-gradient(90deg,#0a84ff,#64d2ff)" />
        <Meter title="Soft skills" items={softSkills} color="linear-gradient(90deg,#30d158,#a3f7bf)" />
      </div>
    </Window>
  );
};

export default Skills;
