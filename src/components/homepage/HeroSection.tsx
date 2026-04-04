import { Button } from '../ui/button';
import { CiLinkedin } from 'react-icons/ci';
import { LuGithub } from 'react-icons/lu';
import Images from '@/assets';
import { MorphingText } from '../ui/morphing-text';


const HeroSection = () => {
  return (
    <div
      className="z-50 flex flex-col gap-5 bg-cover bg-center py-20 rounded-2xl xl:rounded-none"
      style={{ backgroundImage: `url(${Images.background})` }}>
      <div
        className="absolute inset-0 bg-black/20 rounded-2xl"
        aria-hidden="true"
      />
      <div className="text-center">
        <p className="font-fredoka text-white text-xl xl:text-2xl">
          Salut, je m'appelle Rico !
        </p>
      </div>
      <div className="text-center">
        <h1 className="font-fredoka font-bold text-primary text-2xl xl:text-3xl">
          I{' '}
          {/* <TypingAnimation
            showCursor={false}
            words={['Design 🎨', 'Build 🔨', 'Ship 🚀']}
            loop
          />{' '} */}
          <MorphingText texts={['Design 🎨', 'Build 🔨', 'Ship 🚀']} />
        </h1>
        <h1 className="xl:pt-3 font-fredoka font-bold text-white text-2xl xl:text-3xl">
          Front-End Applications
        </h1>
      </div>
      <div className="xl:mx-auto px-5 xl:max-w-4xl text-center md:text-start">
        <p className="font-butter text-white text-sm md:text-base xl:text-lg xl:text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
          impedit, deleniti voluptates architecto quae doloremque placeat
          accusamus quaerat ducimus omnis quos et vitae dolore, debitis commodi
          iusto dignissimos, nisi ex.
        </p>
      </div>
      <div className="mx-auto pt-10">
        <Button className="z-50 bg-[var(--mint-green)] py-5 rounded-xl w-45 font-fredoka text-black">
          Learn More
        </Button>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 xl:pt-10">
        <span className="font-signature text-white text-base md:text-lg xl:text-2xl">
          Social Media
        </span>

        <div className="flex-1 border-white border-t border-dashed max-w-6 h-px"></div>
        <div className="flex items-center gap-8 text-white">
          <CiLinkedin className="text-2xl md:text-3xl" />
          <LuGithub className="text-2xl md:text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
