import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

import { orbSkills, skillGroups, softSkills, technicalLevels } from "../data";
import { Chip, Section, SectionHeader, fadeIn } from "./ui";

const SkillOrbsCanvas = lazy(() => import("./canvas/SkillOrbs"));

const Bars = ({ title, items }: { title: string; items: { name: string; level: number }[] }) => (
  <motion.div variants={fadeIn("up", 0.1)} className="glass rounded-2xl p-6">
    <h3 className="font-mono text-sm uppercase tracking-widest text-secondary">{title}</h3>
    <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((s) => (
        <li key={s.name}>
          <div className="flex justify-between text-[13px]">
            <span className="text-white/90">{s.name}</span>
            <span className="font-mono text-secondary">{s.level}%</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent to-pink-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${s.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </li>
      ))}
    </ul>
  </motion.div>
);

const Skills = () => (
  <Section id="skills">
    <SectionHeader
      eyebrow="My toolbox"
      title="Skills"
      intro="Languages, frameworks and platforms I use to ship production software — drag the orbs to spin them."
    />

    <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
      <motion.div variants={fadeIn("right", 0.1)} className="h-[380px] cursor-grab active:cursor-grabbing sm:h-[460px]">
        <Suspense fallback={null}>
          <SkillOrbsCanvas skills={orbSkills} />
        </Suspense>
      </motion.div>

      <div className="space-y-5">
        {skillGroups.map((g, i) => (
          <motion.div key={g.title} variants={fadeIn("left", 0.1 * i)}>
            <h3 className="mb-2 text-[15px] font-semibold text-white">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      <Bars title="Technical proficiency" items={technicalLevels} />
      <Bars title="Soft skills" items={softSkills} />
    </div>
  </Section>
);

export default Skills;
