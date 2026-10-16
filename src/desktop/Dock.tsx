import { useRef, useState, type ReactNode } from "react";

import { profile } from "../data";
import { scrollToId } from "./scroll";
import { GithubIcon, IconBriefcase, IconChip, IconDoc, IconDownload, IconFolder, IconMail, IconUser, LinkedinIcon } from "./icons";

type Item = { label: string; icon: ReactNode; bg: string; id?: string; href?: string; desktopOnly?: boolean };

const items: (Item | "sep")[] = [
  { label: "About", id: "about", icon: <IconUser className="h-[55%] w-[55%]" />, bg: "linear-gradient(180deg,#5ac8fa,#0a84ff)" },
  { label: "Experience", id: "experience", icon: <IconBriefcase className="h-[55%] w-[55%]" />, bg: "linear-gradient(180deg,#ffb340,#ff9500)" },
  { label: "Skills", id: "skills", icon: <IconChip className="h-[55%] w-[55%]" />, bg: "linear-gradient(180deg,#5ef08c,#28c840)" },
  { label: "Projects", id: "projects", icon: <IconFolder className="h-[55%] w-[55%]" />, bg: "linear-gradient(180deg,#78c6ff,#3a8dde)" },
  { label: "My Story", id: "story", icon: <IconDoc className="h-[55%] w-[55%]" />, bg: "linear-gradient(180deg,#d9a7ff,#bf5af2)" },
  { label: "Contact", id: "contact", icon: <IconMail className="h-[55%] w-[55%]" />, bg: "linear-gradient(180deg,#66b3ff,#1a73e8)" },
  "sep",
  { label: "GitHub", href: profile.github, icon: <GithubIcon className="h-[55%] w-[55%]" />, bg: "linear-gradient(180deg,#3a3a40,#1c1c1f)", desktopOnly: true },
  { label: "LinkedIn", href: profile.linkedin, icon: <LinkedinIcon className="h-[50%] w-[50%]" />, bg: "linear-gradient(180deg,#2d8cff,#0a66c2)", desktopOnly: true },
  { label: "Résumé (PDF)", href: profile.resume, icon: <IconDownload className="h-[55%] w-[55%]" />, bg: "linear-gradient(180deg,#ff6b6b,#e0383e)", desktopOnly: true },
];

const BASE = 46;
const MAX = 74;
const RANGE = 140;

// macOS-style Dock with hover magnification.
const Dock = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const sizeFor = (el: HTMLElement | null) => {
    if (mouseX === null || !el) return BASE;
    const r = el.getBoundingClientRect();
    const dist = Math.abs(mouseX - (r.left + r.width / 2));
    if (dist >= RANGE) return BASE;
    return BASE + (MAX - BASE) * Math.cos((dist / RANGE) * (Math.PI / 2)) ** 2;
  };

  return (
    <div className="desktop-chrome dock-wrap fixed bottom-3 left-1/2 z-30 -translate-x-1/2">
      <div
        ref={ref}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className="glass flex items-end gap-1.5 rounded-[22px] px-2 pb-2 pt-2"
      >
        {items.map((it, i) =>
          it === "sep" ? (
            <span key={`sep-${i}`} className="mx-1 hidden h-10 w-px self-center bg-white/20 sm:block" />
          ) : (
            <DockIcon key={it.label} item={it} sizeFor={sizeFor} />
          )
        )}
      </div>
    </div>
  );
};

const DockIcon = ({ item, sizeFor }: { item: Item; sizeFor: (el: HTMLElement | null) => number }) => {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const size = sizeFor(ref.current);
  const inner = (
    <>
      <span
        className="flex items-center justify-center rounded-[22%] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_14px_-6px_rgba(0,0,0,0.6)]"
        style={{ width: size, height: size, background: item.bg, transition: "width 90ms ease-out, height 90ms ease-out" }}
      >
        {item.icon}
      </span>
      <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[12px] text-white opacity-0 transition group-hover:opacity-100 sm:block">
        {item.label}
      </span>
    </>
  );
  const cls = `group relative flex-col items-center ${item.desktopOnly ? "hidden sm:flex" : "flex"}`;
  return item.href ? (
    <a ref={ref} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className={cls}>
      {inner}
    </a>
  ) : (
    <button ref={ref} onClick={() => scrollToId(item.id!)} aria-label={item.label} className={cls}>
      {inner}
    </button>
  );
};

export default Dock;
