import { AnimatedCircularProgressBar } from '../ui/animated-circular-progress-bar';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { ShineBorder } from '../ui/shine-border';

export const Skills = () => {
  return (
    <div className="py-20">
      <div>
        <div className="flex flex-row items-center justify-center gap-4 mx-auto max-md:hidden">
          <div className="h-px w-16 border-t-2 border border-border"></div>
          <h1 className="text-secondary text-2xl font-bold">My Experience</h1>
          <div className="h-px w-16 border-t-2 border border-border"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 px-8 xl:px-32 pt-20">
          <div className="flex flex-row items-center justify-center gap-4 mx-auto md:hidden">
            <div className="h-px w-16 border-t-2 border border-border"></div>
            <h1 className="text-secondary text-2xl font-bold">My Experience</h1>
            <div className="h-px w-16 border-t-2 border border-border"></div>
          </div>

          <div className="flex justify-center px-8 pt-20  xl:max-w-lg ">
            <Card className="border bg-card relative overflow-hidden">
              <CardContent className="flex flex-col gap-2 p-6">
                <CardTitle>
                  <AnimatedCircularProgressBar
                    value={70}
                    gaugePrimaryColor="var(--green)"
                    gaugeSecondaryColor="var(--mint-green)"
                    className="size-13 text-xl text-card-foreground"
                  />
                </CardTitle>
                <CardDescription className="flex flex-col">
                  <h1 className="text-card-foreground font-bold text-xl">Javascript</h1>
                  <span className="text-card-foreground font-butter">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia eum temporibus sapiente molestiae voluptatem quos.
                  </span>
                </CardDescription>
              </CardContent>

              <ShineBorder
                shineColor={['#000000', '#ffffff', '#000000']}
                borderWidth={1}
                duration={10}
              />
            </Card>
          </div>

          <div className="flex justify-center px-8 pt-20  xl:max-w-lg">
            <Card className="border bg-card relative overflow-hidden">
              <CardContent className="flex flex-col gap-2 p-6">
                <CardTitle>
                  <AnimatedCircularProgressBar
                    value={70}
                    gaugePrimaryColor="var(--green)"
                    gaugeSecondaryColor="var(--mint-green)"
                    className="size-13 text-xl text-card-foreground"
                  />
                </CardTitle>
                <CardDescription className="flex flex-col">
                  <h1 className="text-card-foreground font-bold text-xl">Javascript</h1>
                  <span className="text-card-foreground font-butter">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia eum temporibus sapiente molestiae voluptatem quos.
                  </span>
                </CardDescription>
              </CardContent>

              <ShineBorder
                shineColor={['#000000', '#ffffff', '#000000']}
                borderWidth={1}
                duration={10}
              />
            </Card>
          </div>

          <div className="flex justify-center px-8 pt-20  xl:max-w-lg">
            <Card className="border bg-card relative overflow-hidden">
              <CardContent className="flex flex-col gap-2 p-6">
                <CardTitle>
                  <AnimatedCircularProgressBar
                    value={70}
                    gaugePrimaryColor="var(--green)"
                    gaugeSecondaryColor="var(--mint-green)"
                    className="size-13 text-xl text-card-foreground"
                  />
                </CardTitle>
                <CardDescription className="flex flex-col">
                  <h1 className="text-card-foreground font-bold text-xl">Javascript</h1>
                  <span className="text-card-foreground font-butter">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia eum temporibus sapiente molestiae voluptatem quos.
                  </span>
                </CardDescription>
              </CardContent>

              <ShineBorder
                shineColor={['#000000', '#ffffff', '#000000']}
                borderWidth={1}
                duration={10}
              />
            </Card>
          </div>

          <div className="flex justify-center px-8 pt-20  xl:max-w-lg">
            <Card className="border bg-card relative overflow-hidden">
              <CardContent className="flex flex-col gap-2 p-6">
                <CardTitle>
                  <AnimatedCircularProgressBar
                    value={70}
                    gaugePrimaryColor="var(--green)"
                    gaugeSecondaryColor="var(--mint-green)"
                    className="size-13 text-xl text-card-foreground"
                  />
                </CardTitle>
                <CardDescription className="flex flex-col">
                  <h1 className="text-card-foreground font-bold text-xl">Javascript</h1>
                  <span className="text-card-foreground font-butter">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia eum temporibus sapiente molestiae voluptatem quos.
                  </span>
                </CardDescription>
              </CardContent>

              <ShineBorder
                shineColor={['#000000', '#ffffff', '#000000']}
                borderWidth={1}
                duration={10}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
