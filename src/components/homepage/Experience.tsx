import { Button } from '../ui/button';
import { FaPlus } from 'react-icons/fa6';
import { AiOutlinePercentage } from 'react-icons/ai';
import CountUp from 'react-countup';
import { ShineBorder } from '../ui/shine-border';
const Experience = () => {
  return (
    <div className="relative overflow-hidden ">
      <div className="flex flex-row items-center justify-center gap-4 mx-auto max-xl:hidden pt-10">
        <div className="h-px w-16 border-t-2 border border-border"></div>
        <h1 className="text-secondary text-2xl font-bold font-fredoka">
          About Me
        </h1>
        <div className="h-px w-16 border-t-2 border border-border"></div>
      </div>

      <div className="p-6 grid grid-cols-1 pt-8 gap-40 md:grid-cols-2 md:gap-20 md:pt-15 xl:px-32">
        <div className="flex flex-col gap-6 justify-center text-center">
          <div className="flex flex-row items-center justify-center gap-4 mx-auto xl:hidden">
            <div className="h-px w-16 border-t-2 border border-border"></div>
            <h1 className="text-secondary text-2xl font-bold font-fredoka">
              About Me
            </h1>
            <div className="h-px w-16 border-t-2 border border-border"></div>
          </div>

          <p className="text-foreground text-start text-sm font-butter md:text-base xl:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            possimus inventore quasi unde, exercitationem iusto aspernatur esse
            corrupti nam veritatis dicta cupiditate facere repellendus sequi eum
            itaque a totam ea.
          </p>
          <div className="items-start">
            <Button className="rounded-xl bg-secondary text-black w-45 py-5 font-fredoka">
              Download Cv
            </Button>
          </div>
        </div>
        <div className="relative pt-6 flex flex-col gap-10  rounded-xl p-2 xl:max-w-lg ">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="flex flex-row items-center gap-8 mx-auto">
              <div className="flex items-center gap-2">
                <div className="text-foreground font-bold text-2xl font-fredoka">
                  <CountUp start={0} end={140} duration={3} separator="," />
                </div>
                <FaPlus className=" text-primary font-bold text-2xl" />
              </div>
              <p className="text-foreground font-fredoka">Completed Projects</p>
            </div>
            <div className="h-px border-t border border-border w-full max-w-[230px] mx-auto"></div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            <div className="flex flex-row items-center gap-8 mx-auto">
              <div className="flex items-center gap-2">
                <div className="text-foreground font-bold text-2xl font-fredoka">
                  <CountUp start={0} end={140} duration={3} separator="," />
                </div>
                <AiOutlinePercentage className="text-foreground font-bold text-2xl" />
              </div>
              <p className="text-foreground font-fredoka">Completed Projects</p>
            </div>
            <div className="h-px border-t border-primary  w-full max-w-[230px] mx-auto"></div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            <div className="flex flex-row items-center gap-8 mx-auto">
              <div className="flex items-center gap-2">
                <div className="text-foreground font-bold text-2xl font-fredoka">
                  <CountUp start={0} end={140} duration={3} separator="," />
                </div>
                <FaPlus className="text-primary font-bold text-2xl" />
              </div>
              <p className="text-foreground font-fredoka">Completed Projects</p>
            </div>
          </div>
          <ShineBorder
            shineColor={['#000000', '#ffffff', '#000000']}
            borderWidth={1}
            duration={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;
