import { CiMail, CiLinkedin } from 'react-icons/ci';
import { LuGithub } from 'react-icons/lu';

const Footer = () => {
  return (
    <div className="bg-card/80 dark:bg-muted/40 px-4 md:px-8 border-border border-t">
      <div className="flex flex-row justify-between mx-auto p-5 max-w-6xl text-foreground">
        <div className="flex items-center gap-3">
            <span
              className="bg-secondary shadow-[0_0_18px_rgba(134,240,151,0.8)] rounded-full size-2.5"
              aria-hidden="true"></span>
            <h1 className="font-signature font-bold text-secondary text-2xl md:text-3xl xl:text-4xl">
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
