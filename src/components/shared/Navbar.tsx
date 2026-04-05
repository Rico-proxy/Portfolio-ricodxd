import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="relative z-50 px-4 md:px-8 py-3 md:py-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-signature font-bold text-secondary text-2xl md:text-3xl xl:text-4xl">
            Rico
          </h1>

          <div className="hidden md:flex items-center gap-8 lg:gap-10 font-butter text-foreground">
            <a
              href="#projects"
              className="decoration-secondary hover:underline underline-offset-4">
              Projects
            </a>
            <a
              href="#experience"
              className="decoration-secondary hover:underline underline-offset-4">
              Experience
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="md:hidden inline-flex items-center justify-center rounded-md border border-border bg-card/90 p-2 text-foreground shadow-sm">
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-3 rounded-xl border border-border bg-card/95 backdrop-blur-sm px-4 py-3 shadow-lg">
            <div className="flex flex-col gap-3 font-butter text-foreground">
              <a
                href="#projects"
                onClick={closeMenu}
                className="decoration-secondary hover:underline underline-offset-4">
                Projects
              </a>
              <a
                href="#experience"
                onClick={closeMenu}
                className="decoration-secondary hover:underline underline-offset-4">
                Experience
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
