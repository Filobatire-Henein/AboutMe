import { lazy, Suspense, useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Story from "./components/Story";
import Contact from "./components/Contact";
import { profile } from "./data";

const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  // Sections render after load, so honour deep links like /#projects ourselves.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
  <div className="relative bg-primary">
    <Suspense fallback={null}>
      <StarsCanvas />
    </Suspense>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Story />
      <Contact />
    </main>
    <footer className="relative z-10 border-t border-white/5 px-6 py-8 text-center text-sm text-secondary">
      <p>© {new Date().getFullYear()} {profile.name} · Built with React, Three.js &amp; Tailwind</p>
      <p className="mt-2 text-xs text-secondary/70">
        3D models:{" "}
        <a className="underline hover:text-white" href="https://sketchfab.com/3d-models/gaming-desktop-pc-d1d8282c9916438091f11aeb28787b66" target="_blank" rel="noreferrer">"Gaming Desktop PC" by Yolala1232</a>{" "}
        and{" "}
        <a className="underline hover:text-white" href="https://sketchfab.com/3d-models/stylized-planet-789725db86f547fc9163b00f302c3e70" target="_blank" rel="noreferrer">"Stylized planet" by cmzw</a>, licensed{" "}
        <a className="underline hover:text-white" href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC-BY-4.0</a>.
      </p>
    </footer>
  </div>
  );
};

export default App;
