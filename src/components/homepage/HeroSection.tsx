import { Button } from '../ui/button';
import { CiMail, CiLinkedin } from 'react-icons/ci';
import { LuGithub } from 'react-icons/lu';
import Images from '@/assets';
import { MorphingText } from '../ui/morphing-text';

const HeroSection = () => {
  const stack = ['React', 'TypeScript', 'Tailwind CSS'];

  return (
    <div
      className="z-50 relative bg-cover bg-center py-14 md:py-16 rounded-2xl xl:rounded-none overflow-hidden"
      style={{ backgroundImage: `url(${Images.background})` }}>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75"
        aria-hidden="true"></div>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(111,255,145,0.2),transparent_40%)]"
        aria-hidden="true"></div>

      <div className="relative mx-auto px-6 md:px-10 max-w-6xl">
        <div className="flex flex-col gap-5 md:gap-6 md:text-left text-center">
          <div className="space-y-1">
            <div className="flex justify-center md:justify-start items-center gap-2 md:gap-3">
              <span className="font-fredoka font-bold text-primary text-3xl md:text-4xl xl:text-5xl leading-none">
                I
              </span>
              <MorphingText
                texts={['Design 🎨', 'Build 🔨', 'Ship 🚀']}
                className="mx-0 w-[8ch] md:w-[8.5ch] max-w-none h-12 md:h-16 lg:h-20 text-[2.2rem] md:text-[3rem] lg:text-[3.8rem] md:text-left text-center"
              />
            </div>
            <h2 className="pt-2 font-fredoka font-bold text-white text-2xl md:text-3xl xl:text-4xl leading-tight">
              Front-End Applications
            </h2>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="bg-black/25 backdrop-blur-sm px-3 py-1 border border-white/30 rounded-full font-semibold text-white text-xs md:text-sm">
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-2">
            <Button
              asChild
              className="z-50 bg-[var(--mint-green)] py-5 rounded-xl w-45 font-fredoka text-black">
              <a href="#projects">View Projects</a>
            </Button>
            <a
              href="#experience"
              className="font-fredoka text-white/90 hover:text-secondary underline underline-offset-4 transition-colors">
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
              <a
                href="mailto:richardoahimire@gmail.com"
                aria-label="Send email"
                className="hover:text-secondary transition-colors">
                <CiMail className="text-2xl md:text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
