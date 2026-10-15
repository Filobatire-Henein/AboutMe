import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { experiences, education } from "../data";
import Window, { Tag } from "../desktop/Window";
import { IconCap } from "../desktop/icons";

// Mail-style master/detail: pick a role on the left, read it on the right.
const Experience = () => {
  const [sel, setSel] = useState(0);
  const exp = experiences[sel];

  return (
    <>
      <Window id="experience" title="Experience — 5 roles" bodyClassName="">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
          <aside className="min-w-0 border-b border-white/[0.06] bg-black/20 md:border-b-0 md:border-r">
            <p className="px-5 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wider text-muted">Work</p>
            <ul className="flex gap-2 overflow-x-auto px-3 pb-3 md:block md:space-y-1 md:overflow-visible md:pb-5" role="tablist">
              {experiences.map((e, i) => (
                <li key={e.company + e.title} className="shrink-0">
                  <button
                    role="tab"
                    aria-selected={i === sel}
                    onClick={() => setSel(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                      i === sel ? "bg-sys-blue text-white" : "hover:bg-white/[0.06]"
                    }`}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-black/80"
                      style={{ background: e.accent }}
                    >
                      {e.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-semibold">{e.company}</span>
                      <span className={`block truncate text-[12px] ${i === sel ? "text-white/80" : "text-muted"}`}>{e.date}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-h-[520px] min-w-0 p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.article
                key={sel}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
              >
                <p className="font-mono text-[12px] text-muted">{exp.date}</p>
                <h3 className="mt-1 text-[28px] font-semibold tracking-tight sm:text-[34px]">{exp.title}</h3>
                <p className="mt-1 text-[16px] font-medium" style={{ color: exp.accent }}>
                  {exp.company}
                  {exp.place && <span className="font-normal text-muted"> · {exp.place}</span>}
                </p>
                <ul className="mt-6 space-y-3.5">
                  {exp.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px] leading-[1.65] text-white/85">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: exp.accent }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </Window>

      <Window id="education" title="Education" className="!pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((ed) => (
            <div key={ed.school} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sys-purple/20 text-sys-purple">
                    <IconCap />
                  </span>
                  <div>
                    <h3 className="text-[18px] font-semibold">{ed.school}</h3>
                    <p className="text-[13px] text-muted">{ed.place}</p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[12px] text-muted">{ed.date}</span>
              </div>
              <p className="mt-4 text-[15px] text-white/90">{ed.degree}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ed.details.map((d) => (
                  <Tag key={d}>{d}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Window>
    </>
  );
};

export default Experience;
