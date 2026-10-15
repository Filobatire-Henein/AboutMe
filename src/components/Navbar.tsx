import { useEffect, useState } from "react";

import { navLinks, profile, asset } from "../data";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 py-4 transition-all sm:px-16 ${
        scrolled ? "border-b border-white/5 bg-primary/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#top" className="flex items-center gap-3" onClick={() => setActive("")}>
          <img src={asset("avatar-wave.png")} alt="" className="h-10 w-10 rounded-full bg-white/10 object-cover" />
          <p className="text-[17px] font-bold text-white">
            Filobatire <span className="hidden font-normal text-secondary sm:inline">| Software Engineer</span>
          </p>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`text-[15px] font-medium transition hover:text-white ${
                  active === l.id ? "text-white" : "text-secondary"
                }`}
              >
                {l.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-accent/60 px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-accent"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition ${open ? "top-2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-white transition ${open ? "top-2 -rotate-45" : "top-4"}`} />
          </span>
        </button>
      </div>

      {open && (
        <ul className="glass absolute right-6 top-20 flex min-w-[200px] flex-col gap-4 rounded-2xl p-6 lg:hidden">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)} className="text-[16px] font-medium text-white/90">
                {l.title}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="text-[16px] font-semibold text-accent">
              Resume ↗
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
