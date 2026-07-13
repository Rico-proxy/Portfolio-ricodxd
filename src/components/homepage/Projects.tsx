import { Card } from '../ui/card';
import Images from '@/assets';
import { RainbowButton } from '../ui/rainbow-button';

const Projects = () => {
  const projects = [
    {
      name: 'Resource Library',
      image: Images.resourceLibrary,
      href: 'https://resource-library-with-superbase-aut.vercel.app/',
      stack: ['React', 'Tailwind', 'Shadcn'],
    },
    {
      name: 'Visual Designer Portfolio',
      image: Images.visualDesignerPortfolio,
      href: 'https://ui-designer-seven.vercel.app/',
      stack: ['Next.js', 'Tailwind'],
    },
    {
      name: 'Pizza Hub',
      image: Images.pizzaHub,
      href: 'https://luigie-pizza.vercel.app/',
      stack: ['React', 'Tailwind'],
    },
    {
      name: 'Browncon',
      image: Images.browncon,
      href: 'https://browncon.vercel.app/',
      stack: ['HTML', 'Tailwind'],
    },
    {
      name: 'Addiction Support Website',
      image: Images.support,
      href: 'https://support-website-sigma.vercel.app/',
      stack: ['React', 'Tailwind', 'Shadcn', 'Magic UI'],
    },
  ];

  return (
    <div className="py-20">
      <div className="max-md:hidden flex flex-row justify-center items-center gap-4 mx-auto">
        <div className="border border-border border-t-2 w-16 h-px"></div>
        <h1 className="font-fredoka font-bold text-secondary text-2xl">
          My Projects
        </h1>
        <div className="border border-border border-t-2 w-16 h-px"></div>
      </div>
      <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-8 xl:px-32 md:pt-20">
        <div className="md:hidden flex flex-row justify-center items-center gap-4 mx-auto">
          <div className="border border-border border-t-2 w-16 h-px"></div>
          <h1 className="font-fredoka font-bold text-secondary text-2xl">
            My Projects
          </h1>
          <div className="border border-border border-t-2 w-16 h-px"></div>
        </div>

        {projects.map((project) => (
          <div key={project.name} className="flex flex-col gap-5 xl:max-w-lg">
            <a href={project.href} target="_blank" rel="noreferrer" className="group block">
              <Card className="bg-card p-0 border-border overflow-hidden transition-transform group-hover:-translate-y-1 duration-300">
                <img
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  className="w-full object-cover aspect-[4/2] group-hover:scale-105 transition-transform duration-500"
                />
              </Card>
            </a>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.stack.map((tech) => (
                <RainbowButton key={`${project.name}-${tech}`} variant="outline">
                  {tech}
                </RainbowButton>
              ))}
            </div>
            <div>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-foreground hover:text-secondary md:text-lg transition-colors">
                {project.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
