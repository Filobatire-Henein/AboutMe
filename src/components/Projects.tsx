import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { projects, profile, asset, type Project } from "../data";
import { GithubIcon, Section, SectionHeader, fadeIn } from "./ui";

const tagColors = ["text-sky-300", "text-emerald-300", "text-pink-300", "text-amber-300"];

const ProjectCard = ({ p, index }: { p: Project; index: number }) => {
  const primary = p.live ?? p.code;
  return (
    <motion.div variants={fadeIn("up", 0.08 * (index % 3), 0.75)}>
      <Tilt glareEnable glareMaxOpacity={0.12} scale={1.02} tiltMaxAngleX={12} tiltMaxAngleY={12} transitionSpeed={450} className="h-full">
        <article className="flex h-full flex-col rounded-2xl bg-tertiary p-5 shadow-card ring-1 ring-white/5">
          <div className={`relative flex h-40 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient}`}>
            <span className="text-6xl drop-shadow-lg">{p.icon}</span>
            {p.status && (
              <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[11px] text-amber-300">
                {p.status}
              </span>
            )}
            <div className="absolute right-3 top-3 flex gap-2">
              {p.code && (
                <a href={p.code} target="_blank" rel="noreferrer" aria-label={`${p.name} source code`} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:scale-110">
                  <GithubIcon className="h-5 w-5" />
                </a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:scale-110">
                  ↗
                </a>
              )}
            </div>
          </div>
          <h3 className="mt-5 text-[21px] font-bold text-white">
            {primary ? (
              <a href={primary} target="_blank" rel="noreferrer" className="hover:text-accent">
                {p.name}
              </a>
            ) : (
              p.name
            )}
          </h3>
          <p className="mt-2 flex-1 text-[14px] leading-6 text-secondary">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t, i) => (
              <span key={t} className={`text-[13px] ${tagColors[i % tagColors.length]}`}>
                #{t.toLowerCase().replace(/\s+/g, "-")}
              </span>
            ))}
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => (
  <Section id="projects">
    <SectionHeader
      eyebrow="My work"
      title="Projects"
      intro="A selection of things I've built — from full-stack services and mobile apps to 3D games and browser games. Each card links to the code or a live demo where one is public."
    />

    <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <ProjectCard key={p.name} p={p} index={i} />
      ))}
    </div>

    <motion.a
      variants={fadeIn("up", 0.2)}
      href={profile.github}
      target="_blank"
      rel="noreferrer"
      className="glass group mt-12 flex flex-col items-center gap-6 rounded-2xl p-6 sm:flex-row"
    >
      <img src={asset("dina.png")} alt="" className="h-24 w-24 object-contain transition group-hover:-rotate-6 group-hover:scale-110" />
      <div>
        <p className="text-lg font-semibold text-white">
          Check out my GitHub page for some cool stuff I've been working on! 🚀
        </p>
        <p className="text-secondary">Feel free to explore and see what I'm up to — click the dinosaur to get redirected! 🦖</p>
      </div>
    </motion.a>
  </Section>
);

export default Projects;
