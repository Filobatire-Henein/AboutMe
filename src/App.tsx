import { useEffect } from "react";

import MacStage from "./mac/MacStage";
import LockScreen from "./mac/LockScreen";
import MenuBar from "./desktop/MenuBar";
import Dock from "./desktop/Dock";
import { startSmoothScroll } from "./desktop/scroll";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Story from "./components/Story";
import Contact from "./components/Contact";
import { profile } from "./data";

const App = () => {
  useEffect(() => {
    const stop = startSmoothScroll();
    // Sections render after load, so honour deep links like /#projects ourselves.
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return stop;
  }, []);

  return (
    <>
      <MacStage />
      <div className="wallpaper wallpaper-fixed" aria-hidden />
      <MenuBar />

      {/* Intro: scroll drives the MacBook; the lock screen waits underneath. */}
      <div id="intro" className="track relative h-[420vh]">
        <section className="track-sticky sticky top-0 h-[100svh]" aria-label="Introduction">
          <h1 className="sr-only">
            {profile.name} — {profile.role}
          </h1>
          <LockScreen />
        </section>
      </div>

      <main className="relative z-10 pb-28 pt-6">
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Story />
        <Contact />
      </main>

      {/* Outro: fly back out of the screen and close the lid. */}
      <div id="outro" className="track relative z-10 h-[320vh]">
        <section className="track-sticky sticky top-0 h-[100svh]" aria-label="Closing">
          <LockScreen variant="outro" />
        </section>
      </div>

      <noscript>
        <p style={{ padding: 24 }}>This portfolio needs JavaScript. Résumé: {profile.resume}</p>
      </noscript>
      <Dock />
    </>
  );
};

export default App;
