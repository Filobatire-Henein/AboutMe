import { useState } from "react";
import { motion } from "framer-motion";

import { experiences, education, type Experience as TExperience } from "../data";
import { Section, SectionHeader, fadeIn } from "./ui";

const VISIBLE = 4;

const Card = ({ exp, index }: { exp: TExperience; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const left = index % 2 === 0;
  const points = expanded ? exp.points : exp.points.slice(0, VISIBLE);

  return (
    <motion.li variants={fadeIn(left ? "right" : "left", 0.1)} className="relative md:grid md:grid-cols-2 md:gap-14">
      {/* timeline node */}
      <span
        className="absolute left-0 top-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-primary text-[11px] font-black text-primary md:left-1/2"
        style={{ background: exp.accent }}
        aria-hidden
      >
        {exp.initials}
      </span>

      <p
        className={`hidden pt-9 font-mono text-sm text-secondary md:block ${left ? "md:order-2" : "text-right"}`}
      >
        {exp.date}
      </p>

      <div className={`ml-10 md:ml-0 ${left ? "md:order-1" : ""}`}>
        <div className="glass rounded-2xl p-6" style={{ borderTop: `3px solid ${exp.accent}` }}>
          <p className="font-mono text-xs text-secondary md:hidden">{exp.date}</p>
          <h3 className="mt-1 text-[21px] font-bold text-white">{exp.title}</h3>
          <p className="text-[15px] font-semibold" style={{ color: exp.accent }}>
            {exp.company}
            {exp.place && <span className="font-normal text-secondary"> · {exp.place}</span>}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {points.map((p) => (
              <li key={p} className="text-[14px] leading-6 tracking-wide text-white/80">
                {p}
              </li>
            ))}
          </ul>
          {exp.points.length > VISIBLE && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 font-mono text-xs text-accent hover:underline"
            >
              {expanded ? "Show less" : `Show ${exp.points.length - VISIBLE} more`}
            </button>
          )}
        </div>
      </div>
    </motion.li>
  );
};

const Experience = () => (
  <Section id="experience">
    <SectionHeader eyebrow="What I have done so far" title="Work experience" />

    <ol className="relative mt-14 space-y-12">
      <span className="absolute bottom-0 left-0 top-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-accent via-pink-400 to-sky-400 md:left-1/2" />
      {experiences.map((e, i) => (
        <Card key={e.company + e.title} exp={e} index={i} />
      ))}
    </ol>

    <div className="mt-24">
      <SectionHeader eyebrow="Where I studied" title="Education" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {education.map((ed, i) => (
          <motion.div key={ed.school} variants={fadeIn("up", 0.15 * i)} className="glass rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[20px] font-bold text-white">{ed.school}</h3>
                <p className="text-sm text-secondary">{ed.place}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-white/80">{ed.date}</span>
            </div>
            <p className="mt-3 font-medium text-white/90">{ed.degree}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {ed.details.map((d) => (
                <li key={d} className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-[13px] text-white/85">
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

export default Experience;
