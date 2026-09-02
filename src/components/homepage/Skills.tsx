import { skillGroups } from '@/data/skills';
import type { SkillGroup } from '@/data/skills';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import ScrollReveal from '../ui/scroll-reveal';

const SkillCard = ({ skill, index }: { skill: SkillGroup; index: number }) => {
  const Icon = skill.icon;

  return (
    <ScrollReveal
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -48 : 48,
        filter: 'blur(8px)',
      }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ delay: index * 0.06 }}>
      <Card className="group bg-card/95 shadow-black/10 shadow-lg backdrop-blur-sm border-border hover:border-secondary/70 transition-colors">
        <CardContent className="flex flex-col gap-7 p-7 md:p-8 min-h-[360px]">
          <div className="flex justify-center items-center bg-secondary/15 rounded-2xl size-16 text-secondary transition-colors group-hover:bg-secondary/25">
            <Icon className="size-8" strokeWidth={2.3} />
          </div>

          <div className="space-y-4">
            <CardTitle className="font-fredoka text-card-foreground text-3xl leading-tight">
              {skill.title}
            </CardTitle>
            <CardDescription className="font-butter text-muted-foreground text-base md:text-lg leading-8">
              {skill.summary}
            </CardDescription>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {skill.tools.map((tool) => (
              <span
                key={`${skill.title}-${tool}`}
                className="bg-background/80 px-3 py-1.5 border border-border rounded-md font-semibold text-foreground text-xs md:text-sm">
                {tool}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

export const Skills = () => {
  return (
    <div className="py-20">
      <div className="max-md:hidden flex flex-row justify-center items-center gap-4 mx-auto">
        <div className="border border-border border-t-2 w-16 h-px"></div>
        <h1 className="font-fredoka font-bold text-secondary text-2xl">
          Skills
        </h1>
        <div className="border border-border border-t-2 w-16 h-px"></div>
      </div>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-3 px-8 xl:px-32 pt-14">
        <div className="md:hidden flex flex-row justify-center items-center gap-4 mx-auto">
          <div className="border border-border border-t-2 w-16 h-px"></div>
          <h1 className="font-fredoka font-bold text-secondary text-2xl">
            Skills
          </h1>
          <div className="border border-border border-t-2 w-16 h-px"></div>
        </div>

        {skillGroups.map((skill, index) => (
          <SkillCard key={skill.title} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};
