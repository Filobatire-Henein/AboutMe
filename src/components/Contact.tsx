import { useState, type FormEvent } from "react";

import { profile } from "../data";
import Window from "../desktop/Window";
import { GithubIcon, IconDownload, IconMail, IconPhone, IconPin, LinkedinIcon } from "../desktop/icons";

const field = "w-full bg-transparent py-3 text-[15px] text-white outline-none placeholder:text-white/35";

// Mail-style compose window. No backend: Send opens the visitor's mail app.
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Hello from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.emails[0]}?subject=${subject}&body=${body}`;
  };

  const info = [
    { icon: <IconPin />, label: "Address", value: "Seattle, Washington · Everett, WA" },
    ...profile.emails.map((e) => ({ icon: <IconMail />, label: "Email", value: e, href: `mailto:${e}` })),
    { icon: <IconPhone />, label: "Phone", value: profile.phone, href: profile.phoneHref },
    { icon: <LinkedinIcon />, label: "LinkedIn", value: "filobatire-henein", href: profile.linkedin },
    { icon: <GithubIcon />, label: "GitHub", value: "Filobatire-Henein", href: profile.github },
    { icon: <IconDownload />, label: "Résumé", value: "Download PDF", href: profile.resume },
  ];

  return (
    <Window id="contact" title="New Message" bodyClassName="">
      <div className="grid lg:grid-cols-[1fr_340px]">
        <form onSubmit={submit} className="flex flex-col px-6 pb-6 pt-2 sm:px-8">
          <div className="flex items-center gap-3 border-b border-white/[0.07] py-3">
            <span className="w-16 text-[14px] text-muted">To:</span>
            <span className="rounded-md bg-sys-blue/20 px-2 py-0.5 text-[14px] text-sys-teal">{profile.name}</span>
          </div>
          <label className="flex items-center gap-3 border-b border-white/[0.07]">
            <span className="w-16 shrink-0 text-[14px] text-muted">From:</span>
            <input required name="name" value={form.name} onChange={set("name")} placeholder="Your name" className={field} />
          </label>
          <label className="flex items-center gap-3 border-b border-white/[0.07]">
            <span className="w-16 shrink-0 text-[14px] text-muted">Reply-to:</span>
            <input required type="email" name="email" value={form.email} onChange={set("email")} placeholder="you@company.com" className={field} />
          </label>
          <label className="flex items-center gap-3 border-b border-white/[0.07]">
            <span className="w-16 shrink-0 text-[14px] text-muted">Subject:</span>
            <input name="subject" value={form.subject} onChange={set("subject")} placeholder="Let's talk about a role" className={field} />
          </label>
          <textarea
            required
            rows={9}
            name="message"
            value={form.message}
            onChange={set("message")}
            placeholder="Write your message…"
            aria-label="Message"
            className={`${field} mt-2 resize-none leading-relaxed`}
          />
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-[12px] text-muted">Opens your mail app with this message.</p>
            <button type="submit" className="btn-sys">
              Send <IconMail className="h-4 w-4" />
            </button>
          </div>
        </form>

        <aside className="border-t border-white/[0.06] bg-black/20 p-6 lg:border-l lg:border-t-0">
          <h3 className="text-[22px] font-semibold tracking-tight">Get in touch</h3>
          <p className="mt-1 text-[14px] text-muted">Open to full-stack and backend roles. I usually reply within a day.</p>
          <ul className="mt-5 space-y-1">
            {info.map((i) => (
              <li key={i.value}>
                {"href" in i && i.href ? (
                  <a href={i.href} target={i.href.startsWith("http") || i.href.endsWith(".pdf") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/[0.06]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-white/80">{i.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-wider text-muted">{i.label}</span>
                      <span className="block truncate text-[14px] text-white/90">{i.value}</span>
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-white/80">{i.icon}</span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-wider text-muted">{i.label}</span>
                      <span className="block text-[14px] text-white/90">{i.value}</span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Window>
  );
};

export default Contact;
