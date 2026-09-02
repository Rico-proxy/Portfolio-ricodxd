import { useState } from 'react';
import { Card } from '../ui/card';
import { RainbowButton } from '../ui/rainbow-button';
import ScrollReveal from '../ui/scroll-reveal';
import ProjectLightbox from '../shared/ProjectLightbox';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

        {projects.map((project, index) => {
          const isLastOddProject =
            projects.length % 2 === 1 && index === projects.length - 1;

          return (
            <ScrollReveal
              key={project.name}
              className={`xl:max-w-lg ${
                isLastOddProject
                  ? 'md:col-span-2 md:justify-self-center md:w-[calc((100%_-_3rem)/2)] md:max-w-none xl:max-w-lg'
                  : ''
              }`}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -56 : 56,
                filter: 'blur(8px)',
              }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ delay: index * 0.05 }}>
              <Card className="group relative overflow-hidden border-secondary/45 bg-card/95 p-5 shadow-[0_0_34px_rgba(134,240,151,0.2),inset_0_0_26px_rgba(134,240,151,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/80 hover:shadow-[0_0_44px_rgba(134,240,151,0.32),inset_0_0_32px_rgba(134,240,151,0.13)]">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border/80 bg-background text-left shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </button>

                <div className="flex flex-col gap-5 px-1 pt-2">
                  <div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-foreground hover:text-secondary text-xl md:text-2xl transition-colors">
                      {project.name}
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {project.stack.map((tech) => (
                      <RainbowButton
                        key={`${project.name}-${tech}`}
                        variant="outline">
                        {tech}
                      </RainbowButton>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      <ProjectLightbox
        project={selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </div>
  );
};

export default Projects;
