import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div>
      <div className="flex lg:flex-row flex-col justify-center lg:justify-between lg:items-center gap-5 p-4 lg:px-8 text-center">
        {/* Logo */}
        <div>
          <h1 className="font-signature font-bold text-secondary text-xl md:text-2xl xl:text-4xl">
            Rico
          </h1>
        </div>

        <div className="flex flex-row justify-center items-center gap-5 md:gap-10 lg:pr-10 font-butter text-foreground">
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
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex justify-center items-center bg-card hover:bg-accent border border-border rounded-full w-10 h-10 text-foreground transition-colors hover:text-accent-foreground cursor-pointer">
            {theme === 'dark' ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
