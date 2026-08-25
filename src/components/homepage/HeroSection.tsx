import { Button } from '../ui/button';
import { CiMail, CiLinkedin } from 'react-icons/ci';
import { LuGithub } from 'react-icons/lu';
import Images from '@/assets';
import { MorphingText } from '../animate-ui/primitives/texts/morphing';
import RainOnGlass from '@/components/ui/rain-on-glass-bottom';

const HeroSection = () => {
  const stack = ['React', 'TypeScript', 'Tailwind CSS'];

  return (
    <RainOnGlass
      className="z-50 rounded-2xl xl:rounded-none overflow-hidden"
      backgroundImage={Images.background}
      fallbackBackgroundImage={Images.background}
      blur={10}
      dropCount={150}
      dropSize={0.65}
      fallSpeed={1.1}
      refraction={0.75}
      chroma={0.35}
      trailStrength={4}
      contentType="custom"
      content={
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
          <div className="relative flex justify-center items-center mx-auto px-6 md:px-10 py-12 w-full max-w-4xl min-h-[420px] md:min-h-[520px] lg:min-h-[600px]">
            <div className="flex flex-col items-center gap-5 md:gap-6 w-full text-center">
              <div className="space-y-1">
                <div className="flex justify-center items-center gap-2 md:gap-3">
                  <span className="font-fredoka font-bold text-3xl md:text-5xl xl:text-6xl leading-none">
                    I
                  </span>
                  <MorphingText
                    text={['Design 🎨', 'Build 🔨', 'Ship 🚀']}
                    loop
                    className="inline-block w-[8ch] md:w-[8.5ch] font-fredoka font-bold text-[2.2rem] text-primary md:text-[4rem] lg:text-[4.8rem] text-center leading-none"
                  />
                </div>
                <h2 className="pt-2 font-fredoka font-bold text-white text-2xl md:text-4xl xl:text-5xl leading-tight">
                  Front-End Applications
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="bg-black/25 backdrop-blur-sm px-3 md:px-4 py-1 md:py-1.5 border border-white/30 rounded-full font-semibold text-white text-xs md:text-base">
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
                <Button
                  asChild
                  className="z-50 bg-[var(--mint-green)] py-5 md:py-6 rounded-xl w-45 md:w-52 font-fredoka text-black md:text-lg">
                  <a href="#projects">View Projects</a>
                </Button>
                <a
                  href="#experience"
                  className="font-fredoka text-white/90 hover:text-secondary md:text-lg underline underline-offset-4 transition-colors">
                  About Me
                </a>
              </div>

              <div className="flex flex-row justify-center items-center gap-4 pt-1 md:pt-2">
                <span className="font-signature text-white text-base md:text-2xl xl:text-3xl">
                  Social Media
                </span>
                <div className="border-white/70 border-t border-dashed w-16 h-px"></div>
                <div className="flex items-center gap-6 text-white">
                  <a
                    href="https://www.linkedin.com/in/richard-oahimire-805527385/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn profile"
                    className="hover:text-secondary transition-colors">
                    <CiLinkedin className="text-2xl md:text-4xl" />
                  </a>
                  <a
                    href="https://github.com/Rico-proxy"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub profile"
                    className="hover:text-secondary transition-colors">
                    <LuGithub className="text-2xl md:text-4xl" />
                  </a>
                  <a
                    href="mailto:richardoahimire@gmail.com"
                    aria-label="Send email"
                    className="hover:text-secondary transition-colors">
                    <CiMail className="text-2xl md:text-4xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default HeroSection;
