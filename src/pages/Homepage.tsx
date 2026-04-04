import Experience from '@/components/homepage/Experience';
import HeroSection from '@/components/homepage/HeroSection';
import Projects from '@/components/homepage/Projects';
import { Skills } from '@/components/homepage/Skills';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { WarpBackground } from '@/components/ui/warp-background';

const Homepage = () => {
  return (
    <>
      <section className="relative overflow-visible">
        <div>
          <HeroSection />
        </div>
      </section>

      <WarpBackground
        className="p-0 border-0 rounded-none w-full min-h-screen"
        gridColor="black"
        beamsPerSide={3}
        beamSize={10}
        beamDelayMin={0}
        beamDelayMax={0}
        beamDuration={3}>
        <section id="experience">
          <Experience />
        </section>

        <section>
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

      
        <ScrollProgress />
      </WarpBackground>
    </>
  );
};

export default Homepage;
