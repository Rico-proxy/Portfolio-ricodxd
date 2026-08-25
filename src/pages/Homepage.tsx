import Experience from '@/components/homepage/Experience';
import HeroSection from '@/components/homepage/HeroSection';
import Projects from '@/components/homepage/Projects';
import { Skills } from '@/components/homepage/Skills';
import {
  ScrollProgress,
  ScrollProgressProvider,
} from '@/components/animate-ui/primitives/animate/scroll-progress';
import ScrollReveal from '@/components/ui/scroll-reveal';
// import LightningStorm from '@crazygl/hero-lightning-storm';

const Homepage = () => {
  return (
    <ScrollProgressProvider global>
      <ScrollProgress className="top-0 z-50 fixed inset-x-0 bg-white h-px" />

      <section className="relative overflow-visible">
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
      </section>

      <section id="experience">
        <ScrollReveal>
          <Experience />
        </ScrollReveal>
      </section>

      <section>
        <ScrollReveal transition={{ delay: 0.08 }}>
          <Skills />
        </ScrollReveal>
      </section>

      <section id="projects">
        <ScrollReveal transition={{ delay: 0.08 }}>
          <Projects />
        </ScrollReveal>
      </section>

      {/* <LightningStorm
        className="relative overflow-hidden"
        managedWidth={false}
        managedHeight={false}
        skyTop="#020807"
        skyBottom="#081410"
        cloudColor="#101b17"
        cloudDensity={0.85}
        cloudSpeed={0.18}
        boltColor="#f6fff9"
        flashColor="#9dffb5"
        frequency={2}
        branchiness={0.65}
        thickness={0.7}
        bloom={0.45}
        interactivity="none"
        contentType="custom"
        content={
          <div className="relative w-full">
            <div className="absolute inset-0 bg-background/35" aria-hidden="true"></div>
            <div className="z-10 relative">
              <section id="experience">
                <ScrollReveal>
                  <Experience />
                </ScrollReveal>
              </section>

              <section>
                <ScrollReveal transition={{ delay: 0.08 }}>
                  <Skills />
                </ScrollReveal>
              </section>

              <section id="projects">
                <ScrollReveal transition={{ delay: 0.08 }}>
                  <Projects />
                </ScrollReveal>
              </section>
            </div>
          </div>
        }
      /> */}
    </ScrollProgressProvider>
  );
};

export default Homepage;
