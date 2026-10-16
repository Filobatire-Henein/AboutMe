import { useState } from "react";

import { story, asset } from "../data";
import Window from "../desktop/Window";

// TextEdit-style document.
const Story = () => {
  const [open, setOpen] = useState(false);
  const shown = open ? story : story.slice(0, 2);

  return (
    <Window id="story" title="my-story.txt — Edited" bodyClassName="">
      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="hidden flex-col items-center justify-start gap-4 border-r border-white/[0.06] bg-black/20 p-8 lg:flex">
          <img src={asset("avatar-fist.png")} alt="" className="w-44" />
          <p className="text-center text-[13px] text-muted">Who am I? ⚡</p>
        </aside>
        <div className="mx-auto max-w-[68ch] px-6 py-10 sm:px-12 sm:py-14">
          <h3 className="font-serif text-[34px] font-semibold leading-tight tracking-tight sm:text-[42px]">My story</h3>
          <p className="mt-2 text-[13px] text-muted">From Egypt to Seattle, and into computer science.</p>
          <div className="mt-8 space-y-6">
            {shown.map((para, i) => (
              <p
                key={para.slice(0, 24)}
                className={`font-serif text-[18px] leading-[1.8] text-white/85 ${i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:text-[56px] first-letter:leading-[0.9] first-letter:text-sys-blue" : ""}`}
              >
                {para}
              </p>
            ))}
          </div>
          <button onClick={() => setOpen(!open)} className="btn-ghost mt-8">
            {open ? "Show less" : `Keep reading (${story.length - 2} more paragraphs)`}
          </button>
        </div>
      </div>
    </Window>
  );
};

export default Story;
