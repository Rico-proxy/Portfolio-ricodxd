import { Button } from '../ui/button';
import myCv from '@/assets/files/mycv.pdf';

const Experience = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-xl:hidden flex flex-row justify-center items-center gap-4 mx-auto pt-10">
        <div className="border border-border border-t-2 w-16 h-px"></div>
        <h1 className="font-fredoka font-bold text-secondary text-2xl">
          About Me
        </h1>
        <div className="border border-border border-t-2 w-16 h-px"></div>
      </div>

      <div className="p-6 xl:px-32 pt-8 md:pt-15">
        <div className="max-w-3xl mx-auto flex flex-col justify-center gap-6 text-center">
          <div className="xl:hidden flex flex-row justify-center items-center gap-4 mx-auto">
            <div className="border border-border border-t-2 w-16 h-px"></div>
            <h1 className="font-fredoka font-bold text-secondary text-2xl">
              About Me
            </h1>
            <div className="border border-border border-t-2 w-16 h-px"></div>
          </div>

          <p className="font-butter text-foreground text-sm md:text-base xl:text-lg text-start">
            Hi, I’m Richard — a frontend developer who loves building clean and
            responsive web interfaces. I enjoy turning ideas into interactive
            experiences and continuously improving how I write and structure my
            code. I’m always learning, staying up to date, and I believe there’s
            always a way to make things work.
          </p>
          <div className="items-start">
            <Button
              asChild
              className="bg-secondary py-5 rounded-xl w-45 font-fredoka text-black">
              <a href={myCv} download="Richard-Oahimire-CV.pdf" target="_blank" rel="noreferrer">
                Download Cv
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
