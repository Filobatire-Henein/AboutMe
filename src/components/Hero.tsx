import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { profile, asset } from "../data";
import { ButtonLink, GithubIcon, LinkedinIcon } from "./ui";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const useMedia = (q: string) => {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = (e: MediaQueryListEvent) => setM(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
};

const Hero = () => {
  const isPhone = useMedia("(max-width: 640px)");
  const isTablet = useMedia("(max-width: 1024px)");

  return (
    <section id="top" className="hero-bg relative z-10 h-screen min-h-[640px] w-full">
      <div className="absolute inset-x-0 top-[110px] z-10 mx-auto flex max-w-7xl flex-row items-start gap-5 px-6 sm:top-[120px] sm:px-16">
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-accent" />
          <div className="violet-gradient h-48 w-1 sm:h-80" />
        </div>

        <div className="min-w-0 flex-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Open to software engineering roles
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-[40px] font-black leading-tight text-white xs:text-[50px] sm:text-[64px] lg:text-[80px] lg:leading-[94px]"
          >
            Hi, I'm <span className="text-gradient">{profile.firstName}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 max-w-xl text-[17px] font-medium text-[#dfd9ff] xs:text-[20px] sm:text-[26px] sm:leading-[38px]"
          >
            Full-stack {profile.role.toLowerCase()} building web apps, APIs and 3D games.{" "}
            <span className="text-secondary">{profile.tagline}.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#projects">View my work</ButtonLink>
            <ButtonLink href={profile.resume} variant="ghost" download>
              Download résumé
            </ButtonLink>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-xl border border-white/15 p-3 text-white/80 transition hover:text-white">
              <GithubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-xl border border-white/15 p-3 text-white/80 transition hover:text-white">
              <LinkedinIcon />
            </a>
          </motion.div>
        </div>
      </div>

      {isPhone ? (
        <img
          src={asset("avatar-laptop.png")}
          alt="Filobatire's avatar at a laptop"
          className="absolute bottom-28 left-1/2 w-40 -translate-x-1/2 drop-shadow-[0_20px_40px_rgba(145,94,255,0.45)]"
        />
      ) : (
        <div className="absolute inset-0 top-[260px]">
          <Suspense fallback={null}>
            <ComputersCanvas compact={isTablet} />
          </Suspense>
        </div>
      )}

      <div className="absolute bottom-8 z-10 flex w-full items-center justify-center">
        <a href="#about" aria-label="Scroll to About">
          <div className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 border-secondary p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="mb-1 h-3 w-3 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
