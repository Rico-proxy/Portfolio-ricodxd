import { Card, CardHeader } from '../ui/card';
import Images from '@/assets';
import { RainbowButton } from '../ui/rainbow-button';

const Projects = () => {
  return (
    <div className="py-20">
      <div className="max-md:hidden flex flex-row justify-center items-center gap-4 mx-auto">
        <div className="border border-border border-t-2 w-16 h-px"></div>
        <h1 className="font-fredoka font-bold text-secondary text-2xl">
          My Projects
        </h1>
        <div className="border border-border border-t-2 w-16 h-px"></div>
      </div>
      <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 xl:px-32 md:pt-20">
        <div className="md:hidden flex flex-row justify-center items-center gap-4 mx-auto">
          <div className="border border-border border-t-2 w-16 h-px"></div>
          <h1 className="font-fredoka font-bold text-secondary text-2xl">
            My Projects
          </h1>
          <div className="border border-border border-t-2 w-16 h-px"></div>
        </div>

        <div className="flex flex-col gap-5 xl:max-w-lg">
          <Card className="bg-white px-6">
            <CardHeader
              className="flex flex-col bg-cover bg-center rounded-2xl w-full aspect-[4/2]"
              style={{
                backgroundImage: `url(${Images.background})`,
              }}></CardHeader>
          </Card>
          <div className="items-center gap-4 grid grid-cols-3 pt-3">
            <RainbowButton variant="outline">Typescript</RainbowButton>
            <RainbowButton variant="outline">Typescript</RainbowButton>
            <RainbowButton variant="outline">Typescript</RainbowButton>
            <RainbowButton variant="outline">Typescript</RainbowButton>
          </div>
          <div>
            <h1 className="font-bold text-foreground md:text-lg">
              Anime themed login page
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-5 xl:max-w-lg">
          <Card className="bg-white px-6">
            <CardHeader
              className="flex flex-col bg-cover bg-center rounded-2xl w-full aspect-[4/2]"
              style={{
                backgroundImage: `url(${Images.background})`,
              }}></CardHeader>
          </Card>
          <div className="items-center gap-4 grid grid-cols-3 pt-3">
            <RainbowButton variant="outline">Typescript</RainbowButton>
            <RainbowButton variant="outline">Typescript</RainbowButton>
            <RainbowButton variant="outline">Typescript</RainbowButton>
            <RainbowButton variant="outline">Typescript</RainbowButton>
          </div>
          <div>
            <h1 className="font-bold text-foreground md:text-lg">
              Anime themed login page
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-5 xl:max-w-lg">
          <Card className="bg-white px-6">
            <CardHeader
              className="flex flex-col bg-cover bg-center rounded-2xl w-full aspect-[4/2]"
              style={{
                backgroundImage: `url(${Images.background})`,
              }}></CardHeader>
          </Card>
          <div className="items-center gap-4 grid grid-cols-3 pt-3">
            <RainbowButton variant="outline">Typescript</RainbowButton>
            <RainbowButton variant="outline">Typescript</RainbowButton>
            <RainbowButton variant="outline">Typescript</RainbowButton>
            <RainbowButton variant="outline">Typescript</RainbowButton>
          </div>
          <div>
            <h1 className="font-bold text-foreground md:text-lg">
              Anime themed login page
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
