import { CiLinkedin } from 'react-icons/ci';
import { LuGithub } from 'react-icons/lu';

const Footer = () => {
  return (
    <div>
      <div className="border border-t border-border" />
      <div className="flex flex-row justify-between text-foreground p-5">
        <div className="">
          <h1 className="text-secondary text-xl font-bold font-signature md:text-2xl xl:text-4xl">
            Rico
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <a
            href="https://www.linkedin.com/in/richard-oahimire-805527385/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="hover:text-secondary transition-colors">
            <CiLinkedin className=" text-2xl md:text-3xl" />
          </a>
          <a
            href="https://github.com/Rico-proxy"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hover:text-secondary transition-colors">
            <LuGithub className="text-2xl md:text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
