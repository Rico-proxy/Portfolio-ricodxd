import { CiMail, CiLinkedin } from 'react-icons/ci';
import { LuGithub } from 'react-icons/lu';

const Footer = () => {
  return (
    <div className="border-border border-t bg-card/80 px-4 md:px-8 dark:bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-row justify-between p-5 text-foreground">
        <div className="">
          <h1 className="font-signature font-bold text-secondary text-xl md:text-2xl xl:text-4xl">
            Rico
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/richard-oahimire-805527385/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="hover:text-secondary transition-colors">
            <CiLinkedin className="text-2xl md:text-3xl" />
          </a>
          <a
            href="https://github.com/Rico-proxy"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hover:text-secondary transition-colors">
            <LuGithub className="text-2xl md:text-3xl" />
          </a>
          <a
            href="mailto:richardoahimire@gmail.com"
            aria-label="Send email"
            className="hover:text-secondary transition-colors">
            <CiMail className="text-2xl md:text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
