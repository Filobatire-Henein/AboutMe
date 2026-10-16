import { motion } from "framer-motion";

import { profile, services, stats, education, asset } from "../data";
import Window, { Eyebrow, H, Tag } from "../desktop/Window";

const specs = [
  { k: "Role", v: "Full-stack Software Engineer" },
  { k: "Location", v: profile.location },
  { k: "Education", v: `B.S. Computer Science · ${education[0].school}` },
  { k: "Stack", v: "React · Node.js · .NET · C# · AWS · Unity" },
  { k: "Status", v: "Open to software engineering roles", live: true },
];

// "About This Mac", but about me.
const About = () => (
  <Window id="about" title="About Me">
    <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-sys-blue/25 blur-3xl" aria-hidden />
          <img src={asset("avatar-laptop.png")} alt="Filobatire's avatar" className="relative w-52 drop-shadow-2xl" />
        </div>
        <p className="mt-5 text-[26px] font-semibold tracking-tight">{profile.name}</p>
        <p className="text-[15px] text-muted">{profile.role}</p>
        <dl className="mt-6 w-full space-y-2.5 text-left text-[13.5px]">
          {specs.map((s) => (
            <div key={s.k} className="grid grid-cols-[92px_1fr] gap-3">
              <dt className="text-right font-medium text-muted">{s.k}</dt>
              <dd className="text-white/90">
                {s.live && <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-sys-green align-middle" />}
                {s.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <Eyebrow>Introduction</Eyebrow>
        <H>Engineer who ships reliable software, end to end.</H>
        <p className="mt-5 text-[17px] leading-[1.7] text-white/85">{profile.summary}</p>
        <p className="mt-4 text-[15.5px] leading-[1.75] text-muted">
          {profile.intro} {profile.profileText}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {profile.hobbies.map((h) => (
            <Tag key={h}>
              {{ Movies: "🎬", "Building Unity games": "🕹️", Reading: "📚", Coding: "💻" }[h]} {h}
            </Tag>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i }}
              className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-4"
            >
              <p className="bg-gradient-to-br from-white to-sys-teal bg-clip-text text-[30px] font-bold tracking-tight text-transparent">
                {s.value}
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-10 grid gap-3 border-t border-white/[0.06] pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <div key={s.title} className="group rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 transition hover:border-white/15 hover:bg-white/[0.06]">
          <span className="text-3xl">{s.icon}</span>
          <h4 className="mt-3 text-[16px] font-semibold">{s.title}</h4>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{s.text}</p>
        </div>
      ))}
    </div>
  </Window>
);

export default About;
