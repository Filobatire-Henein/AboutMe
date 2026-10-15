import { useEffect, useState } from "react";

import { navLinks, profile } from "../data";
import { scrollToId } from "./scroll";
import { GithubIcon, LinkedinIcon } from "./icons";

const MenuBar = () => {
  const [now, setNow] = useState(() => new Date());
  const [active, setActive] = useState("");

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, []);

  return (
    <nav className="desktop-chrome glass fixed inset-x-0 top-0 z-30 flex h-8 items-center gap-1 rounded-none border-x-0 border-t-0 px-3 text-[13px] text-white/90 sm:px-4">
      <button onClick={() => scrollToId("about")} className="mr-2 flex h-6 items-center rounded px-1.5 font-bold tracking-tight hover:bg-white/10" aria-label="Back to start">
        FH
      </button>
      <span className="mr-3 font-semibold">{profile.firstName}</span>
      <ul className="hidden items-center gap-0.5 lg:flex">
        {navLinks.map((l) => (
          <li key={l.id}>
            <button
              onClick={() => scrollToId(l.id)}
              className={`rounded px-2 py-0.5 transition hover:bg-white/10 ${active === l.id ? "bg-white/15 text-white" : "text-white/80"}`}
            >
              {l.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="ml-auto flex items-center gap-1">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded p-1 hover:bg-white/10">
          <GithubIcon className="h-[15px] w-[15px]" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded p-1 hover:bg-white/10">
          <LinkedinIcon className="h-[15px] w-[15px]" />
        </a>
        <a href={profile.resume} target="_blank" rel="noreferrer" className="hidden rounded px-2 py-0.5 hover:bg-white/10 sm:block">
          Résumé
        </a>
        <span className="ml-1 tabular-nums text-white/85">
          <span className="hidden sm:inline">{now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })} </span>
          {now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </span>
      </div>
    </nav>
  );
};

export default MenuBar;
