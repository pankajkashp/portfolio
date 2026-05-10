'use client';

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative" id="home">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Services />
      <Experience />
      <Contact />
    </main>
  );
}
