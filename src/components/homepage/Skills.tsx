import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';

type Skill = {
  name: string;
  level: number;
  summary: string;
  tools: string[];
};

const frontendSkills: Skill[] = [
  {
    name: 'React',
    level: 92,
    summary:
      'Build reusable components, compose layouts, and manage complex UI state with hooks.',
    tools: ['Hooks', 'React Router', 'Component Patterns'],
  },
  {
    name: 'Tailwind CSS',
    level: 90,
    summary:
      'Create responsive layouts quickly with utility-first styling and clean design systems.',
    tools: ['Responsive UI', 'Design Tokens', 'Animations'],
  },
  {
    name: 'Redux Toolkit',
    level: 84,
    summary:
      'Handle global state for scalable apps with slices, async thunks, and predictable flow.',
    tools: ['Slices', 'Async Thunks', 'Normalized State'],
  },
  {
    name: 'State Management',
    level: 86,
    summary:
      'Choose the right state strategy per feature using Context, local state, or global store.',
    tools: ['Context API', 'Local State', 'Server State'],
  },
  {
    name: 'TypeScript',
    level: 83,
    summary:
      'Ship safer frontend code with strict typing, reusable interfaces, and clearer APIs.',
    tools: ['Type Safety', 'Interfaces', 'Utility Types'],
  },
  {
    name: 'Next.js',
    level: 60,
    summary:
      'Build production-ready frontend experiences with routing, optimized assets, and SSR/SSG.',
    tools: ['App Router', 'SSR/SSG', 'Performance'],
  },
];

export const Skills = () => {
  return (
    <div className="py-20">
      <div className="max-md:hidden flex flex-row justify-center items-center gap-4 mx-auto">
        <div className="border border-border border-t-2 w-16 h-px"></div>
        <h1 className="font-fredoka font-bold text-secondary text-2xl">
          My Experience
        </h1>
        <div className="border border-border border-t-2 w-16 h-px"></div>
      </div>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 px-8 xl:px-32 pt-14">
        <div className="md:hidden flex flex-row justify-center items-center gap-4 mx-auto">
          <div className="border border-border border-t-2 w-16 h-px"></div>
          <h1 className="font-fredoka font-bold text-secondary text-2xl">
            My Experience
          </h1>
          <div className="border border-border border-t-2 w-16 h-px"></div>
        </div>

        {frontendSkills.map((skill) => (
          <Card
            key={skill.name}
            className="bg-card/95 shadow-black/10 shadow-lg backdrop-blur-sm border-border">
            <CardContent className="space-y-4 p-6">
              <div className="flex justify-between items-center gap-3">
                <CardTitle className="font-fredoka text-card-foreground text-2xl">
                  {skill.name}
                </CardTitle>
                <span className="font-semibold text-secondary text-sm">
                  {skill.level}%
                </span>
              </div>

              <div className="bg-muted rounded-full w-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-secondary to-primary rounded-full h-full transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <CardDescription className="font-butter text-card-foreground text-base">
                {skill.summary}
              </CardDescription>

              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool) => (
                  <span
                    key={`${skill.name}-${tool}`}
                    className="bg-background/70 px-3 py-1 border border-border rounded-full font-semibold text-foreground text-xs">
                    {tool}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
