import { motion } from "framer-motion";
import type { ReactNode } from "react";

// A macOS-style window. Each page section lives in one.
const Window = ({
  id,
  title,
  toolbar,
  children,
  className = "",
  bodyClassName = "p-6 sm:p-10",
}: {
  id: string;
  title: string;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) => (
  <section id={id} className={`section-anchor relative z-10 mx-auto max-w-6xl px-3 py-10 sm:px-8 sm:py-16 ${className}`}>
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
      className="glass-strong window-shadow overflow-hidden rounded-2xl"
    >
      <header className="relative flex h-11 items-center border-b border-white/[0.06] bg-white/[0.03] px-4">
        <div className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <h2 className="pointer-events-none absolute inset-x-0 text-center text-[13px] font-semibold text-white/70">{title}</h2>
        {toolbar && <div className="ml-auto">{toolbar}</div>}
      </header>
      <div className={bodyClassName}>{children}</div>
    </motion.div>
  </section>
);

export default Window;

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-sys-blue">{children}</p>
);

export const H = ({ children }: { children: ReactNode }) => (
  <h3 className="mt-2 text-[30px] font-semibold leading-tight tracking-[-0.025em] text-white sm:text-[40px]">{children}</h3>
);

export const Tag = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[12.5px] text-white/85">{children}</span>
);
