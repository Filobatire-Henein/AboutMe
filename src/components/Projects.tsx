import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { projects, profile, asset, type Project } from "../data";
import Window from "../desktop/Window";
import { GithubIcon, IconArrowUpRight } from "../desktop/icons";

const categories = ["All", "Web", "Backend", "Mobile", "Games"] as const;
type Cat = (typeof categories)[number];

const catOf = (p: Project): Cat[] => {
  const t = p.tags.join(" ").toLowerCase();
  const c: Cat[] = [];
  if (/unity|3d|game/.test(t + " " + p.name.toLowerCase())) c.push("Games");
  if (/react native|expo/.test(t)) c.push("Mobile");
  if (/\.net|node|express|mysql|aws|firebase/.test(t)) c.push("Backend");
  if (/html|javascript|react(?! native)|square/.test(t)) c.push("Web");
  return c;
};

const iconBg = (g: string) => {
  const map: Record<string, string> = {
    "from-fuchsia-500/30": "linear-gradient(160deg,#d946ef,#4f46e5)",
    "from-sky-500/30": "linear-gradient(160deg,#38bdf8,#0369a1)",
    "from-violet-500/30": "linear-gradient(160deg,#a78bfa,#6d28d9)",
    "from-emerald-500/30": "linear-gradient(160deg,#34d399,#047857)",
    "from-amber-500/30": "linear-gradient(160deg,#fbbf24,#c2410c)",
    "from-rose-500/30": "linear-gradient(160deg,#fb7185,#be123c)",
    "from-blue-600/30": "linear-gradient(160deg,#60a5fa,#1e3a8a)",
    "from-lime-500/30": "linear-gradient(160deg,#a3e635,#15803d)",
    "from-cyan-500/30": "linear-gradient(160deg,#22d3ee,#1d4ed8)",
    "from-orange-500/30": "linear-gradient(160deg,#fb923c,#b91c1c)",
    "from-indigo-500/30": "linear-gradient(160deg,#818cf8,#0284c7)",
  };
  return map[g.split(" ")[0]] ?? "linear-gradient(160deg,#64748b,#1e293b)";
};

const Card = ({ p }: { p: Project }) => {
  const primary = p.live ?? p.code;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06]"
    >
      <div className="flex items-start justify-between">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-[22%] text-[32px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-10px_rgba(0,0,0,0.7)]"
          style={{ background: iconBg(p.gradient) }}
        >
          {p.icon}
        </span>
        <div className="flex gap-1.5">
          {p.status && (
            <span className="rounded-full bg-sys-orange/15 px-2.5 py-1 text-[11px] font-medium text-sys-orange">{p.status}</span>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noreferrer" aria-label={`${p.name} source code`} className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white">
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`} className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white">
              <IconArrowUpRight className="h-[18px] w-[18px]" />
            </a>
          )}
        </div>
      </div>
      <h3 className="mt-4 text-[18px] font-semibold tracking-tight">
        {primary ? (
          <a href={primary} target="_blank" rel="noreferrer" className="hover:text-sys-blue">
            {p.name}
          </a>
        ) : (
          p.name
        )}
      </h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{p.description}</p>
      <p className="mt-4 font-mono text-[12px] text-white/60">{p.tags.join(" · ")}</p>
    </motion.article>
  );
};

// Finder-style grid with a category filter.
const Projects = () => {
  const [cat, setCat] = useState<Cat>("All");
  const shown = useMemo(() => projects.filter((p) => cat === "All" || catOf(p).includes(cat)), [cat]);

  return (
    <Window
      id="projects"
      title={`Projects — ${shown.length} items`}
      bodyClassName="p-4 sm:p-8"
      toolbar={<span className="hidden font-mono text-[11px] text-muted sm:inline">~/projects</span>}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-white/10 bg-black/30 p-0.5" role="tablist" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition ${cat === c ? "bg-white/15 text-white shadow" : "text-white/65 hover:text-white"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-[13px] text-muted">Code and live demos where they're public.</p>
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="group mt-6 flex flex-col items-center gap-5 rounded-2xl border border-dashed border-white/15 p-5 text-center transition hover:border-white/30 hover:bg-white/[0.03] sm:flex-row sm:text-left"
      >
        <img src={asset("dina.png")} alt="" className="h-20 w-20 object-contain transition group-hover:-rotate-6 group-hover:scale-110" />
        <div>
          <p className="font-semibold">Check out my GitHub page for some cool stuff I've been working on! 🚀</p>
          <p className="mt-1 text-[14px] text-muted">Feel free to explore and see what I'm up to — click the dinosaur to get redirected! 🦖</p>
        </div>
      </a>
    </Window>
  );
};

export default Projects;
