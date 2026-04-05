import { Button } from '../ui/button';
import { CiLinkedin } from 'react-icons/ci';
import { LuGithub } from 'react-icons/lu';
import Images from '@/assets';
import { MorphingText } from '../ui/morphing-text';

const HeroSection = () => {
  const stack = ['React', 'TypeScript', 'Tailwind', 'Redux', 'Next.js'];

  return (
    <div
      className="relative z-50 overflow-hidden rounded-2xl xl:rounded-none bg-cover bg-center py-10 md:py-12"
      style={{ backgroundImage: `url(${Images.background})` }}>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75"
        aria-hidden="true"></div>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(111,255,145,0.2),transparent_40%)]"
        aria-hidden="true"></div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-5 md:gap-6 text-center md:text-left">
          <p className="font-fredoka text-white/95 text-xl md:text-2xl">
            Salut, je m&apos;appelle Rico!
          </p>

          <div className="space-y-1">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="font-fredoka font-bold text-primary text-3xl md:text-4xl xl:text-5xl leading-none">
                I
              </span>
              <MorphingText
                texts={['Design 🎨', 'Build 🔨', 'Ship 🚀']}
                className="mx-0 h-12 md:h-16 lg:h-20 w-[8.5ch] max-w-none text-left text-[2.2rem] md:text-[3rem] lg:text-[3.8rem]"
              />
            </div>
            <h2 className="pt-2 font-fredoka font-bold text-white text-2xl md:text-3xl xl:text-4xl leading-tight">
              Front-End Applications
            </h2>
          </div>

          <p className="max-w-3xl font-butter text-white/90 text-sm md:text-base xl:text-lg md:leading-8">
            I build modern web experiences with clean architecture, smooth
            interactions, and responsive interfaces focused on performance and
            usability.
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/30 bg-black/25 px-3 py-1 text-xs md:text-sm font-semibold text-white backdrop-blur-sm">
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start pt-2">
            <Button
              asChild
              className="z-50 bg-[var(--mint-green)] py-5 rounded-xl w-45 font-fredoka text-black">
              <a href="#projects">View Projects</a>
            </Button>
            <a
              href="#experience"
              className="font-fredoka text-white/90 hover:text-secondary transition-colors underline underline-offset-4">
              About Me
            </a>
          </div>

          <div className="flex flex-row justify-center md:justify-start items-center gap-4 pt-1 md:pt-2">
            <span className="font-signature text-white text-base md:text-lg xl:text-2xl">
              Social Media
            </span>
            <div className="flex-1 border-white/70 border-t border-dashed max-w-16 h-px"></div>
            <div className="flex items-center gap-6 text-white">
              <a
                href="https://www.linkedin.com/in/richard-oahimire-805527385/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="hover:text-secondary transition-colors">
                <CiLinkedin className="text-2xl md:text-3xl" />
              </a>
              <a
                href="https://github.com/Rico-proxy"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="hover:text-secondary transition-colors">
                <LuGithub className="text-2xl md:text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
