import { Linkedin, Mail } from 'lucide-react';
import { Button } from '../ui/button';

const Contact = () => {
  return (
    <div className="px-8 xl:px-32 py-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border/80 bg-card/70 px-6 py-16 text-center shadow-[0_0_34px_rgba(0,0,0,0.14)] backdrop-blur-xl transition-colors duration-300 hover:border-secondary/80 md:px-12 md:py-24">
        <p className="font-fredoka text-secondary text-sm tracking-[0.28em] uppercase">
          Get In Touch
        </p>

        <h2 className="mx-auto mt-8 max-w-4xl font-fredoka text-foreground text-4xl leading-tight md:text-6xl xl:text-7xl">
          Let's build something exceptional together.
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-muted-foreground text-base leading-8 md:text-xl">
          Have an ambitious project or looking for a frontend developer? Drop a
          line anytime.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="w-full rounded-full bg-secondary px-8 py-6 font-fredoka text-black shadow-[0_0_28px_rgba(134,240,151,0.35)] transition-all hover:border hover:border-secondary hover:bg-secondary/90 hover:shadow-[0_0_38px_rgba(134,240,151,0.5)] sm:w-auto md:px-10 md:text-lg">
            <a href="mailto:richardoahimire@gmail.com">
              <Mail className="size-5" />
              Email Me
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full rounded-full border-secondary/50 bg-background/40 px-8 py-6 font-fredoka text-foreground shadow-[0_0_22px_rgba(134,240,151,0.14)] backdrop-blur-sm transition-all hover:border-secondary hover:bg-secondary/10 hover:text-secondary hover:shadow-[0_0_32px_rgba(134,240,151,0.28)] sm:w-auto md:px-10 md:text-lg">
            <a
              href="https://www.linkedin.com/in/richard-oahimire-805527385/"
              target="_blank"
              rel="noreferrer">
              <Linkedin className="size-5" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
