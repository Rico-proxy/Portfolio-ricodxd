import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 md:px-8 md:pt-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/20 bg-background/35 px-5 py-3 shadow-[0_0_34px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.16),0_0_28px_rgba(134,240,151,0.08)] backdrop-blur-2xl md:px-8 dark:border-white/10 dark:bg-black/25">
          <div className="flex items-center gap-3">
            <span
              className="size-2.5 rounded-full bg-secondary shadow-[0_0_18px_rgba(134,240,151,0.8)]"
              aria-hidden="true"></span>
            <h1 className="font-signature font-bold text-secondary text-2xl md:text-3xl xl:text-4xl">
              Rico
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-10 lg:gap-16 font-fredoka text-muted-foreground text-sm lg:text-base tracking-[0.18em] uppercase">
            <a
              href="#projects"
              className="hover:text-secondary transition-colors">
              Projects
            </a>
            <a
              href="#skills"
              className="hover:text-secondary transition-colors">
              Skills
            </a>
            <a
              href="#contact"
              className="hover:text-secondary transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="inline-flex items-center justify-center rounded-full border border-border bg-card/90 p-2 text-foreground shadow-sm transition-colors hover:border-secondary/70 hover:text-secondary md:hidden">
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-3 rounded-3xl border border-border/80 bg-background/90 px-5 py-4 shadow-[0_0_28px_rgba(134,240,151,0.12)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 font-fredoka text-muted-foreground text-sm tracking-[0.18em] uppercase">
              <a
                href="#projects"
                onClick={closeMenu}
                className="hover:text-secondary transition-colors">
                Projects
              </a>
              <a
                href="#skills"
                onClick={closeMenu}
                className="hover:text-secondary transition-colors">
                Skills
              </a>
              <a
                href="#contact"
                onClick={closeMenu}
                className="hover:text-secondary transition-colors">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
