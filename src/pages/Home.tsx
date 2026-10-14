import { About } from "../sections/About";
import { Contact } from "../sections/Contact";
import { Experience } from "../sections/Experience";
import { Footer } from "../sections/Footer";
import { Hero } from "../sections/Hero";
import { Projects } from "../sections/Projects";

export function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
