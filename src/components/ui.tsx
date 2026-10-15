import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const fadeIn = (direction: "up" | "down" | "left" | "right" | "", delay = 0, duration = 0.6): Variants => ({
  hidden: {
    x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
    y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type: "tween", delay, duration, ease: "easeOut" },
  },
});

export const Section = ({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.12 }}
    className={`section-anchor relative z-10 overflow-x-clip mx-auto max-w-7xl px-6 py-20 sm:px-16 sm:py-24 ${className}`}
  >
    {children}
  </motion.section>
);

export const SectionHeader = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <motion.div variants={fadeIn("up")}>
    <p className="font-mono text-sm uppercase tracking-[0.25em] text-secondary">{eyebrow}</p>
    <h2 className="mt-2 text-4xl font-black text-white sm:text-5xl md:text-6xl">
      {title}
      <span className="text-accent">.</span>
    </h2>
    {intro && <p className="mt-5 max-w-3xl text-[17px] leading-[30px] text-secondary">{intro}</p>}
  </motion.div>
);

export const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[13px] text-white/85">{children}</span>
);

export const ButtonLink = ({
  href,
  children,
  variant = "primary",
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  download?: boolean;
}) => (
  <a
    href={href}
    target={href.startsWith("#") ? undefined : "_blank"}
    rel="noreferrer"
    download={download}
    className={
      variant === "primary"
        ? "inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:bg-[#a37bff]"
        : "inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
    }
  >
    {children}
  </a>
);

export const GithubIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
);

export const LinkedinIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
