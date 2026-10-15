import { useState } from "react";
import { motion } from "framer-motion";

import { story, asset } from "../data";
import { Section, SectionHeader, fadeIn } from "./ui";

const Story = () => {
  const [open, setOpen] = useState(false);
  const shown = open ? story : story.slice(0, 2);

  return (
    <Section id="story">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <SectionHeader eyebrow="Who am I? ⚡" title="My story" />
          <motion.img
            variants={fadeIn("up", 0.2)}
            src={asset("avatar-fist.png")}
            alt=""
            className="mt-8 hidden w-56 lg:block"
          />
        </div>

        <motion.div variants={fadeIn("left", 0.1)} className="glass relative rounded-3xl p-7 sm:p-10">
          <span className="absolute -top-6 left-8 font-serif text-7xl text-accent/70" aria-hidden>
            “
          </span>
          <div className="space-y-5">
            {shown.map((para) => (
              <p key={para.slice(0, 24)} className="text-[16px] leading-[29px] text-white/85">
                {para}
              </p>
            ))}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="mt-6 rounded-lg border border-accent/50 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent"
          >
            {open ? "Show less" : "Read the full story"}
          </button>
        </motion.div>
      </div>
    </Section>
  );
};

export default Story;
