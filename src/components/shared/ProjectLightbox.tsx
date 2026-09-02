import { ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import type { Project } from '@/data/projects';

type ProjectLightboxProps = {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
};

const ProjectLightbox = ({ project, onOpenChange }: ProjectLightboxProps) => {
  return (
    <Dialog open={Boolean(project)} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 p-0 w-[calc(100%-2rem)] max-w-6xl sm:max-w-6xl max-h-[82vh] overflow-hidden md:max-h-[92vh]">
        {project ? (
          <>
            <DialogHeader className="px-4 md:px-6 py-3 md:py-4 pr-14 border-border border-b text-left">
              <DialogTitle className="font-fredoka font-bold text-xl md:text-2xl">
                {project.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Full screenshot preview for {project.name}.
              </DialogDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.stack.map((tech) => (
                  <span
                    key={`${project.name}-modal-${tech}`}
                    className="bg-muted px-2.5 py-1 rounded-full font-semibold text-muted-foreground text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </DialogHeader>

            <div className="bg-muted/60 p-3 md:p-6 overflow-auto">
              <img
                src={project.image}
                alt={`${project.name} full screenshot`}
                className="mx-auto rounded-md max-w-full h-auto"
              />
            </div>

            <DialogFooter className="px-4 md:px-6 py-3 md:py-4 border-border border-t">
              <Button asChild className="bg-secondary text-black">
                <a href={project.href} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-4" />
                  Visit live site
                </a>
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectLightbox;
