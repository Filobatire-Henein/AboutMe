import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { profile, services, stats, asset, splineScenes } from "../data";
import SplineScene from "./canvas/SplineScene";
import { Chip, Section, SectionHeader, fadeIn } from "./ui";

const About = () => (
  <Section id="about">
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <div>
        <SectionHeader eyebrow="Introduction" title="About me" />
        <motion.p variants={fadeIn("", 0.1, 1)} className="mt-6 text-[17px] leading-[30px] text-white/85">
          {profile.summary}
        </motion.p>
        <motion.p variants={fadeIn("", 0.2, 1)} className="mt-4 text-[16px] leading-[28px] text-secondary">
          {profile.intro} {profile.profileText}
        </motion.p>

        <motion.div variants={fadeIn("up", 0.3)} className="mt-6 flex flex-wrap gap-2">
          <Chip>🎓 B.S. Computer Science · UW</Chip>
          <Chip>📍 {profile.location}</Chip>
          {profile.hobbies.map((h) => (
            <Chip key={h}>
              {{ Movies: "🎬", "Building Unity games": "🕹️", Reading: "📚", Coding: "💻" }[h]} {h}
            </Chip>
          ))}
        </motion.div>
      </div>

      {splineScenes.about ? (
        <motion.div variants={fadeIn("left", 0.2)}>
          <SplineScene url={splineScenes.about} className="h-[420px] w-full" />
        </motion.div>
      ) : (
      <motion.div variants={fadeIn("left", 0.2)} className="relative mx-auto w-full max-w-sm">
        <div className="green-pink-gradient rounded-[28px] p-[1px] shadow-card">
          <div className="rounded-[28px] bg-tertiary p-8">
            <img src={asset("avatar-laptop.png")} alt="Filobatire's avatar" className="mx-auto w-56" />
            <p className="mt-4 text-center text-lg font-bold">{profile.name}</p>
            <p className="text-center font-mono text-sm text-secondary">{profile.role}</p>
          </div>
        </div>
      </motion.div>
      )}
    </div>

    <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} variants={fadeIn("up", 0.1 * i)} className="glass rounded-2xl p-5">
          <p className="text-gradient text-4xl font-black">{s.value}</p>
          <p className="mt-1 text-sm text-secondary">{s.label}</p>
        </motion.div>
      ))}
    </div>

    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <motion.div key={s.title} variants={fadeIn("right", 0.15 * i, 0.75)}>
          <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.03} transitionSpeed={450} className="h-full">
            <div className="green-pink-gradient h-full rounded-[20px] p-[1px] shadow-card">
              <div className="flex h-full min-h-[230px] flex-col items-center justify-center rounded-[20px] bg-tertiary px-6 py-6 text-center">
                <span className="text-5xl">{s.icon}</span>
                <h3 className="mt-4 text-[19px] font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-secondary">{s.text}</p>
              </div>
            </div>
          </Tilt>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default About;
