import { lazy, Suspense, useState, type FormEvent } from "react";
import { motion } from "framer-motion";

import { profile, splineScenes } from "../data";
import SplineScene from "./canvas/SplineScene";
import { ButtonLink, GithubIcon, LinkedinIcon, Section, SectionHeader, fadeIn } from "./ui";

const EarthCanvas = lazy(() => import("./canvas/Earth"));

const input =
  "w-full rounded-xl border border-white/10 bg-tertiary px-5 py-4 text-white outline-none transition placeholder:text-secondary focus:border-accent";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No backend: open the visitor's mail app with the message pre-filled.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.emails[0]}?subject=${subject}&body=${body}`;
  };

  const info = [
    { label: "Address", value: "Seattle, Washington · Everett, WA", icon: "📍" },
    ...profile.emails.map((e) => ({ label: "Email me", value: e, href: `mailto:${e}`, icon: "✉️" })),
    { label: "Call me", value: profile.phone, href: profile.phoneHref, icon: "📞" },
  ];

  return (
    <Section id="contact">
      <div className="flex flex-col-reverse gap-10 xl:flex-row">
        <motion.div variants={fadeIn("right", 0.1, 0.8)} className="flex-[0.8] rounded-2xl bg-black-100 p-8">
          <SectionHeader eyebrow="Get in touch" title="Contact" />

          <form onSubmit={submit} className="mt-10 flex flex-col gap-6">
            <label className="flex flex-col">
              <span className="mb-3 font-medium text-white">Your name</span>
              <input required name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="What's your name?" className={input} />
            </label>
            <label className="flex flex-col">
              <span className="mb-3 font-medium text-white">Your email</span>
              <input required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="What's your email?" className={input} />
            </label>
            <label className="flex flex-col">
              <span className="mb-3 font-medium text-white">Your message</span>
              <textarea required rows={6} name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What would you like to say?" className={input} />
            </label>
            <button type="submit" className="w-fit rounded-xl bg-accent px-8 py-3 font-bold text-white shadow-md shadow-accent/30 transition hover:bg-[#a37bff]">
              Send
            </button>
          </form>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {info.map((i) => (
              <div key={i.value} className="rounded-xl border border-white/5 bg-tertiary p-4">
                <p className="text-xs uppercase tracking-wider text-secondary">
                  {i.icon} {i.label}
                </p>
                {"href" in i && i.href ? (
                  <a href={i.href} className="mt-1 block break-all font-medium text-white hover:text-accent">
                    {i.value}
                  </a>
                ) : (
                  <p className="mt-1 font-medium text-white">{i.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={profile.linkedin} variant="ghost">
              <LinkedinIcon /> LinkedIn
            </ButtonLink>
            <ButtonLink href={profile.github} variant="ghost">
              <GithubIcon /> GitHub
            </ButtonLink>
            <ButtonLink href={profile.resume} download>
              Download résumé
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div variants={fadeIn("left", 0.1, 0.8)} className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1">
          {splineScenes.contact ? (
            <SplineScene url={splineScenes.contact} className="h-full w-full" />
          ) : (
            <Suspense fallback={null}>
              <EarthCanvas />
            </Suspense>
          )}
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
