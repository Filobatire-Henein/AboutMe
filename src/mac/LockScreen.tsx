import { useEffect, useState } from "react";

import { profile, asset } from "../data";

const useClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  return now;
};

// The "screen" you see on the MacBook and, once you've flown in, the first
// full-screen view. Rendered both on the 3D screen and in the page, so it must
// look right at any size: everything scales with the container (cqw units).
const LockScreen = ({ variant = "intro" }: { variant?: "intro" | "outro" }) => {
  const now = useClock();
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "");
  const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="wallpaper relative flex h-full w-full flex-col items-center overflow-hidden text-white [container-type:size]">
      <p className="mt-[9cqh] text-[clamp(14px,1.6cqw,22px)] font-medium text-white/80">{date}</p>
      <p className="font-display text-[clamp(64px,10.5cqw,168px)] font-semibold leading-none tracking-tight text-white/95">
        {time}
      </p>

      <div className="mt-auto mb-[10cqh] flex flex-col items-center px-6 text-center">
        <img
          src={asset("avatar-wave.png")}
          alt=""
          className="h-[clamp(64px,7cqw,104px)] w-[clamp(64px,7cqw,104px)] rounded-full bg-white/15 object-cover ring-1 ring-white/25 backdrop-blur"
        />
        <p className="mt-4 text-[clamp(22px,2.6cqw,40px)] font-semibold tracking-tight">{profile.name}</p>
        <p className="mt-1 text-[clamp(14px,1.4cqw,20px)] text-white/70">
          {variant === "intro" ? "Software Engineer · Full-stack" : "Thanks for stopping by"}
        </p>
        <p className="mt-6 rounded-full bg-white/15 px-4 py-1.5 text-[clamp(12px,1.05cqw,15px)] text-white/80 backdrop-blur">
          {variant === "intro" ? "Scroll to unlock ↓" : "See you soon 👋"}
        </p>
      </div>
    </div>
  );
};

export default LockScreen;
